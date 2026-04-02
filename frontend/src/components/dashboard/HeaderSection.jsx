import React from "react";
import Button from "../Button";

function HeaderSection({ username, setPopUp }) {
  return (
    <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
      <div>
        <h1 className="text-4xl font-bold">Welcome Back, {username} </h1>
        <p className="text-xl font-light text-slate-400 mt-3">
          Seamless Video Management, Elevated Results.
        </p>
      </div>
      <div>
        <Button
          variant="primary"
          size="md"
          className="mr-10"
          onClick={() =>
            setPopUp((prev) => ({
              ...prev,
              uploadVideo: !prev.uploadVideo,
            }))
          }
        >
          {" "}
          Upload Video
        </Button>
      </div>
    </section>
  );
}

export default HeaderSection;
