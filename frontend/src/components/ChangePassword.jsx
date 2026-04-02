import React from "react";
import { Input2, Button } from "../components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword, userLogout } from "../store/Slices/authSlice";

function ChangePassword() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    resetField,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(
        changePassword({
          oldPassword: data?.oldPassword,
          newPassword: data?.newPassword,
        }),
      );

      // Only proceed if password change succeeded
      if (
        changePassword.fulfilled &&
        changePassword.fulfilled.match(resultAction)
      ) {
        resetField("oldPassword");
        resetField("newPassword");
        resetField("confirmPassword");

        await dispatch(userLogout());
        navigate("/login");
      }
    } catch (error) {
      // If password change fails, do not log out; errors are already surfaced via toast or form
    }
  };

  return (
    <div className="w-full text-white flex justify-center items-center mt-2">
      <div className="bg-transparent p-8 border rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <Input2
              label="Old Password"
              type="password"
              className="rounded"
              {...register("oldPassword", {
                required: "Old password is required",
              })}
            />
            {errors.oldPassword && (
              <span className="text-sm text-red-500">
                {errors.oldPassword.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input2
              label="New Password"
              type="password"
              className="rounded"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.newPassword && (
              <span className="text-sm text-red-500">
                {errors.newPassword.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input2
              label="Confirm New Password"
              type="password"
              className="rounded"
              {...register("confirmPassword", {
                required: "Please confirm your new password",
                validate: {
                  matchesNewPassword: (value) =>
                    value === getValues("newPassword") ||
                    "Passwords do not match",
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              className="bg-(--brand) text-white px-4 py-2 rounded"
            >
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
