import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
//@ts-ignore
import styled from 'styled-components/native';
import AddTodoButton from '../components/AddTodoButton';
import AddTodoInput from '../components/AddTodoInput';
import Icon from 'react-native-vector-icons/Entypo';
import {Alert} from 'react-native';
import {addTodo, TTodo} from '../redux/slices/todos';

function create_UUID(): string {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    },
  );
  return uuid;
}

function formatDate(): string {
  let date = new Date();

  var dd = String(date.getDate());
  if (dd.length < 2) dd = '0' + dd;

  var mm = String(date.getMonth() + 1);
  if (mm.length < 2) mm = '0' + mm;

  var yy = String(date.getFullYear() % 100);
  if (yy.length < 2) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}

const AddTodoItemScreen = () => {
  const dispatch = useDispatch();
  const [err, setErr] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const addTodoHandler = (): void => {
    if (title.length < 1 && description.length < 1) {
      setErr('err');
      Alert.alert('Enter title and description for your tood');
      return;
    }

    let data: TTodo = {
      id: create_UUID(),
      title: title,
      description: description,
      isDone: false,
      date: formatDate(),
    };

    dispatch(addTodo(data));

    setTitle('');
    setDescription('');
    setErr('succ');
    Alert.alert('Successfully ');
  };

  useEffect(() => {
    setErr('');
    return () => setErr('');
  }, []);

  return (
    <Container>
      <InputContainer>
        <AddTodoInput
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
        />
        <AddTodoButton addTodoHandler={addTodoHandler} />
      </InputContainer>
      <InputContainer>
        {err == '' ? (
          <></>
        ) : err == 'err' ? (
          <Icon size={150} name={'squared-cross'} color={'#000'} />
        ) : (
          <Icon size={150} name={'check'} color={'#000'} />
        )}
      </InputContainer>
    </Container>
  );
};

export default AddTodoItemScreen;

//styled

const Container = styled.View`
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 150px;
  margin-top: 10px;
`;
