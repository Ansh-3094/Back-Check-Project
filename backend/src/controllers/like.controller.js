import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const likedAlready = await Like.findOne({
    video: videoId,
    likedBy: req.user?._id,
    isDislike: { $ne: true },
  });

  if (likedAlready) {
    await Like.findByIdAndDelete(likedAlready?._id);

    return res.status(200).json(new ApiResponse(200, { isLiked: false }));
  }

  await Like.create({
    video: videoId,
    likedBy: req.user?._id,
    isDislike: false,
  });

  await Like.deleteMany({
    video: videoId,
    likedBy: req.user?._id,
    isDislike: true,
  });

  return res.status(200).json(new ApiResponse(200, { isLiked: true }));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid commentId");
  }

  const likedAlready = await Like.findOne({
    comment: commentId,
    likedBy: req.user?._id,
    isDislike: { $ne: true },
  });

  if (likedAlready) {
    await Like.findByIdAndDelete(likedAlready?._id);

    return res.status(200).json(new ApiResponse(200, { isLiked: false }));
  }

  await Like.create({
    comment: commentId,
    likedBy: req.user?._id,
    isDislike: false,
  });

  await Like.deleteMany({
    comment: commentId,
    likedBy: req.user?._id,
    isDislike: true,
  });

  return res.status(200).json(new ApiResponse(200, { isLiked: true }));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweetId");
  }

  const likedAlready = await Like.findOne({
    tweet: tweetId,
    likedBy: req.user?._id,
    isDislike: { $ne: true },
  });

  if (likedAlready) {
    await Like.findByIdAndDelete(likedAlready?._id);

    return res
      .status(200)
      .json(new ApiResponse(200, { tweetId, isLiked: false }));
  }

  await Like.create({
    tweet: tweetId,
    likedBy: req.user?._id,
    isDislike: false,
  });

  await Like.deleteMany({
    tweet: tweetId,
    likedBy: req.user?._id,
    isDislike: true,
  });

  return res.status(200).json(new ApiResponse(200, { isLiked: true }));
});

const toggleVideoDislike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const dislikedAlready = await Like.findOne({
    video: videoId,
    likedBy: req.user?._id,
    isDislike: true,
  });

  if (dislikedAlready) {
    await Like.findByIdAndDelete(dislikedAlready?._id);
    return res.status(200).json(new ApiResponse(200, { isDisliked: false }));
  }

  await Like.deleteMany({
    video: videoId,
    likedBy: req.user?._id,
    isDislike: { $ne: true },
  });

  await Like.create({
    video: videoId,
    likedBy: req.user?._id,
    isDislike: true,
  });

  return res.status(200).json(new ApiResponse(200, { isDisliked: true }));
});

const toggleCommentDislike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid commentId");
  }

  const dislikedAlready = await Like.findOne({
    comment: commentId,
    likedBy: req.user?._id,
    isDislike: true,
  });

  if (dislikedAlready) {
    await Like.findByIdAndDelete(dislikedAlready?._id);
    return res.status(200).json(new ApiResponse(200, { isDisliked: false }));
  }

  await Like.deleteMany({
    comment: commentId,
    likedBy: req.user?._id,
    isDislike: { $ne: true },
  });

  await Like.create({
    comment: commentId,
    likedBy: req.user?._id,
    isDislike: true,
  });

  return res.status(200).json(new ApiResponse(200, { isDisliked: true }));
});

const toggleTweetDislike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweetId");
  }

  const dislikedAlready = await Like.findOne({
    tweet: tweetId,
    likedBy: req.user?._id,
    isDislike: true,
  });

  if (dislikedAlready) {
    await Like.findByIdAndDelete(dislikedAlready?._id);
    return res.status(200).json(new ApiResponse(200, { isDisliked: false }));
  }

  await Like.deleteMany({
    tweet: tweetId,
    likedBy: req.user?._id,
    isDislike: { $ne: true },
  });

  await Like.create({
    tweet: tweetId,
    likedBy: req.user?._id,
    isDislike: true,
  });

  return res.status(200).json(new ApiResponse(200, { isDisliked: true }));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const likedVideosAggregate = await Like.aggregate([
    {
      $match: {
        likedBy: new mongoose.Types.ObjectId(req.user?._id),
        isDislike: { $ne: true },
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "likedVideo",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "ownerDetails",
            },
          },
          {
            $unwind: "$ownerDetails",
          },
        ],
      },
    },
    {
      $unwind: "$likedVideo",
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        _id: 0,
        likedVideo: {
          _id: "$likedVideo._id",
          videoFile: "$likedVideo.videoFile",
          thumbnail: "$likedVideo.thumbnail",
          owner: "$likedVideo.owner",
          title: "$likedVideo.title",
          description: "$likedVideo.description",
          views: "$likedVideo.views",
          duration: "$likedVideo.duration",
          createdAt: "$likedVideo.createdAt",
          isPublished: "$likedVideo.isPublished",
          ownerDetails: {
            username: "$likedVideo.ownerDetails.username",
            fullName: "$likedVideo.ownerDetails.fullName",
            avatar: "$likedVideo.ownerDetails.avatar",
          },
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        likedVideosAggregate,
        "liked videos fetched successfully"
      )
    );
});

export {
  toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoDislike,
  toggleCommentDislike,
  toggleTweetDislike,
  getLikedVideos,
};
