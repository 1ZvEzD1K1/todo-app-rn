import CheckBox from '@react-native-community/checkbox';
import React, {FC, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
//@ts-ignore
import styled from 'styled-components/native';

type TTodo = {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  date: string;
  setDoneHandler: (id: string) => void;
  delTodoHandler: (id: string) => void;
};

const Todo: FC<TTodo> = ({
  id,
  title,
  description,
  isDone,
  date,
  setDoneHandler,
  delTodoHandler,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const setVisibleHandler = (): void => {
    setVisible(prev => {
      return !prev;
    });
  };

  return (
    <Container style={{backgroundColor: isDone ? 'lawngreen' : '#ffa500'}}>
      <TouchableOpacity onPress={setVisibleHandler}>
        <Row>
          <Title style={{textDecorationLine: isDone ? 'line-through' : 'none'}}>
            {title}
          </Title>
          <OptionBox>
            <CheckBox
              value={isDone}
              tintColors={{true: 'white'}}
              onValueChange={() => setDoneHandler(id)}
            />
            <TouchableOpacity onPress={() => delTodoHandler(id)}>
              <Icon size={35} name={'trash'} color={'#000'} />
            </TouchableOpacity>
          </OptionBox>
        </Row>
        {visible && (
          <Row>
            <Description>{description}</Description>
            <Text>{date}</Text>
          </Row>
        )}
      </TouchableOpacity>
    </Container>
  );
};

export default Todo;

const Container = styled.View`
  min-height: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin: 5px 0;
  padding: 10px;
  border-radius: 20px;
  border: 2px solid #cccccc;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  max-width: 70%;
`;

const Description = styled.Text`
  max-width: 80%;
`;

const OptionBox = styled.View`
  max-width: 30%;
  display: flex;
  flex-direction: row;
`;
