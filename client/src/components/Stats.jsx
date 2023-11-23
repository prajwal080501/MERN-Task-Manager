import React, { useContext, useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import { UserContext } from "../context/UserContext";

const Stats = ({ todos }) => {
  // const [todosCount, setTodosCount] = useState(0);
  const { token, user } = useContext(UserContext);
  const todosCount = todos.length;
  // const handleTodosCount = () => {
  //   setTodosCount(todos.length);
  // };
  // useEffect(() => {
  //   handleTodosCount();
  // }, [user, token]);
  return (
    <div className="w-full mt-10 h-full flex space-x-5">
      <StatsCard todosCount={todosCount} />
    </div>
  );
};

export default Stats;
