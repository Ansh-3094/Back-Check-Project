import React, { useEffect } from "react";
import { Input2, Button } from "../components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../store/Slices/authSlice";

function EditPersonalInfo() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth?.userData);

  useEffect(() => {
    setValue("fullName", auth?.fullName);
    setValue("email", auth?.email);
  }, [auth, setValue]);

  const saveChanges = (data) => {
    // Only allow updating full name from this section
    dispatch(updateUserDetails({ fullName: data.fullName }));
  };

  return (
    <>
      <div className="w-full text-white flex justify-center items-center mt-5">
        <div className="bg-transparent p-5 border rounded shadow-lg w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">
            Personal Information
            <p className="font-light text-xs">
              Update your personal details here.
            </p>
          </h2>
          <form onSubmit={handleSubmit(saveChanges)} className="space-y-4">
            <div className="flex flex-col">
              <Input2
                label="Full Name"
                type="text"
                className="rounded"
                {...register("fullName", {
                  required: "FullName is required",
                })}
              />
              {errors.fullName && (
                <span className="text-sm text-red-500">
                  {errors.fullName?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Input2
                label="Email Address"
                type="email"
                className="rounded bg-slate-900/40 cursor-not-allowed opacity-75"
                disabled
                {...register("email")}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <Button
                type="submit"
                className="bg-(--brand) text-white px-4 py-2 rounded"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditPersonalInfo;
