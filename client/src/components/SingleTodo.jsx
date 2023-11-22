import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';

const SingleTodo = ({ todo, todos, setTodos }) => {
    const { _id, title, checked } = todo;
    const [checkedStatus, setCheckedStatus] = useState(checked);

    async function deleteTodo(id) {

        try {
            const response = await fetch(`http://localhost:8000/todo/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updatedTodos = todos?.filter((t) => t._id !== id);
                setTodos(updatedTodos);
                const res = await response.json();
                toast.success(res.message);
            } else {
                console.error('Failed to delete todo:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error while deleting todo:', error);
        }
    }

    // async function handleCheckedStatus(e) {
    //     e.preventDefault();

    //     // Update the specific todo's checked property in the local state
    //     setTodos((prevTodos) => {
    //         const updatedTodos = prevTodos?.map((t) =>
    //             t._id === _id ? { ...t, checked: !checkedStatus } : t
    //         );
    //         return updatedTodos;
    //     });

    //     // Use the updated checkedStatus here
    //     setCheckedStatus((prevCheckedStatus) => !prevCheckedStatus);

    //     try {
    //         // Update the specific todo's checked property on the server
    //         const response = await fetch(`http://localhost:8000/todo/${_id}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 title: title,
    //                 checked: !checkedStatus,
    //                 position: 0,
    //             }),
    //         });

    //         if (!response.ok) {
    //             console.error(
    //                 "Failed to update todo:",
    //                 response.status,
    //                 response.statusText
    //             );
    //             return;
    //         }

    //         // Fetch the latest todos from the server after the update
    //         const updatedDataResponse = await fetch("http://localhost:8000/todos");
    //         const updatedData = await updatedDataResponse.json();

    //         // Update the local state with the latest data
    //         setTodos(updatedData);

    //         toast.success("Todo updated successfully");
    //     } catch (error) {
    //         console.error("Error while updating todo:", error);
    //     }
    // }

    async function handleCheckedStatus(e) {
        e.preventDefault();

        // Update the specific todo's checked property in the local state
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos?.map((t) =>
                t._id === _id ? { ...t, checked: !checkedStatus } : t
            );
            return updatedTodos;
        });

        // Use the updated checkedStatus here
        setCheckedStatus((prevCheckedStatus) => !prevCheckedStatus);

        try {
            // Update the specific todo's checked property on the server
            const response = await fetch(`http://localhost:8000/todo/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    checked: !checkedStatus,
                    position: 0,
                }),
            });

            if (!response.ok) {
                console.error(
                    "Failed to update todo:",
                    response.status,
                    response.statusText
                );
            } else {
                toast.success("Todo updated successfully");
            }
        } catch (error) {
            console.error("Error while updating todo:", error);
        }
    }






    return (
        <div className='flex items-center px-3 py-3 bg-white rounded-lg mt-3'>
            <div className='flex w-full cursor-move space-x-4 items-center'>
                <input
                    type='checkbox'
                    name='todo'
                    checked={checkedStatus}
                    onChange={handleCheckedStatus}
                />
                <p className={`${checkedStatus && 'line-through text-red-500'}`}>{title}</p>
            </div>
            <button onClick={() => deleteTodo(todo._id)}>
                <MdDelete className='text-xl hover:scale-105 hover:text-red-500 duration-200 cursor-pointer' />
            </button>

        </div>
    );
};




export default SingleTodo;
