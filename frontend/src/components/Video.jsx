import React, { useEffect, useRef, useState } from "react";
import {
  FaExpand,
  FaPause,
  FaPlay,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";

function Video({ src, poster }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "0:00";
    const totalSeconds = Math.floor(seconds);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const isTypingTarget = (target) => {
      if (!target) return false;
      const tagName = target.tagName?.toLowerCase();
      return (
        tagName === "input" ||
        tagName === "textarea" ||
        tagName === "select" ||
        target.isContentEditable
      );
    };

    const seekBy = (videoElement, seconds) => {
      const targetTime = videoElement.currentTime + seconds;
      videoElement.currentTime = Math.max(
        0,
        Math.min(targetTime, videoElement.duration || 0),
      );
    };

    const updateVolume = (videoElement, delta) => {
      const nextVolume = Math.max(0, Math.min(1, videoElement.volume + delta));
      videoElement.volume = nextVolume;
      if (nextVolume > 0 && videoElement.muted) {
        videoElement.muted = false;
      }
    };

    const handleKeyDown = (event) => {
      const videoElement = videoRef.current;
      if (!videoElement || isTypingTarget(event.target)) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      const key = event.key.toLowerCase();

      if (key === " " || key === "k") {
        event.preventDefault();
        if (videoElement.paused) {
          videoElement.play();
        } else {
          videoElement.pause();
        }
      }

      if (key === "arrowright" || key === "l") {
        event.preventDefault();
        seekBy(videoElement, 10);
      }

      if (key === "arrowleft" || key === "j") {
        event.preventDefault();
        seekBy(videoElement, -10);
      }

      if (key === "arrowup") {
        event.preventDefault();
        updateVolume(videoElement, 0.05);
      }

      if (key === "arrowdown") {
        event.preventDefault();
        updateVolume(videoElement, -0.05);
      }

      if (key === "m") {
        event.preventDefault();
        videoElement.muted = !videoElement.muted;
      }

      if (key === "f") {
        event.preventDefault();
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          videoElement.requestFullscreen();
        }
      }

      if (key === "0") {
        event.preventDefault();
        videoElement.currentTime = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const onLoadStart = () => setIsLoading(true);
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);
    const onPlaying = () => setIsLoading(false);
    const onSeeked = () => setIsLoading(false);
    const onLoadedMetadata = () => setDuration(videoElement.duration || 0);
    const onTimeUpdate = () => setCurrentTime(videoElement.currentTime || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onVolumeChange = () => {
      setIsMuted(videoElement.muted);
      setVolume(videoElement.volume);
    };

    setIsLoading(true);
    videoElement.addEventListener("loadstart", onLoadStart);
    videoElement.addEventListener("waiting", onWaiting);
    videoElement.addEventListener("canplay", onCanPlay);
    videoElement.addEventListener("playing", onPlaying);
    videoElement.addEventListener("seeked", onSeeked);
    videoElement.addEventListener("loadedmetadata", onLoadedMetadata);
    videoElement.addEventListener("timeupdate", onTimeUpdate);
    videoElement.addEventListener("play", onPlay);
    videoElement.addEventListener("pause", onPause);
    videoElement.addEventListener("volumechange", onVolumeChange);

    return () => {
      videoElement.removeEventListener("loadstart", onLoadStart);
      videoElement.removeEventListener("waiting", onWaiting);
      videoElement.removeEventListener("canplay", onCanPlay);
      videoElement.removeEventListener("playing", onPlaying);
      videoElement.removeEventListener("seeked", onSeeked);
      videoElement.removeEventListener("loadedmetadata", onLoadedMetadata);
      videoElement.removeEventListener("timeupdate", onTimeUpdate);
      videoElement.removeEventListener("play", onPlay);
      videoElement.removeEventListener("pause", onPause);
      videoElement.removeEventListener("volumechange", onVolumeChange);
    };
  }, [src]);

  const togglePlay = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  };

  const handleSeek = (event) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const targetTime = Number(event.target.value);
    videoElement.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const toggleMute = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.muted = !videoElement.muted;
  };

  const handleVolume = (event) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const nextVolume = Number(event.target.value);
    videoElement.volume = nextVolume;
    if (nextVolume > 0 && videoElement.muted) {
      videoElement.muted = false;
    }
  };

  const toggleFullScreen = () => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerElement.requestFullscreen();
    }
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const volumePercentage = (isMuted ? 0 : volume) * 100;

  return (
    <div>
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-md bg-black"
      >
        {isLoading && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 rounded-lg border border-red-400/60 bg-red-950/45 px-5 py-4 shadow-[0_0_28px_rgba(239,68,68,0.28)]">
              <span className="h-10 w-10 animate-spin rounded-full border-4 border-red-400 border-t-red-100" />
              <span className="text-sm font-medium text-red-300">
                Loading video...
              </span>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          playsInline
          onClick={togglePlay}
          className={`h-64 w-full object-contain transition-opacity duration-300 sm:h-[68vh] xl:h-[72vh] ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        ></video>

        <div className="absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-black/80 to-transparent px-3 pb-2 pt-8">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="video-progress h-1.5 w-full cursor-pointer appearance-none rounded-full"
            style={{
              background: `linear-gradient(to right, #ff2d2d 0%, #ff2d2d ${progressPercentage}%, rgba(255,255,255,0.35) ${progressPercentage}%, rgba(255,255,255,0.35) 100%)`,
            }}
          />

          <div className="mt-2 flex items-center justify-between text-xs text-white sm:text-sm">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/35 transition-colors hover:bg-black/60"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
              </button>
              <span className="tabular-nums text-slate-200">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/35 transition-colors hover:bg-black/60"
                onClick={toggleMute}
                aria-label={isMuted || volume === 0 ? "Unmute" : "Mute"}
                title={isMuted || volume === 0 ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <FaVolumeMute size={13} />
                ) : (
                  <FaVolumeUp size={13} />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolume}
                className="video-volume h-1 w-16 cursor-pointer appearance-none rounded-full sm:w-24"
                style={{
                  background: `linear-gradient(to right, #ff2d2d 0%, #ff2d2d ${volumePercentage}%, rgba(255,255,255,0.35) ${volumePercentage}%, rgba(255,255,255,0.35) 100%)`,
                }}
              />
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/35 transition-colors hover:bg-black/60"
                onClick={toggleFullScreen}
                aria-label="Fullscreen"
                title="Fullscreen"
              >
                <FaExpand size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-2 rounded-md border border-slate-700/80 bg-slate-900/60 px-3 py-2 text-xs text-slate-300">
        Keyboard: Space/K play-pause, J/L or Left/Right seek 10s, Up/Down
        volume, M mute, F fullscreen.
      </div> */}
    </div>
  );
}

export default Video;
