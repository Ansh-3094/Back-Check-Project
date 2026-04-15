import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  deleting: false,
  uploading: false,
  uploaded: false,
  videos: {
    docs: [],
    hasNextPage: false,
  },
  video: null,
  publishToggled: false,
};

const mergeUniqueVideosById = (existingDocs = [], incomingDocs = []) => {
  const seen = new Set(existingDocs.map((video) => video?._id));
  const merged = [...existingDocs];

  incomingDocs.forEach((video) => {
    if (!seen.has(video?._id)) {
      seen.add(video?._id);
      merged.push(video);
    }
  });

  return merged;
};

export const getAllVideos = createAsyncThunk(
  "getAllVideos",
  async ({ userId, sortBy, sortType, query, page, limit }) => {
    try {
      const params = {};
      if (userId) params.userId = userId;
      if (query) params.query = query;
      if (page) params.page = page;
      if (limit) params.limit = limit;
      if (sortBy && sortType) {
        params.sortBy = sortBy;
        params.sortType = sortType;
      }

      // console.log("[videoSlice/getAllVideos] params:", params);
      const response = await axiosInstance.get("/video", { params });

      return response.data.data;
    } catch (error) {
      // toast.error(error?.response?.data?.error);
      throw error;
    }
  },
);

export const publishAvideo = createAsyncThunk(
  "publishAvideo",
  async (data, { signal }) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", data.videoFile[0]);
    formData.append("thumbnail", data.thumbnail[0]);

    try {
      const response = await axiosInstance.post("/video", formData, { signal });
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      // toast.error(error?.response?.data?.error);
      throw error;
    }
  },
);

export const updateAVideo = createAsyncThunk(
  "updateAVideo",
  async ({ videoId, data }) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("thumbnail", data.thumbnail[0]);

    try {
      const response = await axiosInstance.patch(
        `/video/v/${videoId}`,
        formData,
      );
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      // toast.error(error?.response?.data?.error);
      throw error;
    }
  },
);

export const deleteAVideo = createAsyncThunk(
  "deleteAVideo",
  async (videoId) => {
    try {
      const response = await axiosInstance.delete(`/video/v/${videoId}`);
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      // toast.error(error?.response?.data?.error);
      throw error;
    }
  },
);

export const getVideoById = createAsyncThunk(
  "getVideoById",
  async ({ videoId }) => {
    try {
      const response = await axiosInstance.get(`/video/v/${videoId}`);
      return response.data.data;
    } catch (error) {
      // toast.error(error?.response?.data?.error);
      throw error;
    }
  },
);

export const togglePublishStatus = createAsyncThunk(
  "togglePublishStatus",
  async (videoId) => {
    try {
      const response = await axiosInstance.patch(
        `/video/toggle/publish/${videoId}`,
      );
      toast.success(response.data.message);
      return response.data.data.isPublished;
    } catch (error) {
      // toast.error(error?.response?.data?.error);
      throw error;
    }
  },
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    updateUploadState: (state) => {
      state.uploading = false;
      state.uploaded = false;
    },
    makeVideosNull: (state) => {
      state.videos.docs = [];
      state.videos.hasNextPage = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllVideos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllVideos.fulfilled, (state, action) => {
      // console.log("[videoSlice] getAllVideos fulfilled", {
      //   docsLength: action.payload?.docs?.length,
      //   totalDocs: action.payload?.totalDocs,
      // });
      state.loading = false;
      const currentPage = Number(action.meta?.arg?.page) || 1;
      const incomingDocs = action.payload?.docs || [];

      if (currentPage === 1) {
        state.videos.docs = mergeUniqueVideosById([], incomingDocs);
      } else {
        state.videos.docs = mergeUniqueVideosById(
          state.videos.docs,
          incomingDocs,
        );
      }

      state.videos.hasNextPage = action.payload.hasNextPage;
    });
    builder.addCase(getAllVideos.rejected, (state, action) => {
      state.loading = false;
      console.error("[videoSlice] getAllVideos rejected", action.error);
    });
    builder.addCase(publishAvideo.pending, (state) => {
      state.uploading = true;
    });
    builder.addCase(publishAvideo.fulfilled, (state) => {
      state.uploading = false;
      state.uploaded = true;
    });
    builder.addCase(publishAvideo.rejected, (state) => {
      state.uploading = false;
      state.uploaded = false;
    });
    builder.addCase(updateAVideo.pending, (state) => {
      state.uploading = true;
    });
    builder.addCase(updateAVideo.fulfilled, (state) => {
      state.uploading = false;
      state.uploaded = true;
    });
    builder.addCase(updateAVideo.rejected, (state) => {
      state.uploading = false;
      state.uploaded = false;
    });
    builder.addCase(deleteAVideo.pending, (state) => {
      state.deleting = true;
    });
    builder.addCase(deleteAVideo.fulfilled, (state) => {
      state.deleting = false;
    });
    builder.addCase(deleteAVideo.rejected, (state) => {
      state.deleting = false;
    });
    builder.addCase(getVideoById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideoById.fulfilled, (state, action) => {
      state.loading = false;
      state.video = action.payload;
    });
    builder.addCase(getVideoById.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(togglePublishStatus.fulfilled, (state) => {
      state.publishToggled = !state.publishToggled;
    });
  },
});

export const { updateUploadState, makeVideosNull } = videoSlice.actions;

export default videoSlice.reducer;
