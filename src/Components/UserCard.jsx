import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useLocation } from "react-router-dom";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoURL } = user;
  const dispatch = useDispatch();
  const location = useLocation();
  const handleRequest = async (status, toUserId) => {
    try {
      await axios.post(
        BASE_URL + `/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(toUserId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card w-80 min-h-[500px] ring-1 ring-white/6 rounded-2xl overflow-hidden bg-white/6 backdrop-blur-md border border-white/10 shadow-2xl text-slate-200">
      <figure>
        <img
          src={
            photoURL || "https://api.dicebear.com/7.x/miniavs/svg?seed=NoImg"
          }
          alt="No image.Please add one!"
          className="h-90 w-80"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-cyan-300">
          {firstName + " " + lastName}
        </h2>
        {age && gender && (
          <p className="text-slate-300">{age + ", " + gender}</p>
        )}
        <p className="text-slate-300">{about}</p>
        {location.pathname === "/" && (
          <div className="card-actions justify-center my-2 gap-3">
            <button
              className="btn bg-cyan-400 text-slate-900 border-0 hover:bg-cyan-300"
              onClick={() => handleRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-outline text-cyan-300 border-cyan-700 hover:bg-slate-900/30"
              onClick={() => handleRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
