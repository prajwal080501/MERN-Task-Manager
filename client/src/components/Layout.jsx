import React, { useContext, useEffect } from "react";
import Input from "./Input";
import SingleTodo from "./SingleTodo";
import toast from "react-hot-toast";
import Stats from "./Stats";
import { UserContext } from "../context/UserContext";
import Greet from "./Greet";
const Layout = () => {
  const [todos, setTodos] = React.useState([]);
  const { user, token } = useContext(UserContext);
  async function getTodos() {
    try {
      const response = await fetch(`http://localhost:8000/todo/${user?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const todos = await response.json();
      setTodos(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  useEffect(() => {
    user && token && getTodos();
  }, [user, token]);
  return (
    <div className="w-[90%] mx-auto">
      <Greet />
      <Input setTodos={setTodos} todos={todos} />
      <div>
        {user && todos ? (
          todos?.map((todo) => (
            <SingleTodo
              setTodos={setTodos}
              todos={todos}
              key={todo.id}
              todo={todo}
            />
          ))
        ) : (
          <div>
            <h1>No</h1>
          </div>
        )}
      </div>
      <Stats todos={todos} />
    </div>
  );
};

export default Layout;
