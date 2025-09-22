import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";
import { removeConnections } from "../utils/connectionSlice";
import Skeleton from "./Skeleton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      if (requests) return;
      const fetchRequests = await axios.get(
        BASE_URL + "/user/requests/received",
        { withCredentials: true }
      );
      dispatch(addRequests(fetchRequests.data.data));
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to load request";
      navigate("/error", { state: { message } });
    } finally {
      setLoading(false);
    }
  };
  if (loading)
    return (
      <div className="text-center my-10">
        <h1 className="text-2xl text-cyan-300">Connection Requests</h1>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );

  if (!requests || !requests.length)
    return (
      <div className="flex justify-center my-10 text-slate-300">
        No Requests Found
      </div>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-2xl text-cyan-300">Connection Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoURL, gender, age } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center p-4 rounded-2xl bg-white/6 backdrop-blur-md border border-white/10 text-slate-200 max-w-3xl w-140 mx-auto my-4 shadow-2xl ring-1 ring-white/6"
          >
            <div>
              <img
                src={
                  photoURL ||
                  "https://api.dicebear.com/7.x/miniavs/svg?seed=NoImg"
                }
                alt="noPhoto"
                className="h-20 w-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl text-cyan-200">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p className="text-slate-300">{age + ", " + gender}</p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                className="btn bg-cyan-400 text-slate-900 border-0 hover:bg-cyan-300"
                onClick={() => reviewRequest("accepted", _id)}
              >
                Accept
              </button>
              <button
                className="btn btn-outline text-cyan-300 border-cyan-700 hover:bg-slate-900/30"
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
