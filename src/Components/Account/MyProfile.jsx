import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext.jsx";
import { Navigate } from "react-router-dom";
import axios from "../../axios.js";


const MyProfile = () => {
  const { ready, user,setUser } = useContext(UserContext);
  const[redirect , setRedirect] = useState(null);

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading..";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }
  if(redirect){
    return <Navigate to={redirect}/>
  }
  return (
    <div className="ml-5">
      <div>
        <h1 className="text-4xl underline mb-2">Account</h1>
        <div>Logged in as <b>{user.name}</b>,({user.email})</div>
      </div>
      <button className="absolute bottom-10 left-5 bg-[#FF385C] p-4 rounded-full text-white text-xl" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default MyProfile;
