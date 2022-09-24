import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
//@ts-ignore
import styled from 'styled-components/native';

type TAddButton = {
  goToAddTodoScreen: () => void;
};

const AddButton: FC<TAddButton> = ({goToAddTodoScreen}) => {
  return (
    <Container>
      <AddBtn onPress={goToAddTodoScreen}>
        <Icon size={30} name={'pluscircleo'} color={'#000'} />
      </AddBtn>
    </Container>
  );
};

export default AddButton;

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

const AddBtn = styled.TouchableOpacity`
  background-color: lawngreen;
  border-radius: 50px;
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;
