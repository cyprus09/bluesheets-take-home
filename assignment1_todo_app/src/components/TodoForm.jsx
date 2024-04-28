import React, { useState } from "react";

export const TodoForm = ({ addTodo, filterTodos, selectedFilter }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      addTodo(value);
      setValue("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="What is the task today?"
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
      <div className="filter-buttons">
        <button
          className={`filter-btn ${selectedFilter === "all" ? "active" : ""}`}
          onClick={() => filterTodos("all")}
          tabIndex="0"
        >
          All
        </button>
        <button
          className={`filter-btn ${
            selectedFilter === "active" ? "active" : ""
          }`}
          onClick={() => filterTodos("active")}
          tabIndex="0"
        >
          Active
        </button>
        <button
          className={`filter-btn ${
            selectedFilter === "completed" ? "active" : ""
          }`}
          onClick={() => filterTodos("completed")}
          tabIndex="0"
        >
          Completed
        </button>
      </div>
    </form>
  );
};
