import React, { useEffect } from "react";
import { ChannelHeader, ChannelNavigate } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { userChannelProfile } from "../../store/Slices/userSlice.js";
import { Outlet, useParams } from "react-router-dom";

function Channel() {
  const dispatch = useDispatch();
  const { username } = useParams();

  const channel = useSelector((state) => state.user?.profileData);
  useEffect(() => {
    dispatch(userChannelProfile(username));
  }, [dispatch, username]);

  window.scrollTo(0, 0);

  return (
    <>
      {channel && (
        <ChannelHeader
          username={username}
          coverImage={channel?.coverImage?.url || channel?.coverImage}
          avatar={channel?.avatar?.url || channel?.avatar}
          subscribedCount={channel?.channelsSubscribedToCount}
          fullName={channel?.fullName}
          subscribersCount={channel?.subcribersCount}
          isSubscribed={channel?.isSubscribed}
          channelId={channel?._id}
        />
      )}
      <ChannelNavigate username={username} />
      <div className="app-panel mt-3 overflow-hidden rounded-xl p-3 sm:p-4">
        <div className="mb-20 max-h-[calc(100vh-220px)] overflow-y-auto sm:mb-0">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Channel;
