import React from "react";

const Skeleton = ({ variant = "row" }) => {
  if (variant === "card") {
    return (
      <div className="card w-80 min-h-[500px] ring-1 ring-white/6 rounded-2xl overflow-hidden bg-white/6 backdrop-blur-md border border-white/10 shadow-2xl text-transparent">
        <figure>
          <div className="h-90 w-80 bg-slate-700 animate-pulse" />
        </figure>
        <div className="card-body">
          <div className="h-6 bg-slate-700 rounded w-1/2 animate-pulse mb-3" />
          <div className="h-4 bg-slate-700 rounded w-1/3 animate-pulse mb-2" />
          <div className="h-3 bg-slate-700 rounded w-full animate-pulse mb-6" />
          <div className="flex justify-center gap-3">
            <div className="h-9 w-24 bg-slate-700 rounded animate-pulse" />
            <div className="h-9 w-24 bg-slate-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }
  // row skeleton (for lists)
  return (
    <div className="flex items-center p-4 rounded-2xl bg-white/4 backdrop-blur-sm border border-white/6 text-slate-400 w-100 max-w-3xl mx-auto my-4">
      <div className="h-12 w-12 rounded-full bg-slate-700 animate-pulse" />
      <div className="ml-4 flex-1">
        <div className="h-4 bg-slate-700 rounded w-1/3 animate-pulse" />
        <div className="h-3 bg-slate-700 rounded w-1/2 mt-2 animate-pulse" />
      </div>
    </div>
  );
};

export default Skeleton;
