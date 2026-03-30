import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  subscribed: null,
  channelSubscribers: [],
  mySubscriptions: [],
};

export const toggleSubscription = createAsyncThunk(
  "toggleSubscription",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/subscriptions/channels/${channelId}/subscribe`,
      );
      return response.data.data.subscribed;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Subscription action failed";
      // toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const getUserChannelSubscribers = createAsyncThunk(
  "getUserChannelSubscribers",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/subscriptions/channels/${channelId}/subscribers`,
      );
      return response.data.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to fetch channel subscribers";
      // toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const getSubscribedChannels = createAsyncThunk(
  "getSubscribedChannels",
  async (subscriberId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/subscriptions/users/${subscriberId}/subscriptions`,
      );
      return response.data.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to fetch subscriptions";
      // toast.error(message);
      return rejectWithValue(message);
    }
  },
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleSubscription.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(toggleSubscription.fulfilled, (state, action) => {
      state.loading = false;
      state.subscribed = action.payload;
    });
    builder.addCase(getUserChannelSubscribers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserChannelSubscribers.fulfilled, (state, action) => {
      state.loading = false;
      state.channelSubscribers = action.payload;
    });
    builder.addCase(getSubscribedChannels.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSubscribedChannels.fulfilled, (state, action) => {
      state.loading = false;
      state.mySubscriptions = action.payload.filter(
        (subscription) => subscription?.subscribedChannel?.latestVideo,
      );
    });
    builder.addCase(getSubscribedChannels.rejected, (state) => {
      state.loading = false;
      state.mySubscriptions = [];
    });
  },
});

export default subscriptionSlice.reducer;
