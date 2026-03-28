import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribedChannels } from "../store/Slices/subscriptionSlice";
import { Link } from "react-router-dom";
import { VideoList, Avatar, Container } from "../components";

function MySubscriptions() {
  const dispatch = useDispatch();
  const subscriptions = useSelector(
    (state) => state.subscription?.mySubscriptions,
  );
  const subscriberId = useSelector((state) => state.auth?.userData?._id);
  useEffect(() => {
    if (subscriptions) {
      dispatch(getSubscribedChannels(subscriberId));
    }
  }, [dispatch, subscriberId]);
  window.scrollTo(0, 0);

  return (
    <Container>
      <div className="app-panel rounded-xl p-3 sm:p-4">
        <div className="mb-4 flex items-center gap-3 overflow-x-auto border-b border-slate-700/70 pb-3 text-white">
          {subscriptions?.map((subscription) => (
            <div
              key={subscription?.subscribedChannel?._id}
              className="flex min-w-16 flex-col items-center"
            >
              <Avatar
                src={subscription?.subscribedChannel?.avatar.url}
                channelName={subscription?.subscribedChannel?.username}
              />
              <h5 className="text-xs">
                {subscription?.subscribedChannel?.username}
              </h5>
            </div>
          ))}
        </div>

        <div className="mb-20 grid max-h-[calc(100vh-220px)] w-full grid-cols-1 gap-4 overflow-y-auto pr-1 text-white sm:mb-0 sm:grid-cols-2 xl:grid-cols-3">
          {subscriptions?.map((subscription) => (
            <Link
              to={`/watch/${subscription?.subscribedChannel?.latestVideo?._id}`}
              key={subscription?.subscribedChannel?._id}
            >
              {subscription?.subscribedChannel?.latestVideo && (
                <VideoList
                  key={subscription?.subscribedChannel?._id}
                  avatar={subscription?.subscribedChannel?.avatar.url}
                  duration={
                    subscription?.subscribedChannel?.latestVideo?.duration
                  }
                  title={subscription?.subscribedChannel?.latestVideo?.title}
                  thumbnail={
                    subscription?.subscribedChannel?.latestVideo?.thumbnail?.url
                  }
                  createdAt={
                    subscription?.subscribedChannel?.latestVideo?.createdAt
                  }
                  views={subscription?.subscribedChannel?.latestVideo?.views}
                  channelName={subscription?.subscribedChannel?.username}
                  videoId={subscription?.subscribedChannel?.latestVideo?._id}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default MySubscriptions;
