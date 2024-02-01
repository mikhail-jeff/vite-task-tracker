import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItem } from "./components";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { v4 as uuidv4 } from "uuid";
uuidv4();

function App() {
	const [todos, setTodos] = useState([]);

	const addTodo = (todo) => {
		setTodos((prev) => [{ id: uuidv4(), ...todo }, ...prev]);
	};

	const updateTodo = (id, todo) => {
		setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));

		toast.success("Task updated succesfuly", {
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
	};

	const deleteTodo = (id) => {
		setTodos((prev) => prev.filter((todo) => todo.id !== id));

		toast.success("Task deleted succesfuly", {
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
	};

	const toggleComplete = (id) => {
		setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo)));

		const updatedTodo = todos.find((todo) => todo.id === id);

		if (updatedTodo.completed) {
			toast.success("Task marked incomplete", {
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
			toast.success("Task marked completed", {
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
		}
	};

	const clearAllTasks = () => {
		setTodos([]);

		toast.success("All tasks deleted", {
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
	};

	useEffect(() => {
		const todos = JSON.parse(localStorage.getItem("todos"));
		if (todos && todos.length > 0) {
			setTodos(todos);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	return (
		<TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
			<div className="app-container">
				<h1 className="app-container_title">Task Tracker</h1>

				<div className="mb-12">
					<TodoForm />
				</div>

				<div className="todo-item_container_parent">
					{todos.map((todo) => (
						<div
							className="w-full"
							key={todo.id}>
							<TodoItem todo={todo} />
						</div>
					))}
				</div>

				{todos && todos.length > 0 ? (
					<div className="mx-2">
						<button
							onClick={clearAllTasks}
							className="app-container_btn">
							{todos && todos.length > 1 ? "Clear Tasks" : "Clear Task"} ({todos.length})
						</button>
					</div>
				) : null}
			</div>
			<ToastContainer />
		</TodoProvider>
	);
}

export default App;
