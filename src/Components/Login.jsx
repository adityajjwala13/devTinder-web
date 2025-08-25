import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailID, setEmailID] = useState("ravi@gmail.com");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("Ravi@4888");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const payload = {
        emailId: emailID,
        password: password,
      };
      const response = await axios.post(BASE_URL + "/login", payload, {
        withCredentials: true,
      });
      console.log(response);
      dispatch(addUser(response.data));
      navigate("/");
    } catch (error) {
      setError(error?.response.data || "Something went wrong");
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center mt-30">
      <div className="card bg-base-300 w-77 h-80 shadow-sm px-2">
        <div className="card-body">
          <h2 className="card-title justify-center mt-2">Login</h2>
          <div className="mt-2">
            <p className="label text-xs font-bold mb-1">Email ID</p>
            <label className="input">
              <input
                type="text"
                className="grow"
                value={emailID}
                onChange={(e) => {
                  setEmailID(e.target.value);
                  setError("");
                }}
              />
            </label>
          </div>
          <div className="mt-2">
            <p className="label text-xs font-bold mb-1">Password</p>
            <label className="input">
              <input
                type="password"
                className="grow"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary w-full py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
