import React, { useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

import SalesDetailInfo from "./SalesDetailInfo";
import Button from "../UI/Button";
import { productItems, salesProduct } from "../../data";

const DetailSaleBox = styled.div`
  background-color: #ededed;
  margin: 1rem 0;
  padding: 1rem;
`;

const SaleTopBox = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
`;

const TopTextBox = styled.div`
  margin-left: 1.5rem;
  font-size: 0.8rem;

  > * {
    &:nth-child(2) {
      padding-top: 2rem;
    }
  }

  > div {
    display: flex;
    align-items: center;
  }
`;

const ProductText = styled(Link)`
  font-size: 0.9rem;
  font-weight: 500;
`;

const ExtraButton = styled(Button)`
  margin-left: 0.5rem;
  width: 55px;
  height: 18px;
  font-size: 10px;
  font-weight: 400;
`;

const SalesDetailManagement = () => {
  const itemName = useParams().itemName;
  const selectedProduct = productItems.find((item) => item.name === itemName);
  const [salesItems, setSalesItems] = useState(salesProduct);

  const rentalItem = salesItems.find((item) => item.status === "대여중");
  const waitingItem = salesItems.filter((item) => item.status === "대기중");
  const used = salesItems.filter(
    (item) => item.status === "취소" || item.status === "완료"
  );

  return (
    <>
      <p>판매관리</p>
      <DetailSaleBox>
        <SaleTopBox>
          <img src='https://via.placeholder.com/100x120' alt='상품예시이미지' />
          <TopTextBox>
            <ProductText to={`/${selectedProduct.name}/detail`}>
              {selectedProduct.name}
            </ProductText>
            <p>상태: {rentalItem.status}</p>
            <div>
              <p>구매자: {rentalItem.customer}</p>
              <ExtraButton>채팅하기</ExtraButton>
            </div>
            <p>대여기간: {rentalItem.date}</p>
          </TopTextBox>
        </SaleTopBox>
        <hr />
        <SalesDetailInfo
          label='대기 내역'
          salesItems={salesItems}
          setSalesItems={setSalesItems}
          items={waitingItem}
        />
        <SalesDetailInfo label='완료 내역' items={used} />
      </DetailSaleBox>
    </>
  );
};

export default SalesDetailManagement;
