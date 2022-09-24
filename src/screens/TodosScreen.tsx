import React, {FC, useState} from 'react';
import {FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
//@ts-ignore
import styled from 'styled-components/native';
import AddButton from '../components/AddButton';
import DelAllButton from '../components/DelAllButton';
import FilterButtons from '../components/FilterButtons';
import SearchInput from '../components/SearchInput';
import Todo from '../components/Todo';
import {dellAllTodos, delTodo, setDone} from '../redux/slices/todos';
import {useTypedSelector} from '../redux/store';

export type TVariant = 'all' | 'completed' | 'inprogress';

export type TVariantObj = {
  value: TVariant;
  label: string;
  active: boolean;
};

const TodosScreen: FC = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [variants, setVariants] = useState<TVariantObj[]>([
    {
      label: 'ALL',
      value: 'all',
      active: true,
    },
    {
      label: 'COMPLETED',
      value: 'completed',
      active: false,
    },
    {
      label: 'IN PROGRESS',
      value: 'inprogress',
      active: false,
    },
  ]);
  const [filter, setFilter] = useState<string>(variants[0].value);
  const [search, setSearch] = useState<string>('');

  const todos = useTypedSelector(state => state.todos.todos);

  const selectFilterHandler = (value: string): void => {
    setVariants(prev => {
      return prev.map(variant => {
        if (variant.value == value) {
          return {...variant, active: true};
        }
        return {...variant, active: false};
      });
    });
    setFilter(value);
  };

  const goToAddTodoScreen = (): void => {
    navigation.navigate('AddTodo');
  };

  const delAllTodos = (): void => {
    dispatch(dellAllTodos());
  };

  const setDoneHandler = (id: string): void => {
    dispatch(setDone(id));
  };

  const delTodoHandler = (id: string): void => {
    dispatch(delTodo(id));
  };

  return (
    <Container>
      <FunctionalBar>
        <Buttons>
          <FilterButtons
            variants={variants}
            selectFilterHandler={selectFilterHandler}
          />
          <AddButton goToAddTodoScreen={goToAddTodoScreen} />
        </Buttons>
        <SearchDel>
          <SearchInput search={search} setSearch={setSearch} />
          <DelAllButton delAllTodos={delAllTodos} />
        </SearchDel>
      </FunctionalBar>
      <TodosList>
        {todos.length < 1 ? (
          <TextCenter>No todos =(</TextCenter>
        ) : (
          <FlatList
            data={todos.filter(e => {
              if (filter == 'completed') {
                return (
                  e.isDone &&
                  e.title.toLowerCase().includes(search.toLowerCase())
                );
              }
              if (filter == 'inprogress') {
                return (
                  !e.isDone &&
                  e.title.toLowerCase().includes(search.toLowerCase())
                );
              }
              return e && e.title.toLowerCase().includes(search.toLowerCase());
            })}
            keyExtractor={todo => todo.id}
            renderItem={({item}) => {
              return (
                <Todo
                  key={item.id}
                  {...item}
                  setDoneHandler={setDoneHandler}
                  delTodoHandler={delTodoHandler}
                />
              );
            }}
          />
        )}
      </TodosList>
    </Container>
  );
};

export default TodosScreen;

//styled

const Container = styled.View`
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FunctionalBar = styled.View`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
`;

const Buttons = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin-bottom: 15px;
`;

const SearchDel = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const TodosList = styled.View`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const TextCenter = styled.Text`
  width: 100%;
  text-align: center;
  margin: 30px 0 0 0;
`;
