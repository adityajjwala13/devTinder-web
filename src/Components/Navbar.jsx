import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";
import { removeConnections } from "../utils/connectionSlice";
import { clearRequests } from "../utils/requestSlice";

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
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm sticky top-0 z-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          🧑🏻‍💻DevTinder
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
                  <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connections">Connections</Link>
            </li>
            <li>
              <Link to="/requests">Requests</Link>
            </li>
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
