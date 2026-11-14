import axios from "axios";
import React from "react";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from './UserCard'
import Toast from "./Toast";
const EditProfile = ({ user }) => {

    const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false)

  const editPayload = {
    firstName: firstName,
    lastName: lastName,
    photoUrl: photoUrl,
    gender: gender,
    about: about,
  };

  const handleEditProfile = async () => {
    setError("");
    try {
         const res = await axios.patch(BASE_URL + "/profile/edit", editPayload, {
      withCredentials: true,
    });

    dispatch(addUser(res?.data?.data))
    setShowToast(true)

    setTimeout(()=>{
        setShowToast(false)
    },1000)
        
    } catch (error) {
        setError(error.message||"something went wrong")
        console.error(error)
        console.log(error)
        
    }
   




  };
  return (
    <>
    
    <div className="flex gap-10 justify-center items-center">
      <div className="flex justify-center items-center my-10">
        <div className="card bg-base-300 w-96 shadow-sm mx-auto ">
          <div className="card-body ">
            <h2 className="card-title mx-auto">Edit Profile</h2>
            <div>
              <fieldset className="fieldset my-1">
                <label className="label" htmlFor="name">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="input"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <fieldset className="fieldset my-1">
                  <label className="label" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="input"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset my-1">
                  <label className="label" htmlFor="photoUrl">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    id="photoUrl"
                    className="input"
                    placeholder="Photo URL"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset my-1">
                  <label className="label" htmlFor="gender">
                    gender
                  </label>
                  <input
                    type="text"
                    id="gender"
                    className="input"
                    placeholder="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset my-1">
                  <label className="label" htmlFor="about">
                    About
                  </label>
                  <input
                    type="text"
                    id="about"
                    className="input"
                    placeholder="about"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
              </fieldset>
            </div>
            <div className="card-actions justify-center my-2">
              <p className="text-error">{error}</p>
              <button className="btn btn-primary" onClick={handleEditProfile}>Save Profile</button>
            </div>
          </div>
        </div>
      </div>
       <UserCard user={{firstName, lastName, about, photoUrl, gender}}/>

       
    </div>

    {showToast && <div className="flex justify-end">
        <Toast message="Profile Saved Successfully" />
    </div>}
   
    </>
  );
};

export default EditProfile;
