import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask as addTaskAction,
  removeTask as removeTaskAction,
  taskDone as taskDoneAction,
  updateTask as updateTaskAction,
} from "../taskReducer";

const TasksList = () => {
  const tasks = useSelector((state) => state.tasks.list);
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({});
  const addTask = (e) => {
    e.preventDefault();
    dispatch(addTaskAction(taskText));
    setTaskText("");
  };

  const removeTask = (e) => {
    dispatch(removeTaskAction(e));
  };

  const setTaskDone = (e) => {
    dispatch(taskDoneAction(e.id));
    if (e.done) {
    }
  };

  const startEditing = (task) => {
    setIsEditing(true);
    setEditedTask(task);
  };

  const finishEditing = () => {
    setIsEditing(false);
    dispatch(updateTaskAction(editedTask));
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  return (
    <>
      <header>
        <h1>Your tasks: </h1>
      </header>

      <div className="filter">
        <button>
          <Link to={`/done`}>Done</Link>
        </button>
        <button>
          <Link to={`/undone`}>Undone</Link>
        </button>
      </div>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <div className="tasks">
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task">
              {!isEditing || editedTask.id !== task.id ? (
                <Link to={`/task/${task.id}`}>
                  <span
                    style={{
                      textDecoration: task.done ? "line-through" : "none",
                    }}
                  >
                    {task.taskText}
                  </span>
                </Link>
              ) : (
                <input
                  type="text"
                  value={editedTask.taskText}
                  onChange={(e) => {
                    setEditedTask({
                      ...editedTask,
                      taskText: e.target.value,
                    });
                  }}
                />
              )}
              <div className="buttons"> {!isEditing && (
                <button onClick={(e) => startEditing(task)}>🖊</button>
              )}
              {!isEditing && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeTask(task.id);
                  }}
                >
                  ✖
                </button>
              )}
              {!isEditing && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setTaskDone(task);
                  }}
                >
                  {task.done ? `Undone` : `Done`}
                </button>
              )}</div>
             
              <div className="buttons">
                {isEditing && editedTask.id === task.id && (
                  <>
                    <button onClick={finishEditing}>✔</button>
                    <button onClick={cancelEditing}>✖</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TasksList;
