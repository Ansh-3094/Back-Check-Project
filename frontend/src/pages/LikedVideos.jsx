import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedVideos } from "../store/Slices/likeSlice";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import { Container, NoVideosFound, VideoList } from "../components";
import { makeVideosNull } from "../store/Slices/videoSlice";

function LikedVideos() {
  const dispatch = useDispatch();
  const likedVideos = useSelector((state) => state.like?.likedVideos);
  const loading = useSelector((state) => state.like.loading);
  window.scrollTo(0, 0);
  useEffect(() => {
    dispatch(getLikedVideos());

    return () => dispatch(makeVideosNull());
  }, [dispatch]);

  if (loading) {
    return <HomeSkeleton />;
  }

  if (likedVideos?.length == 0) {
    return <NoVideosFound />;
  }

  return (
    <Container>
      <div className="app-panel rounded-xl p-3 sm:p-4">
        <div className="mb-20 grid max-h-[calc(100vh-140px)] w-full grid-cols-1 gap-4 overflow-y-auto pr-1 sm:mb-0 sm:grid-cols-2 lg:grid-cols-3">
          {likedVideos?.map((video) => (
            <VideoList
              key={video.likedVideo._id}
              avatar={video.likedVideo.ownerDetails?.avatar?.url}
              duration={video.likedVideo.duration}
              title={video.likedVideo.title}
              thumbnail={video.likedVideo.thumbnail?.url}
              createdAt={video.likedVideo.createdAt}
              views={video.likedVideo.views}
              channelName={video.likedVideo.ownerDetails?.username}
              videoId={video.likedVideo._id}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default LikedVideos;
