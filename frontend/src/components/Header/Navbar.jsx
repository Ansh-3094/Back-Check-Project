import React, { useState } from "react";
import { Search, Button, Logo, SearchForSmallScreen } from "../index.js";
import { Link } from "react-router-dom";
import {
  IoCloseCircleOutline,
  BiLike,
  CiSearch,
  HiOutlineVideoCamera,
  SlMenu,
} from "../icons.js";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { userLogout } from "../../store/Slices/authSlice.js";

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const username = useSelector((state) => state.auth?.userData?.username);
  const profileImg = useSelector(
    (state) =>
      state.auth?.userData?.avatar?.url || state.auth?.userData?.avatar,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await dispatch(userLogout());
    navigate("/");
  };

  const sidePanelItems = [
    {
      icon: <BiLike size={25} />,
      title: "Liked Videos",
      url: "/liked-videos",
    },
    {
      icon: <HiOutlineVideoCamera size={25} />,
      title: "My Content",
      url: `/channel/${username}`,
    },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-(--line) bg-[rgba(15,17,21,0.88)] px-3 py-3 backdrop-blur-xl sm:px-5">
        <div className="mx-auto flex w-full max-w-400 items-center justify-between gap-3 sm:gap-5">
          <div className="flex items-center justify-center gap-2 cursor-pointer">
            <Logo />
          </div>

          {/* search for large screens */}
          <div className="hidden w-full sm:block sm:w-2/5 lg:w-1/3">
            <Search />
          </div>

          {/* search for small screens */}
          <div className="inline-flex w-full justify-end pr-2 text-(--text) sm:hidden">
            <CiSearch
              size={30}
              fontWeight={"bold"}
              onClick={() => setOpenSearch((prev) => !prev)}
            />
            {openSearch && (
              <SearchForSmallScreen
                open={openSearch}
                setOpenSearch={setOpenSearch}
              />
            )}
          </div>

          {/* login and signup butons for larger screens */}
          {authStatus ? (
            <div className="hidden sm:block rounded-full border border-(--line) p-0.5">
              <img
                src={profileImg}
                alt="profileImg"
                className="rounded-full w-10 h-10 object-cover"
              />
            </div>
          ) : (
            <div className="hidden space-x-2 sm:block">
              <Link to={"/login"}>
                <Button className="rounded-md border border-(--line) bg-[rgba(255,255,255,0.02)] px-4 py-2 text-sm text-(--text) transition hover:bg-[rgba(255,255,255,0.08)]">
                  Login
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="rounded-md border border-(--brand) bg-(--brand) px-4 py-2 text-sm font-semibold text-[#062015] transition hover:bg-(--brand-strong) cursor-pointer">
                  Sign up
                </Button>
              </Link>
            </div>
          )}

          {/* hamburger for smaller screens */}
          <div className="sm:hidden block">
            <div className="text-(--text)">
              <SlMenu
                size={24}
                onClick={() => setToggleMenu((prev) => !prev)}
              />
            </div>
          </div>
        </div>

        {/* Side bar for smaller screens */}
        {toggleMenu && (
          <div className="fixed right-0 top-0 flex h-screen w-[78%] flex-col border-l border-(--line) bg-(--bg-soft) text-(--text) shadow-2xl sm:hidden">
            <div className="mb-2 flex h-20 w-full items-center justify-between border-b border-(--line) px-3">
              <div className="flex items-center gap-2">
                <Logo />
              </div>
              <IoCloseCircleOutline
                size={35}
                onClick={() => setToggleMenu((prev) => !prev)}
              />
            </div>

            <div className="flex h-full flex-col justify-between px-3 py-5">
              <div className="flex flex-col gap-5">
                {sidePanelItems.map((item) => (
                  <NavLink
                    to={item.url}
                    key={item.title}
                    onClick={() => setToggleMenu((prev) => !prev)}
                    className={({ isActive }) =>
                      isActive ? "rounded-md bg-[rgba(255,59,48,0.22)]" : ""
                    }
                  >
                    <div className="flex items-center gap-5 rounded-md border border-(--line) px-3 py-2 transition hover:bg-[rgba(255,59,48,0.14)]">
                      <div>{item.icon}</div>
                      <span className="text-lg">{item.title}</span>
                    </div>
                  </NavLink>
                ))}
              </div>

              {!authStatus ? (
                <div className="flex flex-col space-y-5 mb-3">
                  <Link to={"/login"}>
                    <Button className="w-full rounded-md border border-(--line) bg-[rgba(255,255,255,0.03)] px-3 py-2 transition hover:bg-[rgba(255,255,255,0.1)]">
                      Login
                    </Button>
                  </Link>
                  <Link to={"/signup"}>
                    <Button className="w-full rounded-md border border-(--brand) bg-(--brand) px-3 py-2 font-semibold text-[#062015] transition hover:bg-(--brand-strong)">
                      Sign up
                    </Button>
                  </Link>
                </div>
              ) : (
                <div
                  className="flex cursor-pointer items-start justify-start gap-2 rounded-md border border-(--line) px-2 py-2 transition hover:bg-[rgba(255,255,255,0.06)]"
                  onClick={() => logout()}
                >
                  <IoMdLogOut size={25} />
                  <span className="text-base">Logout</span>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
