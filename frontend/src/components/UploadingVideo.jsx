import React from "react";
import { PiFilmReelFill } from "react-icons/pi";
import { Spinner, Button } from "./index";
import { IoCloseCircleOutline, TiTick } from "./icons";
import { useDispatch } from "react-redux";
import { updateUploadState } from "../store/Slices/videoSlice";

function UploadingVideo({
  videoFileName,
  fileSize,
  setUploadVideoPopup,
  uploaded,
}) {
  const dispatch = useDispatch();

  const handleCancelAndFinish = () => {
    setUploadVideoPopup((prev) => ({
      ...prev,
      uploadVideo: false,
    }));
    dispatch(updateUploadState());
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="w-full max-w-md space-y-5 rounded-xl border border-(--line) bg-(--surface-strong) p-4 text-white shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              {uploaded ? (
                <h1 className="text-lg font-bold">Uploaded Video</h1>
              ) : (
                <h1 className="text-lg font-bold">Uploading Video...</h1>
              )}
              <span className="text-xs text-slate-400">
                Track your video uploading process.
              </span>
            </div>
            <IoCloseCircleOutline
              size={25}
              className="cursor-pointer"
              onClick={handleCancelAndFinish}
            />
          </div>
          <div className="border flex justify-start items-center p-1">
            <div className="mr-2">
              <PiFilmReelFill size={25} className="text-purple-500" />
            </div>
            <div className="">
              <h1 className="text-sm font-semibold">{videoFileName}</h1>
              <p className="text-xs">{fileSize} MB</p>
              <div className="flex gap-2 items-center mt-2">
                {uploaded ? (
                  <>
                    <span className="text-xs flex items-center">
                      <TiTick size={25} className="text-purple-500" />
                      Uploaded Successfully
                    </span>
                  </>
                ) : (
                  <>
                    <Spinner />
                    <span className="text-xs">Loading ...</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="md"
              className="flex-1"
              onClick={handleCancelAndFinish}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={handleCancelAndFinish}
            >
              Finish
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadingVideo;
