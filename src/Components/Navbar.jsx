import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";
import { removeConnections } from "../utils/connectionSlice";
import { clearRequests } from "../utils/requestSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(clearFeed());
      dispatch(removeConnections());
      dispatch(clearRequests());
      navigate("/login");
      toast.success("Logout successful🤗");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="navbar bg-transparent shadow-sm sticky top-0 z-50 border-b border-white/5">
      <div className="flex-1">
        <Link
          to={user ? "/" : "/login"}
          className="btn btn-ghost text-xl hover:text-cyan-200 font-semibold"
        >
          🧑🏻‍💻 DevTinder
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          {user && (
            <div className="flex items-center justify-center">
              <p className="mr-2 cursor-pointer">Welcome, {user.firstName}</p>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mr-5"
              >
                {user.photoURL ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      alt="Profile"
                      src={user.photoURL}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-cyan-600 flex items-center justify-center ring-1 ring-white/10">
                    <span className="text-white font-semibold text-lg leading-none flex items-center justify-center h-full">
                      {(user.firstName?.[0] ?? "").toUpperCase()}
                      {(user.lastName?.[0] ?? "").toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-900 text-slate-200 rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-white/5"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/connections">Connections</Link>
            </li>
            <li>
              <Link to="/requests">Requests</Link>
            </li>
            <li>
              <Link onClick={handleLogout} className="text-rose-400">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
