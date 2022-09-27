import React, {FC, Fragment, useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
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
  const todos = useTypedSelector(state => state.todos.todos);
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
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>();

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
    setPage(1);
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

  const setPageHandler = (id: number): void => {
    setPage(id);
  };

  useEffect(() => {
    setPages(() => {
      let res: number[] = [];
      let pag: number = Math.ceil(
        todos.filter(e => {
          if (filter == 'completed') {
            return (
              e.isDone && e.title.toLowerCase().includes(search.toLowerCase())
            );
          }
          if (filter == 'inprogress') {
            return (
              !e.isDone && e.title.toLowerCase().includes(search.toLowerCase())
            );
          }
          return e && e.title.toLowerCase().includes(search.toLowerCase());
        }).length / 5,
      );

      for (let i = 1; i <= pag; i++) {
        res.push(i);
      }
      return res;
    });
  }, [todos, search, filter]);

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
          <Fragment>
            <FlatList
              data={todos
                .filter(e => {
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
                  return (
                    e && e.title.toLowerCase().includes(search.toLowerCase())
                  );
                })
                .slice(page * 5 - 5, page * 5)}
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
            <PaginationBox>
              {pages?.map(pageNumb => {
                return (
                  <Pagination
                    style={{
                      backgroundColor:
                        page == pageNumb ? 'lawngreen' : 'yellow',
                    }}
                    onPress={() => setPageHandler(pageNumb)}>
                    <Text>{pageNumb}</Text>
                  </Pagination>
                );
              })}
            </PaginationBox>
          </Fragment>
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

const PaginationBox = styled.View`
  display: flex;
  margin-top: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Pagination = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
`;
