import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "/src/App.css";
import {
  removeTask as removeTaskAction,
  taskDone as taskDoneAction,
} from "../taskReducer";

const TasksUndone = () => {
  const tasks = useSelector((state) => state.tasks.list);
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState("");

  const removeTask = (e) => {
    dispatch(removeTaskAction(e));
  };

  const setTaskDone = (e) => {
    dispatch(taskDoneAction(e.id));
    if (e.done) {
    }
  };

  return (
    <>
      <header>
        <h1>Done tasks: </h1>
      </header>

      <div className="filter">
        <button>
          <Link to={`/`}>All tasks</Link>
        </button>
        <button>
          <Link to={`/undone`}>Undone</Link>
        </button>
      </div>
      <div className="tasks">
        <ul>
          {tasks
            .filter((task) => task.done === false)
            .map((task) => (
              <li key={task.id} className="task">
                <Link to={`/task/${task.id}`}>{task.taskText}</Link>
                <div className="buttons">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeTask(task.id);
                    }}
                  >
                    X
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setTaskDone(task);
                      console.log(task.done);
                    }}
                  >
                    {task.done ? `Done` : `Undone`}
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default TasksUndone;
