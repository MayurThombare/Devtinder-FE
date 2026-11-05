import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [email, setEmail] = useState("virat@gmail.com");
  const [password, setPassword] = useState("Virat@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    const res = await axios.post(
      `${BASE_URL}/login`,
      {
        email,
        password,
      },
      { withCredentials: true },
    );

    // console.log(res.data);

    dispatch(addUser(res.data.data));

    navigate("/feed"); //
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm mx-auto ">
        <div className="card-body ">
          <h2 className="card-title mx-auto">Login</h2>
          <div>
            <fieldset className="fieldset my-1">
              <label className="label" htmlFor="name">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <fieldset className="fieldset my-1">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="input"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
            </fieldset>
          </div>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
