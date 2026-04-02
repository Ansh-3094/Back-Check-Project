import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout, Login, SignUp } from "./components/index";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlice";
import {
  History,
  Channel,
  ChannelVideos,
  ChannelTweets,
  LikedVideos,
  VideoDetail,
  ChannelSubscribers,
  MySubscriptions,
  AdminDashboard,
  EditChannel,
  HomePage,
  LandingPage,
  SearchVideos,
  TermsAndConditions,
  ChannelPlaylist,
} from "./pages";
import { EditPersonalInfo, ChangePassword, Layout } from "./components";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AuthLayout authentication={false}>
              <LandingPage />
            </AuthLayout>
          }
        />
        <Route path="/" element={<Layout />}>
          <Route
            path="/explore"
            element={
              <AuthLayout authentication>
                <HomePage />
              </AuthLayout>
            }
          />
          <Route
            path="/search/:query"
            element={
              <AuthLayout authentication>
                <SearchVideos />
              </AuthLayout>
            }
          />
          <Route
            path="/channel/:username"
            element={
              <AuthLayout authentication>
                <Channel />
              </AuthLayout>
            }
          >
            <Route index element={<Navigate to="videos" replace />} />
            <Route
              path="videos"
              element={
                <AuthLayout authentication>
                  <ChannelVideos />
                </AuthLayout>
              }
            />
            <Route
              path="playlists"
              element={
                <AuthLayout authentication>
                  <ChannelPlaylist />
                </AuthLayout>
              }
            />
            <Route
              path="tweets"
              element={
                <AuthLayout authentication>
                  <ChannelTweets />
                </AuthLayout>
              }
            />
            <Route
              path="subscribed"
              element={
                <AuthLayout authentication>
                  <ChannelSubscribers />
                </AuthLayout>
              }
            />
          </Route>
          <Route
            path="/history"
            element={
              <AuthLayout authentication>
                <History />
              </AuthLayout>
            }
          />
          <Route
            path="/liked-videos"
            element={
              <AuthLayout authentication>
                <LikedVideos />
              </AuthLayout>
            }
          />
          <Route
            path="/subscriptions"
            element={
              <AuthLayout authentication>
                <MySubscriptions />
              </AuthLayout>
            }
          />
          <Route
            path="/collections"
            element={
              <AuthLayout authentication>
                <AdminDashboard />
              </AuthLayout>
            }
          />
          <Route
            path="/edit"
            element={
              <AuthLayout authentication>
                <EditChannel />
              </AuthLayout>
            }
          >
            <Route
              path="personalInfo"
              element={
                <AuthLayout authentication>
                  <EditPersonalInfo />
                </AuthLayout>
              }
            />
            <Route
              path="password"
              element={
                <AuthLayout authentication>
                  <ChangePassword />
                </AuthLayout>
              }
            />
          </Route>
        </Route>
        <Route
          path="/login"
          element={
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout authentication={false}>
              <SignUp />
            </AuthLayout>
          }
        />
        <Route
          path="/watch/:videoId"
          element={
            <AuthLayout authentication>
              <VideoDetail />
            </AuthLayout>
          }
        />
        <Route
          path="/terms&conditions"
          element={
            <AuthLayout authentication>
              <TermsAndConditions />
            </AuthLayout>
          }
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          error: {
            style: { borderRadius: "0", color: "red" },
          },
          success: {
            style: { borderRadius: "0", color: "green" },
          },
          duration: 2000,
        }}
      />
    </>
  );
}

export default App;
