import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Header = () => {
  const [userData, setUserData] = useState({});
  const { user, saveUser, logout, token } = useContext(UserContext);
  const handleGoogleLogin = async (response) => {
    const data = jwtDecode(response.credential);
    const { name, email, picture } = data;
    console.log(data);
    const currentUserData = {
      name: name,
      email: email,
      profilePhoto: picture,
    };

    // setUserData(currentUserData);

    const res = await fetch("http://localhost:8000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        profilePhoto: data.picture,
      }),
    });

    const jsonRes = await res.json();

    saveUser(jsonRes.user, jsonRes.token);
    toast.success("Authentication Successfull");
  };

  const onError = (res) => {
    console.log(res);
    toast.error("Authentication error");
  };
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between w-screen px-6 py-5"
    >
      <div>
        <h1 className="text-3xl font-extrabold">Dashboard</h1>
      </div>

      <div>
        {!user ? (
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={onError}
            useOneTap
          />
        ) : (
          <div className="flex space-x-4 items-center">
            <img
              title={user.name}
              src={user.profilePhoto}
              alt=""
              className="w-10 h-18 rounded-full cursor-pointer"
            />
            <button
              onClick={logout}
              className="bg-rose-500 text-white px-2 py-2 rounded-lg font-medium"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Header;
