import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all"); // Filter state: "all", "completed", "left"

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, { text: newTask, completed: false }]);
      setNewTask("");
    }
  }

  function toggleTaskCompletion(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function filteredTasks() {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    } else if (filter === "left") {
      return tasks.filter((task) => !task.completed);
    }
    return tasks; // "all"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600 flex flex-col items-center py-10">
      <h1 className="text-5xl font-extrabold text-white drop-shadow-md mb-8">
        My To-Do List
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={newTask}
          onChange={handleInputChange}
          className="px-4 py-3 w-80 rounded-full text-gray-700 shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-400"
        />
        <button
          className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 hover:scale-105 transition-transform shadow-md"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full font-semibold transition ${
            filter === "all"
              ? "bg-pink-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold transition ${
            filter === "completed"
              ? "bg-pink-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold transition ${
            filter === "left"
              ? "bg-pink-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setFilter("left")}
        >
          Left to Do
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white bg-opacity-90 rounded-xl shadow-lg p-6">
        <ol className="space-y-4">
          {filteredTasks().length === 0 ? (
            <p className="text-gray-500 text-center italic">
              No tasks in this category.
            </p>
          ) : (
            filteredTasks().map((task, index) => (
              <li
                key={index}
                className={`flex items-center justify-between bg-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow ${
                  task.completed ? "opacity-75" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(index)}
                    className="form-checkbox h-5 w-5 text-pink-500 rounded"
                  />
                  <span
                    className={`text-gray-800 font-medium ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="text-red-500 hover:text-red-700 font-semibold transition"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-gray-500 hover:text-blue-500 transition"
                    onClick={() => moveTaskUp(index)}
                  >
                    ☝
                  </button>
                  <button
                    className="text-gray-500 hover:text-blue-500 transition"
                    onClick={() => moveTaskDown(index)}
                  >
                    👇
                  </button>
                </div>
              </li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
}

export default ToDoList;
