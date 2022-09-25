import React, {Dispatch, FC, SetStateAction} from 'react';
//@ts-ignore
import styled from 'styled-components/native';

type TAddTodoInput = {
  title: string;
  description: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
};

const AddTodoInput: FC<TAddTodoInput> = ({
  title,
  description,
  setTitle,
  setDescription,
}) => {
  return (
    <Container>
      <TextInputComponent
        type="text"
        value={title}
        placeholder="Input title"
        onChangeText={setTitle}
      />
      <TextInputComponent
        type="text"
        value={description}
        placeholder="Input description"
        onChangeText={setDescription}
      />
    </Container>
  );
};

export default AddTodoInput;

//style

const Container = styled.View`
  display: flex;
  flex-direction: column;
  aligt-items: center;
  justify-content: center;
  width: 80%;
  overflow: hidden;
`;

const TextInputComponent = styled.TextInput`
  margin: 5px 0;
  font-size: 16px;
  border-radius: 10px;
  padding-left: 10px;
  text-align-vertical: center;
  border: 2px solid #000;
  border-radius: 20px;
  width: 100%;
  background-color: #80a6ff;
`;
