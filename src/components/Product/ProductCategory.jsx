import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { TbBarbell, TbHanger, TbMicrowave, TbHome } from 'react-icons/tb';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { useForm } from '../../hooks/useForm';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import { searchAction } from '../../store/search';
import { productItems } from '../../data';

const CategoryBox = styled.div`
  margin-left: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;

  > * {
    margin-left: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
`;

const SearchBox = styled.form`
  margin-right: 6.5rem;
  display: flex;
  align-items: center;
`;

const ProductCategory = () => {
  const dispatch = useDispatch();
  const [resetInput, setResetInput] = useState(false);
  const [formState, inputHandler] = useForm({}, false);

  const handleClearSearch = () => {
    dispatch(searchAction.CLEAR_SEARCH(false));
  };

  const searchSubmitHandler = e => {
    e.preventDefault();

    dispatch(
      searchAction.CLICK_SEARCH({
        inputValue: formState.inputs.search?.value,
        search: true,
        item: productItems,
      }),
    );

    setResetInput(true);
  };

  return (
    <>
      <CategoryBox>
        <NavLink to="/product/living" onClick={handleClearSearch}>
          <TbHome size="2.3rem" />
          <p>생활용품</p>
        </NavLink>
        <NavLink to="/product/apparel" onClick={handleClearSearch}>
          <TbHanger size="2.5rem" />
          <p>의류잡화</p>
        </NavLink>
        <NavLink to="/product/sporting" onClick={handleClearSearch}>
          <TbBarbell size="2.5rem" />
          <p>운동용품</p>
        </NavLink>
        <NavLink to="/product/electronic" onClick={handleClearSearch}>
          <TbMicrowave size="2.5rem" />
          <p>전자기기</p>
        </NavLink>
      </CategoryBox>
      <SearchBox onSubmit={searchSubmitHandler}>
        <Input
          bar
          id="search"
          element="input"
          type="text"
          placeholder="검색어를 입력하세요"
          width="14rem"
          reset={resetInput}
          setReset={setResetInput}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={null}
          onInput={inputHandler}
        />
        <Button sub small type="submit" width="45px">
          검색
        </Button>
      </SearchBox>
    </>
  );
};

export default ProductCategory;
