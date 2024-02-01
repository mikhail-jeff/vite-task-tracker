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
			className="todo-form_form">
			<input
				className="todo-form_input"
				type="text"
				placeholder="Enter a task..."
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
			/>
			<button
				className="todo-form_btn"
				type="submit">
				ADD
			</button>
		</form>
	);
};

export default TodoForm;
