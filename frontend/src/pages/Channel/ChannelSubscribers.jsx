import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserChannelSubscribers } from "../../store/Slices/subscriptionSlice";
import { Avatar, Button } from "../../components";
import { Link } from "react-router-dom";

function ChannelSubscribers() {
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.user.profileData?._id);
  const subscribers = useSelector(
    (state) => state.subscription.channelSubscribers,
  );

  useEffect(() => {
    if (channelId) {
      dispatch(getUserChannelSubscribers(channelId));
    }
  }, [dispatch, channelId]);

  return (
    <div className="space-y-2">
      {subscribers?.map((subscriber) => (
        <Link
          key={subscriber?.subscriber?._id}
          className="flex items-center justify-between rounded-md border border-slate-700/70 bg-(--surface-strong) px-3 py-2 text-white"
        >
          <div className="flex items-center gap-3">
            <Avatar
              src={subscriber?.subscriber?.avatar.url}
              channelName={subscriber?.subscriber?.username}
            />
            <div>
              <h5 className="text-sm">{subscriber?.subscriber?.username}</h5>
              <span className="text-xs text-slate-400">
                {subscriber?.subscriber?.subscribersCount} Subscribers
              </span>
            </div>
          </div>
          <div>
            <Button className="bg-(--brand) text-xs py-1 px-2 text-white">
              {subscriber?.subscriber?.subscribedToSubscriber
                ? "Subscribed"
                : "subscribe"}
            </Button>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ChannelSubscribers;
