import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
//@ts-ignore
import styled from 'styled-components/native';

type TDelAllButton = {
  delAllTodos: () => void;
};

const DelAllButton: FC<TDelAllButton> = ({delAllTodos}) => {
  return (
    <Container>
      <DelBtn onPress={delAllTodos}>
        <Icon size={30} name={'trash'} color={'#000'} />
      </DelBtn>
    </Container>
  );
};

export default DelAllButton;

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

const DelBtn = styled.TouchableOpacity`
  background-color: red;
  border-radius: 50px;
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;
