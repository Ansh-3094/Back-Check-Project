import React from "react";
import { Logo, Button, Input } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, userLogin } from "../store/Slices/authSlice.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginSkeleton from "../skeleton/loginSkeleton.jsx";

function Login() {
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  const submit = async (data) => {
    const isEmail = data.username.includes("@");
    const loginData = isEmail
      ? { email: data.username, password: data.password }
      : data;

    const response = await dispatch(userLogin(loginData));

    if (userLogin.rejected.match(response)) {
      const serverMessage =
        response?.payload || response?.error?.message || "Login failed";
      const credentialError = /invalid|incorrect|username|email|password/i.test(
        serverMessage,
      )
        ? "Invalid username or password"
        : serverMessage;

      setError("password", {
        type: "manual",
        message: credentialError,
      });
      return;
    }

    clearErrors("password");
    const user = await dispatch(getCurrentUser());
    if (user && response?.payload) {
      navigate("/");
    }
  };

  if (loading) {
    return <LoginSkeleton />;
  }

  return (
    <>
      <div className="flex min-h-screen w-full items-start justify-center p-3 text-white">
        <div className="app-panel mt-20 flex w-full max-w-xl flex-col items-center justify-center space-y-5 rounded-xl border border-slate-700 p-4">
          <div className="flex items-center gap-2 mt-5">
            <Logo />
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-5 p-2">
            <Input
              label="Username / Email : "
              type="text"
              placeholder="example@gmail.com"
              {...register("username", {
                required: "username is required",
                onChange: () => clearErrors("password"),
              })}
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
            <Input
              label="Password: "
              type="password"
              placeholder="1kd074fjw0"
              {...register("password", {
                required: "password is required",
                onChange: () => clearErrors("password"),
              })}
            />
            {errors.password && (
              <p className="rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm font-medium tracking-wide text-red-200 shadow-[0_0_0_1px_rgba(248,113,113,0.15)]">
                {errors.password.message}
              </p>
            )}

            <Button
              type="submit"
              bgColor="bg-(--brand)"
              className="w-full rounded-lg py-2 text-base font-semibold tracking-wide shadow-md shadow-black/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--brand-strong) sm:py-3 sm:text-lg"
            >
              Login
            </Button>

            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to={"/signup"}
                className="cursor-pointer font-semibold text-(--accent) decoration-2 underline-offset-4 transition hover:underline hover:text-white"
              >
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
