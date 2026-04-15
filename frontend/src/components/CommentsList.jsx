import React, { useEffect, useRef, useState } from "react";
import { timeAgo } from "../helpers/timeAgo";
import { useSelector, useDispatch } from "react-redux";
import { Like, DeleteConfirmation, Edit } from "./index";
import { GrEdit, HiOutlineDotsVertical, ImBin } from "./icons";
import { deleteAComment, editAComment } from "../store/Slices/commentSlice";

function CommentsList({
  avatar,
  username,
  fullName,
  createdAt,
  updatedAt,
  content,
  commentId,
  isLiked,
  isDisliked,
  likesCount,
  ownerId,
  isLast,
}) {
  const avatar2 = useSelector(
    (state) =>
      state.auth?.userData?.avatar?.url || state.auth?.userData?.avatar,
  );
  const authUserId = useSelector((state) => state.auth?.userData?._id);
  const authUsername = useSelector((state) => state.auth?.userData?.username);
  const dispatch = useDispatch();
  const displayName = username || fullName || authUsername || "User";
  const isOwner =
    (authUserId && ownerId && String(authUserId) === String(ownerId)) ||
    (authUsername && username && authUsername === username);
  const menuRef = useRef(null);

  const [editState, setEditState] = useState({
    editing: false,
    editedContent: content,
    isOpen: false,
    delete: false,
    isEdited: Boolean(updatedAt && createdAt && updatedAt !== createdAt),
  });

  const handleEditComment = (editedContent) => {
    //console.log(editedContent);
    dispatch(editAComment({ commentId, content: editedContent }));
    setEditState((prevState) => ({
      ...prevState,
      editing: false,
      editedContent,
      isOpen: false,
      delete: false,
      isEdited: true,
    }));
  };

  const handleDeleteComment = () => {
    dispatch(deleteAComment(commentId));
    setEditState((prevState) => ({
      ...prevState,
      delete: false,
    }));
  };

  useEffect(() => {
    const closeMenuOnOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setEditState((prevState) => ({
          ...prevState,
          isOpen: false,
        }));
      }
    };

    document.addEventListener("mousedown", closeMenuOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", closeMenuOnOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="text-white w-full flex justify-start items-center gap-3 px-3 py-4 sm:gap-5 sm:px-5 sm:py-5">
        <div className="w-12 mt-5">
          {/** avatar can be an object ({ url }) or a plain string; fall back to current user avatar */}
          {(() => {
            const avatarUrl = avatar?.url || avatar || avatar2;
            return (
              <img
                src={avatarUrl}
                alt="comment avatar"
                className="w-13 h-11 object-cover rounded-full mb-4"
              />
            );
          })()}
        </div>
        <div className="w-full flex flex-col gap-1 relative">
          <div className="flex items-start gap-2 pr-8">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 pt-3">
                <h2 className="text-xs font-medium text-white">
                  {displayName}
                </h2>
                {editState.isEdited && (
                  <span className="rounded-md border border-(--brand)/40 bg-(--brand)/15 px-1.5 py-0.5 text-[10px] font-medium text-(--accent)">
                    Edited
                  </span>
                )}
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400">
                  {timeAgo(createdAt)}
                </span>
              </div>
            </div>

            {/*dropdown for edit and delete comment */}
            <div className="relative shrink-0 self-start" ref={menuRef}>
              <button
                type="button"
                aria-label="Comment actions"
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-300 transition hover:bg-(--surface-strong) hover:text-white pt-3"
                onClick={() => {
                  setEditState((prevState) => ({
                    ...prevState,
                    isOpen: !prevState.isOpen,
                  }));
                }}
              >
                <HiOutlineDotsVertical size={20} />
              </button>

              {editState.isOpen && (
                <div className="absolute right-0 top-9 z-30 w-40 rounded-xl border border-(--line) bg-(--surface-strong) p-1 shadow-2xl shadow-black/50">
                  {isOwner ? (
                    <ul className="space-y-1">
                      <li
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5"
                        onClick={() =>
                          setEditState((prevState) => ({
                            ...prevState,
                            editing: true,
                            isOpen: false,
                          }))
                        }
                      >
                        <GrEdit size={14} />
                        Edit
                      </li>
                      <li
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
                        onClick={() =>
                          setEditState((prevState) => ({
                            ...prevState,
                            delete: true,
                            isOpen: false,
                          }))
                        }
                      >
                        <ImBin size={13} />
                        Delete
                      </li>
                    </ul>
                  ) : (
                    <div className="rounded-lg px-3 py-2 text-xs text-slate-400">
                      Only the comment owner can edit or delete.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Delete Confirm popup */}
          {editState.delete && (
            <DeleteConfirmation
              onCancel={() =>
                setEditState((prevState) => ({
                  ...prevState,
                  delete: false,
                  isOpen: false,
                }))
              }
              onDelete={handleDeleteComment}
              comment={true}
            />
          )}

          {/* edit comment */}
          {editState.editing ? (
            <Edit
              initialContent={editState.editedContent}
              onCancel={() =>
                setEditState((prevState) => ({
                  ...prevState,
                  editing: false,
                  isOpen: false,
                }))
              }
              onSave={handleEditComment}
            />
          ) : (
            <p className="pr-10 text-sm text-slate-100">
              {editState.editedContent}
            </p>
          )}

          {/* Like for comments */}
          <Like
            isLiked={isLiked}
            isDisliked={isDisliked}
            likesCount={likesCount}
            commentId={commentId}
            size={17}
          />

          {/* {!isLast && <div className="mt-4 h-px w-full bg-black/60" />} */}
        </div>
      </div>
      <hr
        style={{
          width: "90%",
          margin: "1px auto",
          height: "2px",
        }}
      />
    </>
  );
}

export default CommentsList;
