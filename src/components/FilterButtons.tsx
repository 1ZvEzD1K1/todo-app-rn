import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {TVariantObj} from '../screens/TodosScreen';
import FilterButton from './FilterButton';

export type TFilterButtons = {
  variants: TVariantObj[];
  selectFilterHandler: (value: string) => void;
};

const FilterButtons: FC<TFilterButtons> = ({variants, selectFilterHandler}) => {
  return (
    <Container>
      {variants.map(el => {
        return (
          <FilterButton
            key={el.value}
            active={el.active}
            value={el.value}
            label={el.label}
            selectFilterHandler={selectFilterHandler}
          />
        );
      })}
    </Container>
  );
};

export default FilterButtons;

//styled

const Container = styled.View`
  display: flex;
  flex-direction: row;
  border: 2px solid black;
  border-radius: 20px;
  aligt-items: center;
  justify-content: center;
  height: 50px;
  width: 80%;
  overflow: hidden;
`;
