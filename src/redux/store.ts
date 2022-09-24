import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {AsyncStorage} from 'react-native';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import todosReducer from './slices/todos';

const rootReducer = combineReducers({
  todos: todosReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const psReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: psReducer,
  middleware: customizedMiddleware,
});

const persiStore = persistStore(store);

export {persiStore, store};

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
