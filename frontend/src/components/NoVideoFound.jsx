import React from "react";
import { FaPlayCircle } from "react-icons/fa";

const NoVideosFound = ({
  title = "There are no videos available here.",
  text,
}) => {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 pb-10 text-center text-white">
      <FaPlayCircle size={45} className="text-(--brand)" />
      <p className="mt-2 text-lg font-semibold">{title}</p>
      {text && <p className="text-sm text-slate-300">{text}</p>}
    </div>
  );
};

export default NoVideosFound;
