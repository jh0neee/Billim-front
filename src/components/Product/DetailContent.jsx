import React from "react";
import styled from "styled-components";

import { TbTruckDelivery, TbAward } from "react-icons/tb";
import { FaWalking } from "react-icons/fa";
import { Profile } from "../UI/Profile";

const ContentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1.2rem;
`;

const CategoryBox = styled.div`
  margin: 2rem 0;

  > * {
    &:nth-child(2) {
      margin: 2rem 0.5rem;
    }
  }
`;

const ContentCategory = styled.div`
  margin-left: 0.5rem;

  > * {
    &:first-child {
      display: flex;
      align-items: center;
      > p {
        margin-top: 2px;
        margin-left: 0.4rem;
        font-weight: 500;
        font-size: 1.1rem;
      }
    }

    &:nth-child(2) {
      margin: 0.8rem 0px 0.5rem 2.5rem;
      font-weight: 700;
      font-size: 0.9rem;
    }
  }
`;

const ContentDescription = styled.div`
  margin: 2rem 0 0.8rem 0.5rem;
  > * {
    font-size: 0.9rem;
    margin-left: 0.5rem;

    &:first-child {
      margin: 0 0 1.5rem 0;
      font-weight: 500;
      font-size: 1.1rem;
    }
  }
`;

const DetailContent = ({ tradeMethod }) => {
  return (
    <div>
      <ContentTitle>
        <p>UESR님이 대여하는 상품</p>
        <Profile size='45px' />
      </ContentTitle>
      <hr />
      <CategoryBox>
        <ContentCategory>
          <div>
            <FaWalking size='26px' />
            <p>직거래</p>
          </div>
          {tradeMethod === "직거래" || tradeMethod === "둘 다 가능" ? (
            <p>가능</p>
          ) : (
            <p>불가능</p>
          )}
        </ContentCategory>
        <ContentCategory>
          <div>
            <TbTruckDelivery size='30px' />
            <p>택배</p>
          </div>
          {tradeMethod === "택배" || tradeMethod === "둘 다 가능" ? (
            <p>가능</p>
          ) : (
            <p>불가능</p>
          )}
        </ContentCategory>
        <ContentCategory>
          <div>
            <TbAward size='28px' />
            <p>USER님은 -등급입니다.</p>
          </div>
        </ContentCategory>
      </CategoryBox>
      <hr />
      <ContentDescription>
        <p>상품 설명</p>
        <p>아주아주아주 매우매우 좋은 특별한 상품</p>
      </ContentDescription>
    </div>
  );
};

export default DetailContent;
