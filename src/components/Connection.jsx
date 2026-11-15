import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
const Connection = () => {
  const connectiondata = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/connections",

        { withCredentials: true },
      );

      console.log(res?.data?.data);
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connectiondata) return;
  if (connectiondata.length === 0) return <h1>No COnnection</h1>;
  return (
    <>
      <div>
        {" "}
        <h1 className="text-center text-3xl my-4">Connections</h1>{" "}
      </div>
      <div className="flex flex-wrap">
        {connectiondata.map((connection) => {
          return (
            <div className="flex  flex-row justify-start items-center mx-4 border-base-200 bg-base-300 my-4 w-1/4 py-3">
              <div>
                <img
                  className="w-20 h-20 rounded-full mx-2 "
                  src={connection.photoUrl}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-2 mx-3">
                <h1>{connection.firstName}</h1>
                <p> {connection.about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Connection;
