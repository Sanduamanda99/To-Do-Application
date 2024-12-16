import React, { useState, useEffect } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdFileDownloadDone } from "react-icons/md";
import { MdEdit } from "react-icons/md";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  const handleAddTodo = () => {
    const newTodoItem = { title: newTitle, description: newDescription };
    const updatedTodoArr = [...allTodos, newTodoItem];
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteTodo = (index) => {
    const reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    const now = new Date().toLocaleString();
    const filteredItem = { ...allTodos[index], completedOn: now };
    const updatedCompletedArr = [...completedTodos, filteredItem];
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo = (index) => {
    const reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleUpdateTodo = () => {
    const newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo);
    setCurrentEdit("");
  };

  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem("todolist"));
    const savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if (savedTodo) setTodos(savedTodo);
    if (savedCompletedTodo) setCompletedTodos(savedCompletedTodo);
  }, []);

  return (
    <div className="bg-customPurple text-white overflow-hidden min-h-screen">
      <h1 className="text-center text-3xl font-bold py-6">ToDo Application</h1>

      <div className="bg-customIndigo p-4 w-fit mx-auto mt-12 max-h-[80vh] overflow-y-auto shadow-lg rounded-lg">
        <div className="flex items-center justify-center border-b border-indigo-700 pb-6 mb-6">
          <div className="flex flex-col items-start mr-6">
            <label className="font-bold mb-2">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Task Title"
              className="p-2 border-none w-64 rounded focus:outline-customDarkerIndigo text-black"
            />
          </div>
          <div className="flex flex-col items-start mr-6">
            <label className="font-bold mb-2">Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Task Description"
              className="p-2 border-none w-64 rounded focus:outline-customDarkerIndigo text-black"
            />
          </div>
          <button
  type="button"
  onClick={handleAddTodo}
  className="bg-customDarkerIndigo text-white px-4 py-2 w-16 hover:bg-customMagenta rounded mt-7"
>
  Add
</button>

        </div>

        <div className="mb-4 flex space-x-4">
          <button
            className={`${
              !isCompleteScreen ? "bg-customMagenta" : "bg-purple-600"
            } text-white px-4 py-2 rounded`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`${
              isCompleteScreen ? "bg-customMagenta" : "bg-purple-600"
            } text-white px-4 py-2 rounded`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div>
          {!isCompleteScreen &&
            allTodos.map((item, index) => (
              <div
                className="bg-customDarkerIndigo flex justify-between items-center py-4 px-6 mb-4 shadow-md rounded"
                key={index}
              >
                <div>
                  <h3 className="text-lg font-bold text-customLavender">{item.title}</h3>
                  <p className="text-sm text-customThistle">{item.description}</p>
                </div>
                <div className="flex space-x-4">
                  <RiDeleteBin6Fill
                    className="text-red-500 text-2xl cursor-pointer"
                    onClick={() => handleDeleteTodo(index)}
                  />
                  <MdFileDownloadDone
                    className="text-green-500 text-2xl cursor-pointer"
                    onClick={() => handleComplete(index)}
                  />
                  <MdEdit
                    className="text-yellow-500 text-2xl cursor-pointer"
                    onClick={() => handleEdit(index, item)}
                  />
                </div>
              </div>
            ))}

          {isCompleteScreen &&
            completedTodos.map((item, index) => (
              <div
                className="bg-customDarkerIndigo flex justify-between items-center py-4 px-6 mb-4 shadow-md rounded"
                key={index}
              >
                <div>
                  <h3 className="text-lg font-bold text-customLavender">{item.title}</h3>
                  <p className="text-sm text-customThistle">{item.description}</p>
                  <p className="text-xs text-customThistle">Completed On: {item.completedOn}</p>
                </div>
                <RiDeleteBin6Fill
                  className="text-red-500 text-2xl cursor-pointer"
                  onClick={() => handleDeleteCompletedTodo(index)}
                />
              </div>
            ))}

          {currentEdit !== "" && (
            <div className="flex flex-col bg-customDarkerIndigo p-4 mb-4 shadow-md rounded">
              <div className="flex flex-col mb-4">
                <label className="font-bold text-customLavender mb-2">Updated Title</label>
                <input
                  type="text"
                  value={currentEditedItem.title}
                  onChange={(e) => setCurrentEditedItem((prev) => ({ ...prev, title: e.target.value }))}
                  className="p-2 mb-4 rounded bg-white text-black"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="font-bold text-customLavender mb-2">Updated Description</label>
                <textarea
                  value={currentEditedItem.description}
                  onChange={(e) => setCurrentEditedItem((prev) => ({ ...prev, description: e.target.value }))}
                  rows="4"
                  className="p-2 rounded bg-white text-black"
                />
              </div>
              <button
                onClick={handleUpdateTodo}
                className="bg-customDarkerIndigo text-white py-2 px-4 rounded hover:bg-customMagenta"
              >
                Update Task
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
