import React, { useEffect, useState } from "react";
import { NoVideosFound, VideoList } from "../../components/index";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../../store/Slices/videoSlice";

function ChannelVideos() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.profileData?._id);
  const videos = useSelector((state) => state.video?.videos?.docs);
  const [searchParams, setSearchParams] = useState();
  const [activeButton, setActiveButton] = useState("button1");

  useEffect(() => {
    const sortBy = searchParams?.sortBy;
    const sortType = searchParams?.sortType;
    dispatch(getAllVideos({ userId, sortBy, sortType }));

    return () => dispatch(makeVideosNull());
  }, [dispatch, userId, searchParams]);

  if (videos?.length == 0) {
    return <NoVideosFound />;
  }

  const handleSort = (sortBy, sortType = "asc") => {
    setSearchParams({ sortBy, sortType });
  };

  return (
    <>
      {/* For sorting latest, popular and oldest videos */}
      <div className="mb-3 flex w-full gap-3 p-1 text-white">
        <button
          onClick={() => {
            setActiveButton("button1");
            handleSort("createdAt", "desc");
          }}
          className={`rounded-md px-3 py-1 ${
            activeButton === "button1"
              ? "bg-(--brand) text-white"
              : "bg-(--surface-strong)"
          }`}
        >
          Latest
        </button>
        <button
          onClick={() => {
            setActiveButton("button2");
            handleSort("views", "desc");
          }}
          className={`rounded-md px-3 py-1 ${
            activeButton === "button2"
              ? "bg-(--brand) text-white"
              : "bg-(--surface-strong)"
          }`}
        >
          Popluar
        </button>
        <button
          onClick={() => {
            setActiveButton("button3");
            handleSort("createdAt", "asc");
          }}
          className={`rounded-md px-3 py-1 ${
            activeButton === "button3"
              ? "bg-(--brand) text-white"
              : "bg-(--surface-strong)"
          }`}
        >
          Oldest
        </button>
      </div>
      {/* Video listing */}
      <div className="grid grid-cols-1 gap-4 text-white sm:grid-cols-2 lg:grid-cols-3">
        {videos?.map((video) => (
          <VideoList
            key={video._id}
            avatar={
              video.ownerDetails?.avatar?.url || video.ownerDetails?.avatar
            }
            duration={video.duration}
            title={video.title}
            thumbnail={video.thumbnail?.url || video.thumbnail}
            createdAt={video.createdAt}
            views={video.views}
            channelName={video.ownerDetails?.username}
            videoId={video._id}
          />
        ))}
      </div>
    </>
  );
}

export default ChannelVideos;
