import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { toast } from "react-toastify";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    if (connections) return;
    try {
      const connections = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(connections.data.data));
    } catch (error) {
      toast.error(error.messsage);
    }
  };
  useEffect(() => {
    fetchConnections();
    // eslint-disable-next-line
  }, []);
  if (!connections || !connections.length)
    return (
      <div className="flex justify-center my-10 text-slate-300">
        No Connections Found
      </div>
    );
  return (
    <div className="text-center my-10">
      <h1 className="text-2xl text-cyan-300">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoURL, gender, age } = connection;
        return (
          <div
            className="flex items-center p-4 rounded-2xl bg-white/6 backdrop-blur-md border border-white/10 text-slate-200 w-100 max-w-3xl mx-auto my-4 shadow-2xl ring-1 ring-white/6"
            key={_id}
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
