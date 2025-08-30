import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div className="flex justify-center my-10 ">
      {/* {feed &&
        feed.map((user) => {
          return <UserCard key={user._id} user={user} />;
        })} */}
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
};

export default Feed;
