import { createContext, useState } from "react";
import { googleLogout } from "@react-oauth/google";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(false);
  const saveUser = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };
  const logout = () => {
    googleLogout();
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const getUser = () => {
    const currentUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (currentUser && !user) {
      // Check if user is not already set
      setUser(JSON.parse(currentUser));
    }

    if (token) {
      setToken(token);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        saveUser,
        getUser,
        logout,
        token,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
