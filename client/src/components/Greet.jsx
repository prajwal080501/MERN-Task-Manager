import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Greet = () => {
  const { user, loading, setLoading } = useContext(UserContext);

  return (
    <div>
      <p className="text-2xl  tracking-wide text-left">
        Welcome <span className="font-extrabold">{user?.name}</span>
      </p>
    </div>
  );
};

export default Greet;
