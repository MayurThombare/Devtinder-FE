import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, gender, about, photoUrl, skills } = user;
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
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interesed</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
