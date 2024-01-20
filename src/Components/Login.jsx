import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "../axios.js";
import { UserContext } from "../UserContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const [loginError, setLoginError] = useState(null);

  async function loginUser(event) {
    event.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      setRedirect(true);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setLoginError("Incorrect email or password. Please try again.");
      } else if (error.response && error.response.status === 404) {
        setLoginError("User not found.");
      } else {
        setLoginError("Login failed. Please check your credentials.");
      }
      // setLoginError("Login failed. Please check your credentials.");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <div className="mt-10 flex flex-col justify-center items-center">
        <h1 className="text-4xl text-center mb-4 mt-10">LogIn</h1>
        {loginError && (
          <p className="text-red-500 mt-[10px]">{loginError}</p>
        )}
        <form
          onSubmit={loginUser}
          className="flex flex-col items-center justify-between"
        >
          <input
            className="mb-1.5 w-80 sm:w-[506px] h-14 pl-3 border border-[#dddddd] rounded text-lg"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            className="mb-1.5 w-80 sm:w-[506px] h-14 pl-3 border border-[#dddddd] rounded text-lg"
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button className="bg-[#ff385c] text-white p-2.5 w-full h-14 border-none rounded text-xl cursor-pointer">
            LogIn
          </button>
          <div className="pt-2.8 text-center text-[#64748b]">
            Don't have an account yet?{" "}
            <Link className="text-violet-600 underline ml-1" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
