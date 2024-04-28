import React, { useState } from "react";

export const TodoForm = ({ addTodo, filterTodos, selectedFilter }) => {
  // State to manage input value
  const [value, setValue] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      addTodo(value);
      setValue("");
    }
  };

  // Function to generate filter button
  const renderFilterButton = (filterType, label) => (
    <button
      className={`filter-btn ${selectedFilter === filterType ? "active" : ""}`}
      onClick={() => filterTodos(filterType)}
      tabIndex="0"
    >
      {label}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      {/* Input field for entering new todo */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="What is the task today?"
      />
      {/* Button to add a new todo */}
      <button type="submit" className="todo-btn">
        Add Task
      </button>
      {/* Filter buttons for filtering todos */}
      <div className="filter-buttons">
        {renderFilterButton("all", "All")}
        {renderFilterButton("active", "Active")}
        {renderFilterButton("completed", "Completed")}
      </div>
    </form>
  );
};
