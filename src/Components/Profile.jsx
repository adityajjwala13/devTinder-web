import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user);
  return (
    user && (
      <div className="flex justify-center mt-6 mb-22 gap-9">
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
