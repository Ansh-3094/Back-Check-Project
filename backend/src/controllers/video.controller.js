import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose, { isValidObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import { Like } from "../models/like.model.js";
import { Subscription } from "../models/subscription.model.js";

// get all videos based on query, sort, pagination
const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  const pipeline = [];

  console.log("[getAllVideos] query params:", req.query);

  if (query) {
    pipeline.push({
      $search: {
        index: "search-videos",
        text: {
          query,
          path: ["title", "description"],
        },
      },
    });
  }

  if (userId) {
    if (!isValidObjectId(userId)) {
      throw new ApiError(400, "Invalid userId");
    }

    pipeline.push({
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    });
  }

  pipeline.push({ $match: { isPublished: true } });

  if (sortBy && sortType) {
    pipeline.push({
      $sort: {
        [sortBy]: sortType === "asc" ? 1 : -1,
      },
    });
  } else {
    pipeline.push({ $sort: { createdAt: -1 } });
  }

  pipeline.push(
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
        pipeline: [
          {
            $project: {
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$ownerDetails" }
  );

  const videoAggregate = Video.aggregate(pipeline);

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  const video = await Video.aggregatePaginate(videoAggregate, options);

  console.log("[getAllVideos] page result:", {
    docsLength: video?.docs?.length,
    totalDocs: video?.totalDocs,
    page: video?.page,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Videos fetched successfully"));
});

// publish a video
const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if ([title, description].some((f) => f?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const videoFileLocalPath = req.files?.videoFile?.[0]?.path;
  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

  if (!videoFileLocalPath || !thumbnailLocalPath) {
    throw new ApiError(400, "Video and thumbnail are required");
  }

  const videoFile = await uploadOnCloudinary(videoFileLocalPath);
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!videoFile || !thumbnail) {
    throw new ApiError(400, "Failed to upload files");
  }

  const video = await Video.create({
    title,
    description,
    duration: videoFile.duration,
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
    owner: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, video, "Video uploaded successfully"));
});

// get video by id
const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const video = await Video.findById(videoId).lean();

  if (!video || !video.isPublished) {
    throw new ApiError(404, "Video not found");
  }

  const owner = await User.findById(video.owner)
    .select("username avatar")
    .lean();

  if (!owner) {
    throw new ApiError(404, "Owner not found");
  }

  // Determine current user (if any) from token so watch history and like/subscription
  // state work even though this route is public.
  let currentUserId = null;

  if (req.user?._id) {
    currentUserId = new mongoose.Types.ObjectId(req.user._id);
  } else {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (token) {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (decodedToken?._id) {
          currentUserId = new mongoose.Types.ObjectId(decodedToken._id);
        }
      }
    } catch (error) {
      // If token is missing/invalid, treat as anonymous viewer.
      currentUserId = null;
    }
  }

  const [likesAgg, subsAgg] = await Promise.all([
    Like.aggregate([
      { $match: { video: new mongoose.Types.ObjectId(videoId) } },
      {
        $group: {
          _id: null,
          likesCount: { $sum: 1 },
          likedBy: { $addToSet: "$likedBy" },
        },
      },
    ]),
    Subscription.aggregate([
      { $match: { channel: owner._id } },
      {
        $group: {
          _id: null,
          subscribersCount: { $sum: 1 },
          subscribers: { $addToSet: "$subscriber" },
        },
      },
    ]),
  ]);

  const likesData = likesAgg[0] || { likesCount: 0, likedBy: [] };
  const subsData = subsAgg[0] || { subscribersCount: 0, subscribers: [] };

  const isLiked =
    !!currentUserId &&
    likesData.likedBy.some(
      (id) => id && id.toString() === currentUserId.toString()
    );

  const isSubscribed =
    !!currentUserId &&
    subsData.subscribers.some(
      (id) => id && id.toString() === currentUserId.toString()
    );

  // increment views and update watch history for logged-in user
  const currentViews = Number(video.views || 0);
  await Video.findByIdAndUpdate(videoId, {
    $set: { views: String(currentViews + 1) },
  });

  if (currentUserId) {
    await User.findByIdAndUpdate(currentUserId, {
      $addToSet: { watchHistory: videoId },
    });
  }

  const responseData = {
    _id: video._id,
    title: video.title,
    description: video.description,
    videoFile: video.videoFile,
    thumbnail: video.thumbnail,
    views: video.views,
    createdAt: video.createdAt,
    duration: video.duration,
    likesCount: likesData.likesCount || 0,
    isLiked: Boolean(isLiked),
    owner: {
      _id: owner._id,
      username: owner.username,
      avatar: owner.avatar,
      subscribersCount: subsData.subscribersCount || 0,
      isSubscribed: Boolean(isSubscribed),
    },
  };

  return res
    .status(200)
    .json(
      new ApiResponse(200, responseData, "Video details fetched successfully")
    );
});

// update video
const updateVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  if (!(title && description)) {
    throw new ApiError(400, "title and description are required");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "No video found");
  }

  if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to edit this video");
  }

  const thumbnailLocalPath = req.file?.path;
  if (!thumbnailLocalPath) {
    throw new ApiError(400, "thumbnail is required");
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title,
        description,
        thumbnail: {
          public_id: thumbnail.public_id,
          url: thumbnail.url,
        },
      },
    },
    { new: true }
  );

  await deleteOnCloudinary(video.thumbnail.public_id);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "Video updated successfully"));
});

// delete video
const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "No video found");
  }

  if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this video");
  }

  await Video.findByIdAndDelete(videoId);

  await deleteOnCloudinary(video.thumbnail.public_id);
  await deleteOnCloudinary(video.videoFile.public_id, "video");

  await Like.deleteMany({ video: videoId });
  await Comment.deleteMany({ video: videoId });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Video deleted successfully"));
});

// toggle publish status
const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to toggle publish status");
  }

  const toggledVideo = await Video.findByIdAndUpdate(
    videoId,
    { $set: { isPublished: !video.isPublished } },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { isPublished: toggledVideo.isPublished },
        "Video publish toggled successfully"
      )
    );
});

export {
  publishAVideo,
  updateVideo,
  deleteVideo,
  getAllVideos,
  getVideoById,
  togglePublishStatus,
};
