import React, { useState } from "react";

function Edit({ initialContent, onCancel, onSave }) {
  const [editedContent, setEditedContent] = useState(initialContent);

  const handleSave = () => {
    onSave(editedContent);
  };

  return (
    <div className="w-full text-sm">
      <input
        className="bg-(--surface) outline-none border-b border-(--line) w-3/4 p-2"
        value={editedContent}
        autoFocus
        onChange={(e) => setEditedContent(e.target.value)}
      />
      <div className="space-x-4 mt-3 w-3/4 inline-flex justify-end items-center">
        <span
          className="bg-(--surface) py-1 px-3 font-normal rounded-lg hover:bg-(--surface-strong) cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </span>
        <button
          onClick={handleSave}
          className="bg-(--surface) py-1 px-3 font-normal rounded-lg hover:bg-(--surface-strong) cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Edit;
