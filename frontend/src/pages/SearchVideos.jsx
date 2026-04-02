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

  useEffect(() => {
    const sortType = searchParams.get("sortType");
    const sortBy = searchParams.get("sortBy");
    dispatch(
      getAllVideos({
        query,
        sortBy,
        sortType,
      }),
    );
    setFilterOpen(false);
    return () => dispatch(makeVideosNull());
  }, [dispatch, query, searchParams]);

  const handleSortParams = (newSortBy, newSortType = "asc") => {
    setSearchParms({ sortBy: newSortBy, sortType: newSortType });
  };

  if (loading) {
    return <HomeSkeleton />;
  }

  if (videos?.totalDocs === 0) {
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
            <div className="relative h-96 w-full max-w-sm rounded-lg border border-slate-700 bg-(--surface-strong) p-5 shadow-xl">
              <h1 className="text-lg font-semibold">Search filters</h1>
              <IoCloseCircleOutline
                size={25}
                className="absolute right-5 top-5 cursor-pointer"
                onClick={() => setFilterOpen((prev) => !prev)}
              />
              <table className="mt-4 w-full">
                <tbody>
                  <tr className="w-full border-b text-start">
                    <th className="pb-2 text-left">SortBy</th>
                  </tr>
                  <tr className="flex cursor-pointer flex-col gap-2 pt-2 text-slate-300">
                    <td onClick={() => handleSortParams("createdAt", "desc")}>
                      Upload date <span className="text-xs">(Latest)</span>
                    </td>
                    <td onClick={() => handleSortParams("createdAt", "asc")}>
                      Upload date <span className="text-xs">(Oldest)</span>
                    </td>
                    <td onClick={() => handleSortParams("views", "asc")}>
                      View count <span className="text-xs">(Low to High)</span>
                    </td>
                    <td onClick={() => handleSortParams("views", "desc")}>
                      View count <span className="text-xs">(High to Low)</span>
                    </td>
                    <td onClick={() => handleSortParams("duration", "asc")}>
                      Duration <span className="text-xs">(Low to High)</span>
                    </td>
                    <td onClick={() => handleSortParams("duration", "desc")}>
                      Duration <span className="text-xs">(High to Low)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

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
      </div>
    </Container>
  );
}

export default SearchVideos;
