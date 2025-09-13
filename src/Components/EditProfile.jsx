import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Toast from "./Toast";

const EditProfile = ({ user }) => {
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoURL },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
    } catch (error) {
      setError(error?.response?.data);
    }
  };
  return (
    <>
      <div className="card bg-base-300 w-84 shadow-sm px-2">
        <div className="card-body">
          <h2 className="card-title justify-center mt-2">Edit Profile</h2>
          <div className="mt-1">
            <p className="label text-xs font-bold mb-1">First Name:</p>
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
            <p className="label text-xs font-bold mb-1">Last Name:</p>
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
          <div className="mt-1">
            <p className="label text-xs font-bold mb-1">Photo URL:</p>
            <label className="input">
              <input
                type="text"
                className="grow"
                value={photoURL}
                onChange={(e) => {
                  setPhotoURL(e.target.value);
                  setError("");
                }}
              />
            </label>
          </div>
          <div className="mt-1">
            <p className="label text-xs font-bold mb-1">Age:</p>
            <label className="input">
              <input
                type="text"
                className="grow"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  setError("");
                }}
              />
            </label>
          </div>
          <div className="mt-1">
            <p className="label text-xs font-bold mb-1">Gender:</p>
            <select
              className="select select-bordered w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              {/* <option value="">Select Gender</option> */}
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="mt-1">
            <p className="label text-xs font-bold mb-1">About:</p>
            <label className="input">
              <input
                type="text"
                className="grow"
                value={about}
                onChange={(e) => {
                  setAbout(e.target.value);
                  setError("");
                }}
              />
            </label>
          </div>

          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center mt-3">
            <button
              className="btn btn-primary py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-black"
              onClick={saveProfile}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, age, gender, about, photoURL }} />
    </>
  );
};

export default EditProfile;
