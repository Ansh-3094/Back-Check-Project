import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDuration, timeAgo } from "../helpers/timeAgo";

function RelatedVideoCard({ video }) {
  const navigate = useNavigate();

  const thumbnail =
    typeof video?.thumbnail === "string"
      ? video?.thumbnail
      : video?.thumbnail?.url;
  const avatar =
    typeof video?.ownerDetails?.avatar === "string"
      ? video?.ownerDetails?.avatar
      : video?.ownerDetails?.avatar?.url;
  const channelName = video?.ownerDetails?.username || video?.owner?.username;

  const handleChannelClick = (event) => {
    event.stopPropagation();
    if (channelName) {
      navigate(`/channel/${channelName}`);
    }
  };

  return (
    <div
      className="flex cursor-pointer gap-3 rounded-lg p-2 transition-colors hover:bg-slate-800/60"
      onClick={() => navigate(`/watch/${video?._id}`)}
    >
      <div className="relative h-23.5 w-42 shrink-0 overflow-hidden rounded-md bg-slate-900">
        {thumbnail ? (
          <img src={thumbnail} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-slate-800" />
        )}
        <span className="absolute bottom-1 right-1 rounded bg-black/85 px-1.5 py-0.5 text-[11px] text-white">
          {formatDuration(video?.duration || 0)}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className="text-sm font-semibold leading-5 text-white"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {video?.title}
        </h3>

        <div className="mt-1 flex items-center gap-2 text-xs text-slate-300">
          {avatar && (
            <img
              src={avatar}
              onClick={handleChannelClick}
              className="h-5 w-5 rounded-full border border-slate-600 object-cover"
            />
          )}
          <span className="truncate">{channelName}</span>
        </div>

        <p className="mt-1 text-xs text-slate-400">
          {video?.views || 0} views • {timeAgo(video?.createdAt)}
        </p>
      </div>
    </div>
  );
}

export default RelatedVideoCard;
