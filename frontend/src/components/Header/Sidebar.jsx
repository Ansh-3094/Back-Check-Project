import React from "react";
import {
  BiHistory,
  BiLike,
  CiSettings,
  HiOutlineVideoCamera,
  IoFolderOutline,
  RiHome6Line,
  TbUserCheck,
} from "../icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { userLogout } from "../../store/Slices/authSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth?.userData?.username);
  const sidebarTopItems = [
    {
      icon: <RiHome6Line size={25} />,
      title: "Home",
      url: "/explore",
    },
    {
      icon: <BiLike size={25} />,
      title: "Liked Videos",
      url: "/liked-videos",
    },
    {
      icon: <BiHistory size={25} />,
      title: "History",
      url: "/history",
    },
    {
      icon: <HiOutlineVideoCamera size={25} />,
      title: "My Content",
      url: `/channel/${username}`,
    },
    {
      icon: <IoFolderOutline size={25} />,
      title: "Collections",
      url: "/collections",
    },
    {
      icon: <TbUserCheck size={25} />,
      title: "Subscriptions",
      url: "/subscriptions",
    },
  ];

  const bottomBarItems = [
    {
      icon: <RiHome6Line size={25} />,
      title: "Home",
      url: "/explore",
    },
    {
      icon: <BiHistory size={25} />,
      title: "History",
      url: "/history",
    },
    {
      icon: <IoFolderOutline size={25} />,
      title: "Collections",
      url: "/collections",
    },
    {
      icon: <TbUserCheck size={25} />,
      title: "Subscriptions",
      url: "/subscriptions",
    },
  ];

  const logout = async () => {
    await dispatch(userLogout());
    navigate("/");
  };

  return (
    <>
      <div className="hidden sm:block">
        <div className="app-panel sticky top-22 flex h-[calc(100vh-110px)] w-16 flex-col justify-between rounded-xl p-2text-(--text) md:w-48 lg:w-56 sm:p-3">
          <div className="mt-2 flex flex-col gap-3">
            {sidebarTopItems.map((item) => (
              <NavLink
                to={item.url}
                key={item.title}
                className={({ isActive }) =>
                  isActive ? "rounded-lg bg-[rgba(255,59,48,0.22)]" : ""
                }
              >
                <div className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-(--line) px-2 py-2 transition hover:bg-[rgba(255,59,48,0.14)] sm:justify-start">
                  {item.icon}
                  <span className="hidden text-sm font-medium md:block">
                    {item.title}
                  </span>
                </div>
              </NavLink>
            ))}
          </div>

          <div className="mb-2 space-y-3">
            {username && (
              <div
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-(--line) px-2 py-2 transition hover:bg-[rgba(255,59,48,0.14)] sm:justify-start"
                onClick={() => logout()}
              >
                <IoMdLogOut size={25} />
                <span className="hidden text-sm font-medium md:block">
                  Logout
                </span>
              </div>
            )}
            <NavLink
              to="/edit/personalInfo"
              className={({ isActive }) =>
                isActive ? "rounded-lg bg-[rgba(255,59,48,0.22)]" : ""
              }
            >
              <div className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-(--line) px-2 py-2 transition hover:bg-[rgba(255,59,48,0.14)] sm:justify-start">
                <CiSettings size={25} />
                <span className="hidden text-sm font-medium md:block">
                  Settings
                </span>
              </div>
            </NavLink>
          </div>
        </div>
      </div>

      {/* for mobile sidebar is bottom bar*/}
      <div className="fixed bottom-0 z-20 flex h-16 w-full justify-around border-t border-(--line) bg-[rgba(15,17,21,0.95)] p-1 text-(--text) backdrop-blur-xl sm:hidden">
        {bottomBarItems.map((item) => (
          <NavLink
            to={item.url}
            key={item.title}
            className={({ isActive }) =>
              isActive ? "text-(--brand)" : "text-(--text-dim)"
            }
          >
            <div className="flex cursor-pointer flex-col items-center gap-1 p-1">
              {item.icon}
              <span className="text-sm">{item.title}</span>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default Sidebar;
