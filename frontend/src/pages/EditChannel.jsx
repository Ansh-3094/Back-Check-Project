import React from "react";
import { ChannelHeader, ChannelNavigate, Spinner } from "../components";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function EditChannel() {
  const channel = useSelector((state) => state.auth?.userData);
  const loading = useSelector((state) => state.auth?.loading);
  window.scrollTo(0, 0);
  return (
    <>
      {loading && (
        <div className="w-full fixed top-20 flex justify-center z-20">
          <div className="w-52 border border-slate-600 bg-black flex gap-2 p-3">
            <Spinner />
            <span className="text-md font-bold text-white">wait dude...</span>
          </div>
        </div>
      )}

      {channel && (
        <ChannelHeader
          username={channel?.username}
          coverImage={channel?.coverImage?.url || channel?.coverImage}
          avatar={channel?.avatar?.url || channel?.avatar}
          subscribedCount={channel?.channelsSubscribedToCount}
          fullName={channel?.fullName}
          subscribersCount={channel?.subcribersCount}
          isSubscribed={channel?.isSubscribed}
          channelId={channel?._id}
          edit={true}
        />
      )}
      <ChannelNavigate edit={true} />
      <div className="app-panel mt-3 overflow-hidden rounded-xl p-3 sm:p-4">
        <div className="mb-20 max-h-[calc(100vh-220px)] overflow-y-auto sm:mb-0">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default EditChannel;
