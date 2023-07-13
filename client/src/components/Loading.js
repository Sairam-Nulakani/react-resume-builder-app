import React from "react";
import { LoaderComp } from "./LoaderComp";

const Loading = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <LoaderComp />
      <div className="bg-blue-700  rounded-lg w-120 font-latoRegular text-white p-3 items-center justify-center mt-5">
        <h1 className="text-5xl">Loading, please wait...</h1>
      </div>
    </div>
  );
};

export default Loading;
