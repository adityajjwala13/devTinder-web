import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Bounce, ToastContainer } from "react-toastify";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (error) {
        if (error.status === 401) navigate("/login");
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Decorative code glyphs */}
      <svg
        className="absolute left-6 top-10 opacity-5 w-48 h-48 text-cyan-400"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <text
          x="0"
          y="60"
          fontSize="72"
          fontFamily="monospace"
          fill="currentColor"
        >{`<>`}</text>
      </svg>
      <svg
        className="absolute right-6 bottom-10 opacity-10 w-48 h-48 text-pink-400"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="0"
          y="48"
          fontSize="62"
          fontFamily="monospace"
          fill="currentColor"
        >{`</>`}</text>
      </svg>
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/40 pointer-events-none"
        aria-hidden
      ></div>

      <div className="relative z-10 min-h-screen pb-20">
        <ToastContainer
          position="top-right"
          autoClose={1600}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="dark"
          transition={Bounce}
          toastStyle={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#E6EEF3",
            borderRadius: "12px",
            boxShadow: "0 8px 30px rgba(2,6,23,0.6)",
            padding: "12px 14px",
            maxWidth: "360px",
            zIndex: 9999,
          }}
        />
        <Navbar />
        <Outlet />
        {/* This will render the child routes */}
        <Footer />
      </div>
    </div>
  );
};

export default Body;
