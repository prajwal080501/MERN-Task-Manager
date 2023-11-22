import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

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

    console.log(jsonRes, token);
    saveUser(jsonRes.user, jsonRes.token);
  };

  const onError = (res) => {
    console.log(res);
  };
  return (
    <div className="flex items-center justify-between w-screen px-6 py-5">
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
            <p className="text-lg bg-blue-500 rounded-lg text-white p-2 font-bold">
              {user?.name}
            </p>
            <button
              onClick={logout}
              className="bg-rose-500 text-white px-2 py-2 rounded-lg font-medium"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
