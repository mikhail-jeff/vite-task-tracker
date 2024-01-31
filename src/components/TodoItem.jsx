/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTodo } from "../contexts";

import { MdDelete, MdEdit, MdSave } from "react-icons/md";

import { toast, Slide } from "react-toastify";

const TodoItem = ({ todo }) => {
	const [isTodoEditable, setIsTodoEditable] = useState(false);
	const [todoMsg, setTodoMsg] = useState(todo.todo);

	const { updateTodo, deleteTodo, toggleComplete } = useTodo();

	const editTodo = () => {
		if (todoMsg.trim() === "") {
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

		updateTodo(todo.id, { ...todo, todo: todoMsg });

		setIsTodoEditable(false);
	};

	const toggleCompleted = () => {
		toggleComplete(todo.id);
	};

	return (
		<div className={`flex items-center sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px] mx-auto bg-white  border border-black/10 rounded-lg px-3 py-2 gap-x-3  ${todo.completed ? "bg[#c6e9a7]" : "bg-white"} `}>
			<input
				className="cursor-pointer bg-[#005CC8] hover:bg-[#0f66ca]"
				type="checkbox"
				checked={todo.completed}
				onChange={toggleCompleted}
			/>

			{isTodoEditable ? (
				<input
					className={`border outline-none w-full bg-white rounded-lg ${isTodoEditable ? "border-black/30 px-2 " : "border-transparent"}`}
					type="text"
					value={todoMsg}
					onChange={(e) => setTodoMsg(e.target.value)}
					readOnly={!isTodoEditable}
				/>
			) : (
				<span className={`flex-1 ${todo.completed ? "line-through opacity-40" : ""} `}>{todoMsg}</span>
			)}

			<button
				className="inline-flex w-7 h-7 rounded-lg text-lg border border-black/10 justify-center items-center bg-[#005CC8] hover:bg-[#0f66ca] text-black font-semibold shrink-0 hover:scale-95 duration-300"
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
				className="inline-flex w-7 h-7 rounded-lg text-lg border-black/10 justify-center items-center bg-[#005CC8] hover:bg-[#0f66ca] text-black font-semibold   shrink-0 hover:scale-95 duration-300"
				onClick={() => deleteTodo(todo.id)}>
				<MdDelete className="text-white" />
			</button>
		</div>
	);
};

export default TodoItem;
