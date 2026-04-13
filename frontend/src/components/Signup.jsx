import React from "react";
import { Logo, Button, Input } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createAccount, userLogin } from "../store/Slices/authSlice.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginSkeleton from "../skeleton/LoginSkeleton.jsx";
import GetImagePreview from "./GetImagePreview.jsx";
import toast from "react-hot-toast";

function SignUp() {
  const {
    handleSubmit,
    register,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);
  const firstErrorField = [
    "avatar",
    "username",
    "email",
    "fullName",
    "password",
  ].find((field) => errors[field]);

  const submit = async (data) => {
    try {
      await dispatch(createAccount(data)).unwrap();

      const username = data?.username;
      const password = data?.password;
      await dispatch(userLogin({ username, password })).unwrap();

      navigate("/terms&conditions");
    } catch (error) {
      const message =
        typeof error === "string" ? error : error?.message || "Signup failed";

      if (/username/i.test(message)) {
        setError("username", {
          type: "server",
          message,
        });
      } else if (/email/i.test(message)) {
        setError("email", {
          type: "server",
          message,
        });
      } else if (/avatar/i.test(message)) {
        setError("avatar", {
          type: "server",
          message,
        });
      }

      toast.error(message);
    }
  };

  if (loading) {
    return <LoginSkeleton />;
  }

  return (
    <>
      <div className="flex min-h-screen w-full items-start justify-center p-3 text-white sm:mt-8 no-scrollbar overflow-hidden">
        <div className="app-panel flex w-full max-w-xl flex-col items-center justify-center space-y-2 rounded-xl border border-slate-700 p-4">
          <div className="flex items-center gap-2">
            <Logo textSize="text-3xl" size="40" noLink />
          </div>
          <form
            onSubmit={handleSubmit(submit)}
            className="space-y-4 p-2 text-sm sm:w-96 w-full"
          >
            <div className="relative h-28 w-full">
              <div className="w-full h-full">
                <GetImagePreview
                  name="coverImage"
                  control={control}
                  className="w-full h-28 object-cover border-none rounded"
                  cameraIcon
                />
                <div className="absolute bottom-2 right-2 cursor-default text-sm hover:text-(--accent)">
                  Cover Image
                </div>
              </div>
              <div className="absolute left-2 bottom-2 rounded-full border-2">
                <GetImagePreview
                  name="avatar"
                  control={control}
                  className="object-cover rounded-full h-20 w-20 outline-none"
                  cameraIcon={true}
                  cameraSize={20}
                  rules={{ required: "Avatar is required" }}
                />
              </div>

              {/* <label
                                htmlFor="avatar"
                                className="cursor-pointer"
                            >
                                <div className="absolute h-24 w-24 left-2 bottom-2 flex justify-center items-center">
                                    <img
                                        src={avatarPreview}
                                        className=" object-cover w-full h-full border-2 border-double rounded-full"
                                    />
                                    <FaCamera
                                        className="absolute hover:text-purple-500"
                                        size={20}
                                    />
                                </div>
                                <Controller
                                    name="avatar"
                                    control={control}
                                    render={({ field: { onChange } }) => (
                                        <input
                                            id="avatar"
                                            type="file"
                                            className="hidden"
                                            accept="image/png, image/jpeg"
                                            onChange={(e) => {
                                                onChange(handleAvatarChange(e));
                                            }}
                                        />
                                    )}
                                    rules={{ required: "avatar is required" }}
                                />
                            </label> */}
            </div>
            {errors.avatar && firstErrorField === "avatar" && (
              <p className="rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm font-medium tracking-wide text-red-200 shadow-[0_0_0_1px_rgba(248,113,113,0.15)]">
                {errors.avatar.message}
              </p>
            )}
            <div className="space-y-1">
              <Input
                label="Username: "
                type="text"
                placeholder="Enter Username"
                {...register("username", {
                  required: "Username is required",
                  onChange: () => clearErrors("username"),
                })}
                className="h-8"
              />
              {errors.username && firstErrorField === "username" && (
                <p className="rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm font-medium tracking-wide text-red-200 shadow-[0_0_0_1px_rgba(248,113,113,0.15)]">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Input
                label="Email: "
                type="email"
                placeholder="Enter Email"
                {...register("email", {
                  required: "Email is required",
                  onChange: () => clearErrors("email"),
                })}
                className="h-8"
              />
              {errors.email && firstErrorField === "email" && (
                <p className="rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm font-medium tracking-wide text-red-200 shadow-[0_0_0_1px_rgba(248,113,113,0.15)]">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Input
                label="Fullname: "
                type="text"
                placeholder="Enter Fullname"
                {...register("fullName", {
                  required: "Fullname is required",
                  onChange: () => clearErrors("fullName"),
                })}
                className="h-8"
              />
              {errors.fullName && firstErrorField === "fullName" && (
                <p className="rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm font-medium tracking-wide text-red-200 shadow-[0_0_0_1px_rgba(248,113,113,0.15)]">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Input
                label="Password: "
                type="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: "Password is required",
                  onChange: () => clearErrors("password"),
                })}
                className="h-8"
              />
              {errors.password && firstErrorField === "password" && (
                <p className="rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm font-medium tracking-wide text-red-200 shadow-[0_0_0_1px_rgba(248,113,113,0.15)]">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full shadow-md shadow-black/30"
            >
              Signup
            </Button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-semibold text-[var(--accent)] !underline underline-offset-4 decoration-[1.5px] decoration-(--accent)hover:decoration-[3px] transition-all duration-200"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
