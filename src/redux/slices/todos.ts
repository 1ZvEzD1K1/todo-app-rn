import {createSlice} from '@reduxjs/toolkit';

export type TTodo = {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  date: string;
};

export type TTodosStore = {
  todos: TTodo[] | [];
};

const initialState: TTodosStore = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    addTodo: (state: TTodosStore, action: {payload: TTodo}): void => {
      state.todos = [...state.todos, action.payload];
    },
    dellAllTodos: (state: TTodosStore): void => {
      state.todos = [];
    },
    setDone: (state: TTodosStore, action: {payload: string}): void => {
      state.todos = state.todos.map((todo: TTodo) => {
        if (todo.id == action.payload) {
          return {...todo, isDone: !todo.isDone};
        }
        return {...todo};
      });
    },
    delTodo: (state: TTodosStore, action: {payload: string}): void => {
      state.todos = state.todos.filter(todo => todo.id != action.payload);
    },
  },
});

export default todosSlice.reducer;
export const {addTodo, dellAllTodos, setDone, delTodo} = todosSlice.actions;
