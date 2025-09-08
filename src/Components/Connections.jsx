import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

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
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchConnections();
    // eslint-disable-next-line
  }, []);
  if (!connections || !connections.length)
    return (
      <div className="flex justify-center my-10">No Connections Found</div>
    );
  return (
    <div className="text-center my-10">
      <h1 className="text-2xl text-red-200">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoURL, gender, age } = connection;
        return (
          <div
            className="flex items-center p-4 rounded-lg bg-base-300 w-90 mx-auto m-4"
            key={_id}
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
