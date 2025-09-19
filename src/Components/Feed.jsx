import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import Skeleton from "./Skeleton";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const getFeed = async () => {
    if (feed) return;
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      // console.log(res);
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFeed();
    //eslint-disable-next-line
  }, []);
  if (loading)
    return (
      <div className="flex justify-center my-10">
        <Skeleton variant="card" />
      </div>
    );

  if (!feed || feed.length <= 0)
    return (
      <div className="flex justify-center my-10">No new users found!!</div>
    );
  return (
    <div className="flex justify-center my-10 ">
      {/* {feed &&
        feed.map((user) => {
          return <UserCard key={user._id} user={user} />;
        })} */}
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
