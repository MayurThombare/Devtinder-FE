import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store)=> store.feed)
  const getFeed = async () => {
    if (!feedData) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  return <div className="flex justify-center my-4 align-middle">
   {feedData.length > 0 && <UserCard  user = {feedData[0]}/>}
  </div>;
};

export default Feed;
