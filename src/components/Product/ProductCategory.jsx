import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import theme from '../../styles/theme';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { searchAction } from '../../store/search';
import { useToastAlert } from '../../hooks/useToastAlert';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import { TbBarbell, TbHanger, TbMicrowave, TbHome } from 'react-icons/tb';

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

  @media (max-width: 1100px) {
    > * {
      margin-left: 3rem;
    }
  }
  @media (max-width: 988px) {
    margin-left: 0;

    > * {
      margin: 0 1.5rem;
    }
  }
  @media ${theme.mobile} {
    > * {
      margin: 0 0.8rem;
    }
  }
`;

const SearchBox = styled.form`
  margin-right: 6.5rem;
  display: flex;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
  }

  @media (max-width: 988px) {
    margin: 1rem 0 0;
    flex-direction: column;
  }
`;

const SearchButton = styled(Button)`
  @media (max-width: 988px) {
    margin: 0.5rem 0.3rem 0;
  }
`;

const EnrollButton = styled(Button)`
  margin: 0px 0.5rem 0px 1.3rem;
  width: 65px;
  height: 33px;
  font-size: 12px;
  font-weight: 400;

  @media (max-width: 988px) {
    margin: 1rem 0 0;
    width: 145px;
  }
`;

const ProductCategory = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const [resetInput, setResetInput] = useState(false);
  const [formState, inputHandler] = useForm({}, false);
  const { showToast } = useToastAlert();

  const handleClearSearch = () => {
    dispatch(searchAction.CLEAR_SEARCH());
  };

  const searchSubmitHandler = e => {
    e.preventDefault();

    const inputValue = formState.inputs.search?.value;

    if (!inputValue) {
      showToast('검색어를 입력해주세요!', 'warning');
      return;
    }

    dispatch(searchAction.CLICK_SEARCH(inputValue));
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
        <div>
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
          <SearchButton sub small type="submit" width="45px">
            검색
          </SearchButton>
        </div>
        {auth.memberId !== 0 && (
          <EnrollButton type="button" to="/product/new">
            상품 등록
          </EnrollButton>
        )}
      </SearchBox>
    </>
  );
};

export default ProductCategory;
