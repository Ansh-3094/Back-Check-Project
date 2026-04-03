import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { IoCloseCircleOutline } from "react-icons/io5";

function SearchForSmallScreen({ open, setOpenSearch }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const search = (data) => {
    const query = data?.query;
    navigate(`/search/${query}`);
    setOpenSearch((prev) => !prev);
  };

  return (
    <>
      {open && (
        <div className="fixed bg-black bg-opacity-90 z-50 inset-0 h-screen w-full flex items-start justify-start">
          <div className="sm:p-8 p-4 relative w-full">
            <div className="absolute top-5 right-5">
              <IoCloseCircleOutline
                size={30}
                onClick={() => setOpenSearch((prev) => !prev)}
              />
            </div>
            <form
              onSubmit={handleSubmit(search)}
              className="flex items-center mt-10"
            >
              <Input
                type="text"
                placeholder="Search"
                className="mr-2"
                {...register("query", { required: true })}
              />
              <Button type="submit" variant="primary" size="md">
                Search
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchForSmallScreen;
