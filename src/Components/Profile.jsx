import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import Skeleton from "./Skeleton";

const Profile = () => {
  const user = useSelector((state) => state.user);
  if (!user)
    return (
      <div className="flex justify-center mt-6 mb-22 gap-9">
        <Skeleton variant="card" />
      </div>
    );
  return (
    user && (
      <div className="flex justify-center mt-6 mb-22 gap-9">
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
