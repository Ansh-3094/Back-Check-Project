import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NoVideosFound, VideoList } from "../components";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import { FaFilter } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useParams, useSearchParams } from "react-router-dom";
import { Container } from "../components";

function SearchVideos() {
  const loading = useSelector((state) => state.video?.loading);
  const videos = useSelector((state) => state.video?.videos);
  const dispatch = useDispatch();
  const { query } = useParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchParams, setSearchParms] = useSearchParams();
  const normalizedQuery = (query || "").trim();
  const mode = searchParams.get("mode");
  const isEmptySearchMode = mode === "empty" && !normalizedQuery;
  const [selectedFilter, setSelectedFilter] = useState({
    sortBy: searchParams.get("sortBy") || "",
    sortType: searchParams.get("sortType") || "",
  });

  useEffect(() => {
    const sortType = searchParams.get("sortType");
    const sortBy = searchParams.get("sortBy");

    if (isEmptySearchMode) {
      dispatch(makeVideosNull());
      return () => dispatch(makeVideosNull());
    }

    const payload = {
      sortBy,
      sortType,
    };

    if (normalizedQuery) {
      payload.query = normalizedQuery;
    }

    dispatch(getAllVideos(payload));
    setFilterOpen(false);
    return () => dispatch(makeVideosNull());
  }, [dispatch, normalizedQuery, searchParams, isEmptySearchMode]);

  const handleSelectFilter = (newSortBy, newSortType = "asc") => {
    setSelectedFilter({ sortBy: newSortBy, sortType: newSortType });
  };

  const handleApplyFilter = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("sortBy", selectedFilter.sortBy);
    nextParams.set("sortType", selectedFilter.sortType);
    setSearchParms(nextParams);
    setFilterOpen(false);
  };

  const isFilterSelected = (sortBy, sortType) => {
    return (
      selectedFilter.sortBy === sortBy && selectedFilter.sortType === sortType
    );
  };

  if (loading) {
    return <HomeSkeleton />;
  }

  if (!isEmptySearchMode && videos?.totalDocs === 0) {
    return (
      <Container>
        <div className="app-panel rounded-xl p-3 sm:p-4 text-white">
          <NoVideosFound text={"Try searching something else"} />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="app-panel relative rounded-xl p-3 sm:p-4 text-white">
        <div
          className="mb-3 flex h-10 cursor-pointer items-center justify-end gap-2 px-2 font-semibold"
          onClick={() => setFilterOpen((prev) => !prev)}
        >
          <span className="text-white hover:text-(--accent)">Filters</span>
          <FaFilter size={20} className="text-(--accent)" />
        </div>

        {filterOpen && (
          <div className="absolute left-0 top-14 z-40 flex w-full justify-center bg-transparent px-3">
            <div className="relative w-full max-w-sm rounded-xl border border-(--line) bg-(--surface-strong) p-4 shadow-2xl shadow-black/40">
              <h1 className="text-lg font-semibold">Search filters</h1>
              <IoCloseCircleOutline
                size={25}
                className="absolute right-4 top-4 cursor-pointer text-slate-300 transition-colors hover:text-white"
                onClick={() => setFilterOpen((prev) => !prev)}
              />
              <div className="mt-4 space-y-4">
                <div className="border-b border-(--line) pb-3">
                  <p className="text-sm font-medium text-slate-300">Sort By</p>
                </div>

                <div className="grid gap-2">
                  {[
                    {
                      label: "Upload date",
                      subLabel: "Latest",
                      sortBy: "createdAt",
                      sortType: "desc",
                    },
                    {
                      label: "Upload date",
                      subLabel: "Oldest",
                      sortBy: "createdAt",
                      sortType: "asc",
                    },
                    {
                      label: "View count",
                      subLabel: "Low to High",
                      sortBy: "views",
                      sortType: "asc",
                    },
                    {
                      label: "View count",
                      subLabel: "High to Low",
                      sortBy: "views",
                      sortType: "desc",
                    },
                    {
                      label: "Duration",
                      subLabel: "Low to High",
                      sortBy: "duration",
                      sortType: "asc",
                    },
                    {
                      label: "Duration",
                      subLabel: "High to Low",
                      sortBy: "duration",
                      sortType: "desc",
                    },
                  ].map((option) => {
                    const selected = isFilterSelected(
                      option.sortBy,
                      option.sortType,
                    );

                    return (
                      <button
                        key={`${option.sortBy}-${option.sortType}`}
                        type="button"
                        onClick={() =>
                          handleSelectFilter(option.sortBy, option.sortType)
                        }
                        className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left transition-all ${
                          selected
                            ? "border-(--brand) bg-(--brand)/15 text-white"
                            : "border-transparent bg-(--surface) text-slate-300 hover:border-(--line) hover:bg-(--surface-strong)"
                        }`}
                      >
                        <span className="text-sm font-medium">
                          {option.label}
                        </span>
                        <span className="text-xs text-slate-400">
                          {option.subLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end border-t border-(--line) pt-4">
                  <button
                    type="button"
                    onClick={handleApplyFilter}
                    className="rounded-lg bg-(--brand) px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-(--brand-strong)"
                  >
                    Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isEmptySearchMode ? (
          <div className="mb-20 flex min-h-[45vh] items-center justify-center rounded-xl border border-dashed border-(--line) bg-(--bg-soft) px-4 py-10 text-center text-(--text-dim)">
            <div>
              <p className="text-lg font-semibold text-white">
                Start typing to search videos
              </p>
              <p className="mt-2 text-sm">
                Videos are temporarily hidden until you enter a title.
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-20 grid max-h-[calc(100vh-180px)] w-full grid-cols-1 gap-4 overflow-y-auto pr-1 sm:mb-0 sm:grid-cols-2 xl:grid-cols-3">
            {videos &&
              videos?.docs?.map((video) => (
                <VideoList
                  key={video?._id}
                  thumbnail={video?.thumbnail?.url}
                  duration={video?.duration}
                  title={video?.title}
                  views={video?.views}
                  avatar={video?.ownerDetails?.avatar?.url}
                  channelName={video?.ownerDetails?.username}
                  createdAt={video?.createdAt}
                  videoId={video?._id}
                ></VideoList>
              ))}
          </div>
        )}
      </div>
    </Container>
  );
}

export default SearchVideos;
