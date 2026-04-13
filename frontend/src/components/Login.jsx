import React from "react";
import { Logo, Button, Input } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, userLogin } from "../store/Slices/authSlice.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginSkeleton from "../skeleton/LoginSkeleton.jsx";

function Login() {
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);
  const firstErrorField = ["username", "password"].find(
    (field) => errors[field],
  );

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
      navigate("/explore");
    }
  };

  if (loading) {
    return <LoginSkeleton />;
  }

  return (
    <>
      <div className="flex min-h-screen w-full items-start justify-center p-3 text-white sm:mt-8 no-scrollbar overflow-hidden">
        <div className="app-panel mt-20 flex w-full max-w-xl flex-col items-center justify-center space-y-5 rounded-xl border border-slate-700 p-4">
          <div className="flex items-center gap-2 mt-5">
            <Logo textSize="text-3xl" size="40" noLink />
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-5 p-2">
            <Input
              label="Username / Email : "
              type="text"
              placeholder="Enter Username or Email"
              className="h-8"
              {...register("username", {
                required: "Username is required",
                onChange: () => clearErrors("password"),
              })}
            />
            {errors.username && firstErrorField === "username" && (
              <p className="rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm font-medium tracking-wide text-red-200 shadow-[0_0_0_1px_rgba(248,113,113,0.15)]">
                {errors.username.message}
              </p>
            )}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter Password"
              className="h-8"
              {...register("password", {
                required: "Password is required",
                onChange: () => clearErrors("password"),
              })}
            />
            {errors.password && firstErrorField === "password" && (
              <p className="rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm font-medium tracking-wide text-red-200 shadow-[0_0_0_1px_rgba(248,113,113,0.15)]">
                {errors.password.message}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full shadow-md shadow-black/30"
            >
              Login
            </Button>

            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to={"/signup"}
                className="font-semibold text-[var(--accent)] !underline underline-offset-4 decoration-[1.5px] decoration-(--accent)hover:decoration-[3px] transition-all duration-200"
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
