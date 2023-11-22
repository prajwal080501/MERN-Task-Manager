import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { MdAdd } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../context/UserContext";
const Input = ({ todos, setTodos }) => {
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState(0);
  const { user, token } = useContext(UserContext);
  async function addTodo() {
    console.log(user._id);
    const newTodo = {
      id: uuidv4(),
      title: title,
      position: 0, // Set the position to 0 after adding to the state
      checked: false,
    };

    try {
      const response = await fetch("http://localhost:8000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          user_id: user._id,
          title: newTodo.title,
          position: newTodo.position,
          checked: newTodo.checked,
        }),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        const res = await response.json(); // Use await to get the JSON data
        toast.success(res.message);
        setTodos([...todos, newTodo]);
        console.log(res);
      } else {
        console.error(
          "Failed to add todo:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      toast.error(error);
    }

    setTitle("");
  }

  return (
    <div className="flex  items-center justify-center w-full p-3 space-x-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Add a todo"
        className="p-3 rounded-lg bg-white outline-none placeholder:font-medium text-black font-medium focus:ring focus:ring-blue-500 duration-200 w-[90%] shadow-lg"
      />
      <div className="flex items-center">
        <button
          disabled={!title}
          onClick={() => addTodo()}
          className="group bg-white rounded-full p-2 hover:bg-blue-500 duration-200 ease-linear shadow-lg hover:scale-105"
        >
          <MdAdd className="group-hover:text-white text-4xl" />
        </button>
      </div>
    </div>
  );
};

export default Input;
