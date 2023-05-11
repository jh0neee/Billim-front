import React from "react";
import styled from "styled-components";

import {
  TbTruckDelivery,
  TbHomeMove,
  TbAward,
  TbUserCircle,
} from "react-icons/tb";

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
      margin: 1.5rem 0.5rem;
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
      }
    }

    &:nth-child(2) {
      margin: 0.5rem 0;
      margin-left: 0.5rem;
    }
  }
`;

const TruckDelivery = styled(TbTruckDelivery)`
  margin-left: 0.2rem;
`;

const ContentDescription = styled.div`
  margin: 2rem 0 0.8rem 0.5rem;
  > * {
    &:first-child {
      margin-bottom: 0.8rem;
      font-weight: 500;
    }
  }
`;

const DetailContent = () => {
  return (
    <div>
      <ContentTitle>
        <p>UESR님이 대여하는 상품</p>
        <TbUserCircle size='45px' />
      </ContentTitle>
      <hr />
      <CategoryBox>
        <ContentCategory>
          <div>
            <TbHomeMove size='27px' />
            <p>직거래</p>
          </div>
          <p>가능 / 불가능</p>
        </ContentCategory>
        <ContentCategory>
          <div>
            <TruckDelivery size='27px' />
            <p>택배</p>
          </div>
          <p>가능 / 불가능</p>
        </ContentCategory>
        <ContentCategory>
          <div>
            <TbAward size='27px' />
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
