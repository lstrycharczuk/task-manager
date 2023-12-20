import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "/src/App.css";
import { Link } from "react-router-dom";

const SingleTask = () => {
  const { id } = useParams("id");
  const task = useSelector((state) => state.tasks.list);
  return (
    <>
      <div className="single-task">
        <Link to={`/`}>All tasks</Link>
        <h1>
          {task.find((e) => e.id === parseInt(id))?.taskText || "task missing"}
        </h1>
      </div>
    </>
  );
};

export default SingleTask;
