import React, { useEffect, useState } from "react";
import {
  Container,
  DeleteConfirmation,
  HeaderSection,
  Navbar,
  Spinner,
  StatsSection,
  VideoTable,
  EditVideo,
  UploadVideo,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getChannelStats, getChannelVideos } from "../store/Slices/dashboard";
import { deleteAVideo } from "../store/Slices/videoSlice";

function AdminDashboard() {
  const username = useSelector((state) => state.auth.userData?.username);
  const dashboard = useSelector((state) => state.dashboard.channelStats);
  const videos = useSelector((state) => state.dashboard.channelVideos);
  const uploaded = useSelector((state) => state.video.uploaded);
  const publishToggled = useSelector((state) => state.video.publishToggled);
  const deleting = useSelector((state) => state.video.deleting);

  const dispatch = useDispatch();
  const [videoDetails, setVideoDetails] = useState(null);
  const [popUp, setPopUp] = useState({
    uploadVideo: false,
    editVideo: false,
    deleteVideo: false,
  });

  const handleDeleteVideo = async () => {
    dispatch(deleteAVideo(videoDetails?._id));
    setPopUp((prev) => ({
      ...prev,
      deleteVideo: !prev.deleteVideo,
    }));
  };

  useEffect(() => {
    dispatch(getChannelStats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getChannelVideos());
  }, [dispatch, uploaded, publishToggled, deleting]);

  useEffect(() => {
    // Disable automatic scroll restoration to prevent page jump
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <div className="app-panel relative z-10 mt-3 h-[calc(100vh-120px)] w-full space-y-5 overflow-y-auto rounded-xl px-2 py-4 text-white sm:px-3">
          {/* uploadVideoPopup */}
          {popUp.uploadVideo && <UploadVideo setUploadVideoPopup={setPopUp} />}

          {/* editVideoPopup */}
          {popUp.editVideo && (
            <div className="w-full flex justify-center top-24 fixed z-20">
              <EditVideo
                setEditVideoPopup={setPopUp}
                title={videoDetails?.title}
                description={videoDetails?.description}
                videoId={videoDetails?._id}
              />
            </div>
          )}

          {/* deleteVideoPopup */}
          {popUp.deleteVideo && (
            <div className="w-full fixed top-52 flex justify-center z-20">
              <DeleteConfirmation
                video={true}
                onCancel={() =>
                  setPopUp((prev) => ({
                    ...prev,
                    deleteVideo: !prev.deleteVideo,
                  }))
                }
                onDelete={handleDeleteVideo}
              />
            </div>
          )}

          {deleting && (
            <div className="w-full fixed top-20 flex justify-center z-20">
              <div className="flex w-52 gap-2 border border-slate-700 bg-(--surface-strong) p-3">
                <Spinner />
                <span className="text-md font-bold">Deleting video...</span>
              </div>
            </div>
          )}

          {/* Dashboard Header */}
          <HeaderSection username={username} setPopUp={setPopUp} />

          {/* channel stats section */}
          <StatsSection dashboard={dashboard} />

          {/* Table for managing channel videos */}
          <VideoTable
            videos={videos}
            setPopUp={setPopUp}
            setVideoDetails={setVideoDetails}
          />
        </div>
      </Container>
    </>
  );
}

export default AdminDashboard;
