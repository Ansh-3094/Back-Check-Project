import React from "react";
import { IoIosVideocam } from "react-icons/io";
import { Link } from "react-router-dom";

function Logo({ size = "30" }) {
  return (
    <>
      <Link to={"/"} className="flex gap-2 items-center">
        <IoIosVideocam size={size} color="var(--brand)" />
        <span className="font-bold text-white">NAMEEEEE</span>
      </Link>
    </>
  );
}

export default Logo;
