import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoURL } = user;
  const dispatch = useDispatch();
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
    <div className="card bg-base-300 w-80 shadow-sm min-h-[500px]">
      <figure>
        <img
          src={
            photoURL || "https://api.dicebear.com/7.x/miniavs/svg?seed=NoImg"
          }
          alt="No image.Please add one!!"
          className="h-90 w-80"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + "," + " " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-2">
          <button
            className="btn btn-primary text-black"
            onClick={() => handleRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary text-black"
            onClick={() => handleRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
