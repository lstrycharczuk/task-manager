import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
  },
  reducers: {
    addTask: (state, action) => {
      const id = Math.floor(Math.random() * 100);
      const done = false;
      state.list.push({ id, taskText: action.payload, done: done });
    },
    removeTask: (state, action) => {
      return {
        ...state,
        list: state.list.filter((el) => el.id !== action.payload),
      };
    },
    taskDone: (state, action) => {
      return {
        ...state,
        list: state.list.map((task) =>
          task.id === action.payload ? { ...task, done: !task.done } : task
        ),
      };
    },
    updateTask: (state, action) => {
      return {
        ...state,
        list: state.list.map((task) =>
          task.id === action.payload.id
            ? { ...task, taskText: action.payload.taskText }
            : task
        ),
      };
    },
  },
});

export const { addTask, removeTask, taskDone, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;
