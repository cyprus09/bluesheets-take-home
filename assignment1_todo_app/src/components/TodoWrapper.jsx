import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TodoWrapper = () => {
  // State to manage todos and selected filter
  const [todos, setTodos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Load todos from local storage on component mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Function to add a new todo
  const addTodo = (todo) => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ];
    updateTodos(newTodos);
    toast.success("Task added successfully!");
  };

  // Function to toggle completion status of a todo
  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    updateTodos(newTodos);
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    updateTodos(newTodos);
    toast.error("Task deleted.");
  };

  // Function to toggle editing mode of a todo
  const editTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    updateTodos(newTodos);
  };

  // Function to edit task of a todo
  const editTask = (task, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    updateTodos(newTodos);
    toast.info("Task updated.");
  };

  // Function to update todos state and local storage
  const updateTodos = (newTodos) => {
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Function to filter todos based on selected filter
  const filterTodos = (filter) => {
    setSelectedFilter(filter);
  };

  // Filter todos based on selected filter
  const filteredTodos =
    selectedFilter === "all"
      ? todos
      : selectedFilter === "active"
      ? todos.filter((todo) => !todo.completed)
      : todos.filter((todo) => todo.completed);

  return (
    <div className="TodoWrapper">
      <h1>What's on your Mind Today?</h1>
      {/* TodoForm component for adding new todos */}
      <TodoForm
        addTodo={addTodo}
        filterTodos={filterTodos}
        selectedFilter={selectedFilter}
      />
      <ToastContainer />
      {/* Render todos based on filteredTodos */}
      {filteredTodos.map((todo, index) =>
        todo.isEditing ? (
          // EditTodoForm component for editing todos
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          // Todo component for displaying todos
          <Todo
            key={todo.id}
            task={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};
