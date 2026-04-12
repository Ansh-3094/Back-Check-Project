import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BiSolidLike, BiSolidDislike } from "../components/icons";
import {
  toggleCommentDislike,
  toggleCommentLike,
  toggleTweetDislike,
  toggleTweetLike,
  toggleVideoDislike,
  toggleVideoLike,
} from "../store/Slices/likeSlice";

function Like({
  isLiked,
  isDisliked = false,
  likesCount = 0,
  tweetId,
  commentId,
  videoId,
  size,
}) {
  const dispatch = useDispatch();
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [localIsDisliked, setLocalIsDisliked] = useState(isDisliked);
  const [localLikesCount, setLocalLikesCount] = useState(likesCount);

  const handleLikeToggle = () => {
    if (localIsDisliked) {
      setLocalIsDisliked(false);
    }

    if (localIsLiked) {
      setLocalLikesCount((prev) => prev - 1);
    } else {
      setLocalLikesCount((prev) => prev + 1);
    }

    setLocalIsLiked((prev) => !prev);

    if (tweetId) {
      dispatch(toggleTweetLike(tweetId));
    }
    if (commentId) {
      dispatch(toggleCommentLike(commentId));
    }
    if (videoId) {
      dispatch(toggleVideoLike(videoId));
    }
  };

  const handleDislikeToggle = () => {
    if (localIsLiked) {
      setLocalIsLiked(false);
      setLocalLikesCount((prev) => prev - 1);
    }

    setLocalIsDisliked((prev) => !prev);

    if (tweetId) {
      dispatch(toggleTweetDislike(tweetId));
    }
    if (commentId) {
      dispatch(toggleCommentDislike(commentId));
    }
    if (videoId) {
      dispatch(toggleVideoDislike(videoId));
    }
  };

  useEffect(() => {
    setLocalIsLiked(isLiked);
    setLocalLikesCount(likesCount);
    setLocalIsDisliked(isDisliked);
  }, [isLiked, likesCount, isDisliked]);

  return (
    <>
      <div className="flex items-center gap-1">
        <BiSolidLike
          size={size}
          onClick={handleLikeToggle}
          className={`cursor-pointer ${localIsLiked ? "text-red-500" : ""}`}
        />
        <span className="text-xs mr-3">{localLikesCount}</span>
        <BiSolidDislike
          size={size}
          onClick={handleDislikeToggle}
          className={`cursor-pointer ${localIsDisliked ? "text-red-500" : ""}`}
        />
      </div>
    </>
  );
}

export default Like;
