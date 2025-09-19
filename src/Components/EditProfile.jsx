import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Toast from "./Toast";
import { toast } from "react-toastify";

const EditProfile = ({ user }) => {
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      if (age <= 0) {
        setError("ERROR: Age cannot be negative!!");
        return;
      }
      const payload = {
        firstName,
        lastName,
        age,
        gender,
        about,
        photoURL,
      };

      const res = await axios.patch(BASE_URL + "/profile/edit", payload, {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.data));
      toast.success("Profile updated successfully🚀");
      setError("");
    } catch (error) {
      setError(error?.response?.data || "Unable to save profile");
    }
  };

  return (
    <>
      <div className="relative z-10 w-90 max-w-2xl px-3 mt-0">
        <div className="card bg-white/6 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl">
          <div className="card-body my-0 p-6">
            <h2 className="card-title justify-center mt-1 text-cyan-300">
              Edit Profile
            </h2>
            <div className="mt-2">
              <p className="label text-xs font-bold mb-1 text-slate-300">
                First Name:
              </p>
              <label className="input">
                <input
                  type="text"
                  className="grow bg-transparent text-slate-200 placeholder-slate-400"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setError("");
                  }}
                />
              </label>
            </div>

            <div className="mt-2">
              <p className="label text-xs font-bold mb-1 text-slate-300">
                Last Name:
              </p>
              <label className="input">
                <input
                  type="text"
                  className="grow bg-transparent text-slate-200 placeholder-slate-400"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setError("");
                  }}
                />
              </label>
            </div>

            <div className="mt-2">
              <p className="label text-xs font-bold mb-1 text-slate-300">
                Photo URL:
              </p>
              <label className="input">
                <input
                  type="text"
                  className="grow bg-transparent text-slate-200 placeholder-slate-400"
                  value={photoURL}
                  onChange={(e) => {
                    setPhotoURL(e.target.value);
                    setError("");
                  }}
                />
              </label>
            </div>

            <div className="mt-2">
              <p className="label text-xs font-bold mb-1 text-slate-300">
                Age:
              </p>
              <label className="input">
                <input
                  type="text"
                  className="grow bg-transparent text-slate-200 placeholder-slate-400"
                  value={age}
                  onChange={(e) => {
                    // store empty string when cleared so controlled input stays empty
                    setAge(e.target.value);
                    setError("");
                  }}
                />
              </label>
            </div>

            <div className="mt-2">
              <p className="label text-xs font-bold mb-1 text-slate-300">
                Gender:
              </p>
              <select
                className="select select-bordered w-full bg-transparent text-slate-200 placeholder-slate-400 appearance-none"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setError("");
                }}
              >
                <option className="bg-slate-800 text-slate-200" value="male">
                  Male
                </option>
                <option className="bg-slate-800 text-slate-200" value="female">
                  Female
                </option>
                <option className="bg-slate-800 text-slate-200" value="others">
                  Others
                </option>
              </select>
            </div>

            <div className="mt-2">
              <p className="label text-xs font-bold mb-1 text-slate-300">
                About:
              </p>
              <label className="input">
                <input
                  type="text"
                  className="grow bg-transparent text-slate-200 placeholder-slate-400"
                  value={about}
                  onChange={(e) => {
                    setAbout(e.target.value);
                    setError("");
                  }}
                />
              </label>
            </div>

            {error && <p className="text-rose-400 mt-3">{error}</p>}

            <div className="card-actions justify-center mt-4">
              <button
                className="btn btn-primary rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-black"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, age, gender, about, photoURL }} />
    </>
  );
};

export default EditProfile;
