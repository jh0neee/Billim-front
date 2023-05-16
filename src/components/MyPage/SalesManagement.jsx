import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { productItems } from "../../data";

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

const SalesManagement = () => {
  return (
    <>
      <p>판매중인 상품</p>
      <SaleLayout>
        {productItems.map((item) => (
          <SaleBox>
            <Link to={'/mypage/sales/detail'}>
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
