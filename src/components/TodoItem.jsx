/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTodo } from "../contexts";

import { MdDelete, MdEdit, MdSave } from "react-icons/md";

import { toast, Slide } from "react-toastify";

const TodoItem = ({ todo }) => {
	const [isTodoEditable, setIsTodoEditable] = useState(false);
	const [todoTitle, setTodoTitle] = useState(todo.todo);

	const { updateTodo, deleteTodo, toggleComplete } = useTodo();

	const editTodo = () => {
		if (todoTitle.trim() === "") {
			toast.error("Task cannot be empty.", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				transition: Slide,
			});
			return;
		}

		updateTodo(todo.id, { ...todo, todo: todoTitle });

		setIsTodoEditable(false);
	};

	return (
		<div className="todo-item_container">
			<input
				className="cursor-pointer bg-[#005CC8] hover:bg-[#0f66ca]"
				type="checkbox"
				checked={todo.completed}
				onChange={() => toggleComplete(todo.id)}
			/>

			{isTodoEditable ? (
				<input
					className={`border outline-none w-full bg-white rounded-lg ${isTodoEditable ? "border-black/30 px-2 " : "border-transparent"}`}
					type="text"
					value={todoTitle}
					onChange={(e) => setTodoTitle(e.target.value)}
					readOnly={!isTodoEditable}
				/>
			) : (
				<span className={`flex-1 ${todo.completed ? "line-through opacity-40" : ""} `}>{todoTitle}</span>
			)}

			<button
				className="todo-item_btn"
				onClick={() => {
					if (todo.completed) return;
					if (isTodoEditable) {
						editTodo();
					} else {
						setIsTodoEditable((prev) => !prev);
					}
				}}
				disabled={todo.completed}>
				{isTodoEditable ? <MdSave className="text-white" /> : <MdEdit className="text-white" />}
			</button>

			<button
				className="todo-item_btn"
				onClick={() => deleteTodo(todo.id)}>
				<MdDelete className="text-white" />
			</button>
		</div>
	);
};

export default TodoItem;
