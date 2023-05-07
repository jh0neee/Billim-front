import React from "react";
import styled from "styled-components";

import { TbBarbell, TbHanger, TbMicrowave, TbHome } from "react-icons/tb";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";

const CategoryBox = styled.div`
  margin-left: 3rem;
  display: grid;
  grid-template-rows: 44px 22px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;

  > * {
    margin-left: 5rem;
    cursor: pointer;
  }
`;

const SearchBox = styled.div`
  margin-right: 6.5rem;
  display: flex;
  align-items: center;
`;

const ProductCategory = () => {
  return (
    <>
      <CategoryBox>
        <TbHome size='2.3rem' />
        <p>생활용품</p>
        <TbHanger size='2.5rem' />
        <p>의류잡화</p>
        <TbBarbell size='2.5rem' />
        <p>운동용품</p>
        <TbMicrowave size='2.5rem' />
        <p>전자기기</p>
      </CategoryBox>
      <SearchBox>
        <Input
          bar
          element='input'
          type='text'
          placeholder='검색어를 입력하세요'
          width='14rem'
        />
        <Button sub small width='45px'>
          찾기
        </Button>
      </SearchBox>
    </>
  );
};

export default ProductCategory;
