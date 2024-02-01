import { useState } from "react";
import { useTodo } from "../contexts";

import { toast, Slide } from "react-toastify";

const TodoForm = () => {
	const [todo, setTodo] = useState("");

	const { addTodo } = useTodo();

	const add = (e) => {
		e.preventDefault();

		if (todo.trim() === "") {
			toast.error("Please, enter a task", {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				transition: Slide,
			});
		} else {
			addTodo({ todo, completed: false });

			toast.success("Task added succesfuly", {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				transition: Slide,
			});

			setTodo("");
		}
	};

	return (
		<form
			onSubmit={add}
			className="flex justify-center mx-3 mb-5">
			<input
				className="w-full sm:w-[600px] md:w-[800px] lg:w-[1130px]  rounded-l-lg px-3 outline-none bg-white py-3 sm:rounded-tl-lg sm:rounded-bl-lg"
				type="text"
				placeholder="Enter a task..."
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
			/>
			<button
				className="rounded-r-lg px-3 py-2 bg-[#005CC8] hover:bg-[#0f66ca]   shrink-0 uppercase font-semibold text-white"
				type="submit">
				ADD
			</button>
		</form>
	);
};

export default TodoForm;
