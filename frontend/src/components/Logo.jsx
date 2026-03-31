import React from "react";
import { IoIosVideocam } from "react-icons/io";
import { Link } from "react-router-dom";

function Logo({ size = "30", textSize = "text-lg", noLink = false }) {
  const content = (
    <div className="flex gap-2 items-center">
      <IoIosVideocam size={size} color="var(--brand)" />
      <span className={`font-bold text-white ${textSize}`}>PlayTube</span>
    </div>
  );

  if (noLink) {
    return content;
  }

  return (
    <Link to={"/"} className="flex gap-2 items-center">
      {content}
    </Link>
  );
}

export default Logo;
