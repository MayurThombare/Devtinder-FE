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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const handleLogin = async () => {
    try {
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
    } catch (error) {
      setError(error.response.data.message || "something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true },
      );
      console.log(res.data.data);

      dispatch(addUser(res.data.data));
      navigate("/profile")
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm mx-auto ">
        <div className="card-body ">
          <h2 className="card-title mx-auto">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
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
              {!isLoginForm && (
                <fieldset className="fieldset my-1">
                  <label className="label" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="input"
                    placeholder="first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
              )}
              {!isLoginForm && (
                <fieldset className="fieldset my-1">
                  <label className="label" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="input"
                    placeholder="last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              )}
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
            <div>
              {" "}
              <p className="text-error">{error}</p>
            </div>

            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <div>
            <p onClick={() => setIsLoginForm((value) => !value)}>
              {isLoginForm
                ? "New Here ! please Sign Up"
                : "Already account exists, please login"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
