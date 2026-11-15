import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";
const Requests = () => {
  const dispatch = useDispatch();
  const requestData = useSelector((store) => store.request);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      console.log(res.data.data);
      dispatch(addRequest(res.data.data));
    } catch (error) {}
  };

  const reviewRequest = async (status, _id) => {
    const res = axios.post(
      BASE_URL + `/request/review/${status}/${_id}`,
      {},
      { withCredentials: true },
    );

    console.log(res);
    dispatch(removeRequest(_id));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requestData) return;
  if (requestData.length === 0)
    return <h1 className="text-center text-3xl my-4">No Requests</h1>;
  return (
    <div>
      <h1 className="text-center text-3xl my-4">Requests</h1>
      {requestData.map((request) => {
        return (
          <div className="flex justify-start items-center mx-4 border-base-200 bg-base-300 my-4 w-2/6 py-3">
            <div>
              <img
                className="w-20 h-20 rounded-full mx-2 "
                src="https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2 mx-3">
              <h1>
                {request.fromUserId.firstName} {request.fromUserId.lastName}
              </h1>
            </div>
            <div className="flex gap-4 mx-4">
              <button
                className="btn btn-primary"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Interesed
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
