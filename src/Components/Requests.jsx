import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import { removeConnections } from "../utils/connectionSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line
  }, []);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
      dispatch(removeConnections());
      // alert(`${status} successfully`);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchRequests = async () => {
    try {
      if (requests) return;
      const fetchRequests = await axios.get(
        BASE_URL + "/user/requests/received",
        { withCredentials: true }
      );
      dispatch(addRequests(fetchRequests.data.data));
    } catch (error) {
      console.error(error.message);
    }
  };
  if (!requests || !requests.length)
    return <div className="flex justify-center my-10">No Requests Found</div>;
  return (
    <div className="text-center my-10">
      <h1 className="text-2xl text-red-200">Connection Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoURL, gender, age } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center p-4 rounded-lg bg-base-300 w-1/3 mx-auto m-4"
          >
            <div>
              <img
                src={photoURL}
                alt="noPhoto"
                className="h-20 w-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>{age + ", " + gender}</p>
            </div>
            <div className="flex gap-3">
              <button
                className="btn btn-primary"
                onClick={() => reviewRequest("accepted", _id)}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequest("rejected", _id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
