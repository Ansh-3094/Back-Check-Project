import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllVideos, getVideoById } from "../store/Slices/videoSlice";
import {
  CommentList,
  TweetAndComment,
  Video,
  Description,
  Spinner,
  InfiniteScroll,
  Navbar,
  Container,
} from "../components";
import RelatedVideoCard from "../components/RelatedVideoCard";
import {
  cleanUpComments,
  getVideoComments,
} from "../store/Slices/commentSlice";

function VideoDetail() {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const video = useSelector((state) => state.video?.video);
  const videos = useSelector((state) => state.video?.videos?.docs || []);
  const comments = useSelector((state) => state.comment?.comments);
  const totalComments = useSelector((state) => state.comment?.totalComments);
  const hasNextPage = useSelector((state) => state.comment?.hasNextPage);
  const loading = useSelector((state) => state.comment?.loading);
  const [page, setPage] = useState(1);

  const relatedVideos = useMemo(
    () => videos.filter((item) => item?._id !== videoId).slice(0, 20),
    [videos, videoId],
  );

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById({ videoId }));
      dispatch(getVideoComments({ videoId }));
    }

    return () => dispatch(cleanUpComments());
  }, [dispatch, videoId]);

  useEffect(() => {
    if (!videos.length) {
      dispatch(getAllVideos({ page: 1, limit: 20 }));
    }
  }, [dispatch, videos.length]);

  const fetchMoreComments = useCallback(() => {
    if (!loading && hasNextPage) {
      dispatch(getVideoComments({ videoId, page: page + 1 }));
      setPage((prev) => prev + 1);
    }
  }, [page, loading, hasNextPage, dispatch, videoId]);

  return (
    <>
      <Navbar />
      <Container>
        <div className="app-panel mt-3 rounded-xl p-3 sm:p-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:gap-2">
            <div className="w-full xl:min-w-0 xl:w-3/5">
              <Video src={video?.videoFile} poster={video?.thumbnail} />
              <Description
                avatar={video?.owner?.avatar}
                channelName={video?.owner?.username}
                createdAt={video?.createdAt}
                description={video?.description}
                isSubscribed={video?.owner?.isSubscribed}
                likesCount={video?.likesCount}
                subscribersCount={video?.owner?.subscribersCount}
                title={video?.title}
                views={video?.views}
                key={video?._id}
                isLiked={video?.isLiked}
                isDisliked={video?.isDisliked}
                videoId={video?._id}
                channelId={video?.owner?._id}
              />
              <div className="px-3 font-semibold text-white sm:px-5">
                {totalComments} Comments
              </div>
              <TweetAndComment comment={true} videoId={video?._id} />
              <InfiniteScroll
                fetchMore={fetchMoreComments}
                hasNextPage={hasNextPage}
              >
                <div className="mb-20 w-full sm:mb-0">
                  {comments?.map((comment) => (
                    <CommentList
                      key={comment?._id}
                      avatar={comment?.owner?.avatar}
                      commentId={comment?._id}
                      content={comment?.content}
                      createdAt={comment?.createdAt}
                      updatedAt={comment?.updatedAt}
                      fullName={comment?.owner?.fullName}
                      isLiked={comment?.isLiked}
                      isDisliked={comment?.isDisliked}
                      likesCount={comment?.likesCount}
                      ownerId={comment?.owner?._id || comment?.owner}
                      username={comment?.owner?.username}
                    />
                  ))}
                  {loading && (
                    <div className="flex w-full items-center justify-center">
                      <Spinner width={10} />
                    </div>
                  )}
                </div>
              </InfiniteScroll>
            </div>

            <aside className="w-full xl:sticky xl:top-3 xl:max-h-[calc(100vh-105px)] xl:w-2/5 xl:overflow-y-auto">
              <div className="rounded-lg border border-slate-700 bg-(--bg-soft) p-2 sm:p-3">
                <h2 className="mb-2 px-1 text-sm font-semibold text-white">
                  Up next
                </h2>
                <div className="space-y-1">
                  {relatedVideos.length ? (
                    relatedVideos.map((relatedVideo) => (
                      <RelatedVideoCard
                        key={relatedVideo?._id}
                        video={relatedVideo}
                      />
                    ))
                  ) : (
                    <p className="px-2 py-3 text-sm text-slate-400">
                      More videos will appear here as soon as they load.
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </>
  );
}

export default VideoDetail;
