import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
const UserCard = ({ user }) => {
  const { _id,firstName, lastName, gender, about, photoUrl, skills } = user;
    const dispatch=useDispatch();
  const handleRequest = async (status, _id)=>{
    try {
        const res = await axios.post(BASE_URL+`/request/send/${status}/${_id}`,{},{withCredentials:true})
        dispatch(removeFeed(_id));
        console.log(res.data)
        
    } catch (error) {
        console.log(error.message)
    }
  }
  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt={`${firstName} ${lastName}`} />
        </figure>
        <div className="card-body">
          <h2 className=" text-2xl card-title">
            {firstName} {lastName}
          </h2>
          {gender && <p className="text-emerald-500">{gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={()=>handleRequest("ignored",_id)}>Ignore</button>
            <button className="btn btn-secondary"onClick={()=>handleRequest("interested",_id)}>Interesed</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
