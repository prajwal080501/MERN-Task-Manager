import React, { useEffect } from 'react';
import Input from './Input';
import SingleTodo from './SingleTodo';
import toast from "react-hot-toast";
import Stats from './Stats';
const Layout = () => {
    const [todos, setTodos] = React.useState([

    ]);
    async function getTodos() {
        try {
            const response = await fetch("http://localhost:8000/todo", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const todos = await response.json();
            setTodos(todos)
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }


    useEffect(() => {
        getTodos();
    }, [todos]);


    return (
        <div className='w-[90%] mx-auto'>
            <Input setTodos={setTodos} todos={todos} />
            <div>
                {todos?.map((todo) => (
                    <SingleTodo setTodos={setTodos} todos={todos} key={todo.id} todo={todo} />
                ))}
            </div>
            <Stats todos={todos}/>
        </div>
    );
};

export default Layout;
