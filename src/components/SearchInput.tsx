import React, {SetStateAction, Dispatch, FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';

type TSearchInput = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

const SearchInput: FC<TSearchInput> = ({search, setSearch}) => {
  return (
    <Container>
      <TextInputComponent
        type="text"
        value={search}
        onChangeText={setSearch}
        placeholder="Search...?"
      />
    </Container>
  );
};

export default SearchInput;

//styled

const Container = styled.View`
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  aligt-items: center;
  justify-content: center;
  height: 50px;
  width: 80%;
  border: 2px solid #000;
  overflow: hidden;
`;

const TextInputComponent = styled.TextInput`
  font-size: 16px;
  border-radius: 10px;
  padding-left: 10px;
  text-align-vertical: center;
  width: 100%;
  background-color: #80a6ff;
`;
