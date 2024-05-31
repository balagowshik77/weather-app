import React from "react";

const Loading = () => {
  return (
    <div className="min-w-screen h-[78vh] flex justify-center gap-2 flex-col items-center">
      <div
        className="inline-block h-24 w-24 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      <div className="text-xl font-semibold ">Getting Weather Details...</div>
    </div>
  );
};

export default Loading;
