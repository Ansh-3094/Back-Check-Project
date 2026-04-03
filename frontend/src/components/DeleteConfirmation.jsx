import React from "react";
import { ImBin } from "./icons.js";

function DeleteConfirmation({ onCancel, onDelete, comment, tweet, video }) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="w-full max-w-sm rounded-xl border border-(--line) bg-(--surface-strong) p-4 text-white shadow-xl">
          <div className="flex justify-center items-start p-3 flex-wrap gap-2 ">
            <ImBin color="red" size={25} />
            <div className="flex flex-col flex-wrap items-start">
              <h1 className="text-bold text-xl mb-1">
                Delete
                {`${comment ? "Comment" : ""} ${
                  tweet ? "Tweet" : ""
                } ${video ? "Video" : ""}`}{" "}
              </h1>
              <p className="text-xs text-start text-semibold w-60">
                <span>
                  Are you sure you want to delete this{" "}
                  {`${comment ? "Comment" : ""} ${
                    tweet ? "Tweet" : ""
                  } ${video ? "Video" : ""}`}
                  ?
                </span>{" "}
                <span>
                  Once its deleted, you will not be able to recover it.
                </span>
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-3 text-sm font-normal">
            <button
              onClick={onCancel}
              className="rounded-lg bg-(--surface) px-4 py-1.5 hover:bg-(--surface-strong)"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="rounded-lg bg-red-500 px-4 py-1.5 hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteConfirmation;
