import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailID, setEmailID] = useState("ravi@gmail.com");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("Ravi@4888");
  const [showPassword, setShowPassword] = useState(false);
  const [alreadyMember, setMember] = useState(false);

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
      dispatch(addUser(response?.data.data));
      navigate("/");
    } catch (error) {
      setError(error?.response.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const payload = {
        firstName,
        lastName,
        emailId: emailID,
        password,
      };
      const response = await axios.post(BASE_URL + "/signup", payload, {
        withCredentials: true,
      });
      dispatch(addUser(response?.data.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-19">
      <div className="card bg-base-300 w-77 shadow-sm px-3">
        <div className="card-body my-0">
          <h2 className="card-title justify-center mt-2 text-xl font-bold">
            {!alreadyMember ? "Sign Up" : "Log in"}
          </h2>
          {!alreadyMember && (
            <>
              <div>
                <p className="label text-xs font-bold mb-1">First Name</p>
                <label className="input">
                  <input
                    type="text"
                    className="grow"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setError("");
                    }}
                  />
                </label>
              </div>
              <div className="mt-1">
                <p className="label text-xs font-bold mb-1">Last Name</p>
                <label className="input">
                  <input
                    type="text"
                    className="grow"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setError("");
                    }}
                  />
                </label>
              </div>
            </>
          )}
          <div className="mt-1">
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
          <div className="mt-1">
            <p className="label text-xs font-bold mb-1">Password</p>
            <label className="input">
              <input
                type={showPassword ? "text" : "password"}
                className="grow"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              ></input>
              {/* <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // 👈 toggle
                className="ml-2 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button> */}
              {showPassword ? (
                <button onClick={() => setShowPassword(false)}>
                  <Eye size={16} />
                </button>
              ) : (
                <button onClick={() => setShowPassword(true)}>
                  <EyeOff size={16} />
                </button>
              )}
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center mt-3">
            <button
              className="btn btn-primary rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-black w-59"
              onClick={!alreadyMember ? handleSignUp : handleLogin}
            >
              {!alreadyMember ? "Sign up" : "Log in"}
            </button>
          </div>
          <div className="text-center">
            {alreadyMember ? (
              <>
                Not a member?{" "}
                <button
                  className="text-blue-500 cursor-pointer font-semibold"
                  onClick={() => setMember(false)}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already a member?{" "}
                <button
                  className="text-blue-500 cursor-pointer font-semibold"
                  onClick={() => setMember(true)}
                >
                  Log in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
