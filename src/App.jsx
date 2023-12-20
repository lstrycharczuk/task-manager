import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import SingleTask from './single-task'
import TasksList from './tasks-list'
import TasksDone from './tasks-done'
import TasksUndone from './tasks-undone'

const router = createBrowserRouter([
  {
    path: '/',
    element: <TasksList />
  },
  {
    path: '/task/:id',
    element: <SingleTask />
  },
  {
    path: '/done',
    element: <TasksDone />
  },
  {
    path: '/undone',
    element: <TasksUndone />
  },
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App