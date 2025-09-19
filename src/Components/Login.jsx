import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailID, setEmailID] = useState("dua@gmail.com");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("Dua@4888");
  const [showPassword, setShowPassword] = useState(false);
  const [alreadyMember, setMember] = useState(true);

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
      toast.success("Login successful🚀");
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Unable to reach server!!");
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
      toast.success("Signup successful🚀");
      navigate("/profile");
    } catch (error) {
      setError(error?.response.data || "Unable to reach server!!");
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <svg
        className="absolute left-6 top-10 opacity-10 w-48 h-48 text-cyan-400"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="0"
          y="40"
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

      {/* subtle overlay to tint to DevTinder theme */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/40"></div>

      {/* frosted card */}
      <div className="relative z-10 w-90 max-w-md px-7 mt-20">
        <div className="card bg-white/6 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl">
          <div className="card-body">
            <h2 className="card-title justify-center mt-2 text-xl font-bold tracking-wide">
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
                <div>
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
            <div>
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
            <div>
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
                className="btn btn-primary rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-black w-62"
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
                    className="text-blue-400 cursor-pointer font-semibold"
                    onClick={() => setMember(false)}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already a member?{" "}
                  <button
                    className="text-blue-400 cursor-pointer font-semibold"
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
    </div>
  );
};

export default Login;
