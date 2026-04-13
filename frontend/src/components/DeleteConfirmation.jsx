import React from "react";
import { ImBin } from "./icons.js";

function DeleteConfirmation({ onCancel, onDelete, comment, tweet, video }) {
  const itemType = `${comment ? "Comment" : ""}${tweet ? "Tweet" : ""}${video ? "Video" : ""}`;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="w-full max-w-sm rounded-xl border border-(--line) bg-(--surface-strong) p-5 text-white shadow-2xl shadow-black/40">
          <div className="mb-4 flex items-start gap-3">
            <div className="rounded-full bg-red-500/20 p-2">
              <ImBin color="#ff6b63" size={18} />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Delete {itemType}</h1>
              <p className="mt-1 text-sm text-slate-300">
                Are you sure you want to delete this {itemType.toLowerCase()}?
              </p>
              <p className="mt-1 text-xs text-slate-400">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-3 text-sm font-medium">
            <button
              onClick={onCancel}
              className="rounded-lg border border-(--line) bg-(--surface) px-4 py-2 text-slate-200 transition hover:bg-(--surface-strong)"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="rounded-lg bg-(--brand) px-4 py-2 text-white transition hover:bg-(--brand-strong)"
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
