import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Button from "../UI/Button";
import { productItems } from "../../data";

const SaleHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SaleLayout = styled.div`
  margin: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 3rem;
  justify-items: center;

  > * {
    cursor: pointer;
  }
`;

const SaleBox = styled.div`
  display: flex;
  flex-direction: column;

  > p {
    margin: 0.5rem 0px;
    font-size: 0.8rem;
  }
`;

const EnrollButton = styled(Button)`
  margin: 0px 2rem 0 0;
  width: 60px;
  height: 27px;
  font-size: 10px;
  font-weight: 400;
`;

const SalesManagement = () => {
  return (
    <>
      <SaleHeader>
        <p>판매중인 상품</p>
        <EnrollButton to='/product/new'>상품 등록</EnrollButton>
      </SaleHeader>
      <SaleLayout>
        {productItems.map((item) => (
          <SaleBox key={item.id}>
            <Link to='/mypage/sales/detail'>
              <img
                src='https://via.placeholder.com/169x140'
                alt='상품예시이미지'
              />
            </Link>
            <p>{item.name}</p>
          </SaleBox>
        ))}
      </SaleLayout>
    </>
  );
};

export default SalesManagement;
