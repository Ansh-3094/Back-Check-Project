import React, { useEffect } from "react";
import { Container, NoVideosFound, VideoList } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getWatchHistory } from "../store/Slices/userSlice";
import HomeSkeleton from "../skeleton/HomeSkeleton";

function History() {
  const loading = useSelector((state) => state.user?.loading);
  const videos = useSelector((state) => state.user?.history);
  const dispatch = useDispatch();
  window.scrollTo(0, 0);
  useEffect(() => {
    dispatch(getWatchHistory());
  }, [dispatch]);

  if (loading) {
    return <HomeSkeleton />;
  }

  if (videos?.length == 0) {
    return <NoVideosFound />;
  }

  if (videos && videos.length > 0) {
    return (
      <Container>
        <div className="app-panel rounded-xl p-3 sm:p-4">
          <div className="mb-20 grid max-h-[calc(100vh-140px)] w-full grid-cols-1 gap-4 overflow-y-auto pr-1 sm:mb-0 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoList
                key={video._id}
                avatar={video.owner?.avatar.url}
                duration={video.duration}
                title={video.title}
                thumbnail={video.thumbnail?.url}
                createdAt={video.createdAt}
                views={video.views}
                channelName={video.owner.username}
                videoId={video._id}
              />
            ))}
          </div>
        </div>
      </Container>
    );
  }
  return <></>;
}

export default History;
