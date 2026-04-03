import React from "react";
import { Link } from "react-router-dom";
import { Button, Logo } from "../components";

const LoginPopup = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-sm rounded-xl border border-(--line) bg-(--surface-strong) p-5 text-center text-white shadow-xl">
        <div className="flex flex-col gap-2 items-center mb-10">
          <Logo size="30" />
        </div>
        <p className="text-xl font-medium mb-2">Login or Signup to continue</p>
        <Link to="/login">
          <Button className="bg-(--brand) w-full py-2 px-4 font-bold text-lg rounded">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPopup;
