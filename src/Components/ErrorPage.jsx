import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Prefer navigation state (navigate('/error', { state: { message } }))
  const stateMsg = location?.state?.message;
  const params = new URLSearchParams(location.search);
  const queryMsg = params.get("msg");
  const msg = stateMsg || queryMsg || "An unexpected error occurred";

  return (
    <div className="flex justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-11/12 max-w-3xl px-4 mt-39 h-">
        <div className="p-6 rounded-2xl bg-white/6 backdrop-blur-md border border-white/8 shadow-2xl ring-1 ring-cyan-700/10">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-slate-900"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <path d="M12 9v4" strokeLinecap="round" />
                  <path d="M12 17h.01" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-cyan-300">
                Something went wrong
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                An error occurred while processing your request. You can try the
                suggestions below.
              </p>

              <div className="mt-4 bg-white/3 border border-white/6 rounded-md p-3">
                <pre className="whitespace-pre-wrap text-sm text-slate-200 font-mono">
                  {msg}
                </pre>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(-2);
                  }}
                  className="btn btn-outline text-cyan-300"
                >
                  Go Back
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="btn bg-cyan-400 text-slate-900"
                >
                  Home
                </button>

                <button
                  onClick={() => navigator.clipboard?.writeText(msg)}
                  className="btn btn-ghost text-slate-300"
                >
                  Copy Error
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
