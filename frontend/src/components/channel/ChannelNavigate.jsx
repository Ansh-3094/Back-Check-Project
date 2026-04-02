import React from "react";
import { NavLink } from "react-router-dom";

function ChannelNavigate({ username, edit }) {
  const baseTabClass = "px-3 py-2 transition-colors duration-150";
  const activeTabClass =
    "border-b-2 border-(--brand) text-(--brand) font-semibold";
  const inactiveTabClass = "text-slate-300 hover:text-white";

  const getTabClass = (isActive) =>
    `${baseTabClass} ${isActive ? activeTabClass : inactiveTabClass}`;

  if (edit) {
    return (
      <section className="w-full flex justify-evenly items-center border-b border-(--line) text-sm sm:text-base sm:mt-4 md:mt-0 mt-2 text-white">
        <NavLink
          to={`/edit/personalInfo`}
          className={({ isActive }) => getTabClass(isActive)}
        >
          Personal Information
        </NavLink>
        <NavLink
          to={`/edit/password`}
          className={({ isActive }) => getTabClass(isActive)}
        >
          Change Password
        </NavLink>
      </section>
    );
  }

  return (
    <section className="w-full flex justify-evenly items-center border-b border-(--line) text-sm sm:text-base sm:mt-4 md:mt-0 mt-2 text-white">
      <NavLink
        to={`/channel/${username}/videos`}
        className={({ isActive }) => getTabClass(isActive)}
      >
        Videos
      </NavLink>
      <NavLink
        to={`/channel/${username}/playlists`}
        className={({ isActive }) => getTabClass(isActive)}
      >
        Playlists
      </NavLink>
      <NavLink
        to={`/channel/${username}/tweets`}
        className={({ isActive }) => getTabClass(isActive)}
      >
        Tweets
      </NavLink>
      <NavLink
        to={`/channel/${username}/subscribed`}
        className={({ isActive }) => getTabClass(isActive)}
      >
        Subscribers
      </NavLink>
    </section>
  );
}

export default ChannelNavigate;
