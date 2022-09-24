import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
//@ts-ignore
import styled from 'styled-components/native';

type TAddTodoButton = {
  addTodoHandler: () => void;
};

const AddTodoButton: FC<TAddTodoButton> = ({addTodoHandler}) => {
  return (
    <Container>
      <AddTodoBtn onPress={addTodoHandler}>
        <Icon size={30} name={'add-to-list'} color={'#000'} />
      </AddTodoBtn>
    </Container>
  );
};

export default AddTodoButton;

//styled

const Container = styled.View`
  display: flex;
  flex-direction: row;
  aligt-items: center;
  justify-content: center;
  height: 50px;
  width: 20%;
  overflow: hidden;
`;

const AddTodoBtn = styled.TouchableOpacity`
  background-color: lawngreen;
  border-radius: 50px;
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;
