import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {TVariant} from '../screens/TodosScreen';

type TFilterButton = {
  value: TVariant;
  label: string;
  active: boolean;
  selectFilterHandler: (value: string) => void;
};

const FilterButton: FC<TFilterButton> = ({
  active,
  value,
  label,
  selectFilterHandler,
}) => {
  return (
    <AddBtn active={active} onPress={() => selectFilterHandler(value)}>
      <BotdText>{label}</BotdText>
    </AddBtn>
  );
};

export default FilterButton;

//styled

const AddBtn = styled.TouchableOpacity`
  background-color: ${(props: any) => (props.active ? 'lawngreen' : 'yellow')};
  display: flex;
  width: 33%;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const BotdText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  color: #000;
`;
