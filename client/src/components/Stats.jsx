import React from "react";
import StatsCard from "./StatsCard";

const Stats = ({ todos }) => {
  const todosCount = todos?.length;
  return (
    <div className="w-full mt-10 h-full flex space-x-5">
      <StatsCard todosCount={todosCount} />
    </div>
  );
};

export default Stats;
