import React from 'react';
import styled from 'styled-components';

import theme from '../../styles/theme';
import { Profile } from '../UI/Profile';
import { useResize } from '../../hooks/useResize';
import { FaWalking } from 'react-icons/fa';
import { TbTruckDelivery, TbAward } from 'react-icons/tb';

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

        > span {
          font-weight: 600;
          font-size: 1rem;
        }
      }
    }

    &:nth-child(2) {
      margin: 0.8rem 0px 0.5rem 2.5rem;
      font-weight: 700;
      font-size: 1rem;
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

    &:last-child {
      width: 95%;
      line-height: 2;
      overflow: auto;
      white-space: pre-line;
      max-height: 180px;
    }
  }

  @media (max-width: 925px), ${theme.mobile} {
    margin: 2rem 0px 2rem 0.5rem;
  }
`;

const GradeSpan = styled.span`
  font-weight: 700;
`;

const DetailContent = ({ name, tradeMethod, detail, image, grade, place }) => {
  const { resize } = useResize(925, '<');

  const getGradeIconColor = () => {
    if (grade === 'BRONZE') {
      return '#cc8e34';
    } else if (grade === 'GOLD') {
      return '#ffd700';
    } else if (grade === 'SILVER') {
      return '#c0c0c0';
    }
    return '#a0e1f5';
  };

  return (
    <div>
      <ContentTitle>
        <p>{name}님이 대여하는 상품</p>
        <Profile src={image} size="45px" />
      </ContentTitle>
      <hr />
      <CategoryBox>
        <ContentCategory>
          <div>
            <FaWalking size="26px" />
            {tradeMethod.includes('DIRECT') ? (
              <p>
                직거래 » <span>{place}</span>
              </p>
            ) : (
              <p>직거래</p>
            )}
          </div>
          {tradeMethod.includes('DIRECT') || tradeMethod.length === 2 ? (
            <>
              <p>가능</p>
            </>
          ) : (
            <p>불가능</p>
          )}
        </ContentCategory>
        <ContentCategory>
          <div>
            <TbTruckDelivery size="30px" />
            <p>택배</p>
          </div>
          {tradeMethod.includes('DELIVERY') || tradeMethod.length === 2 ? (
            <p>가능</p>
          ) : (
            <p>불가능</p>
          )}
        </ContentCategory>
        <ContentCategory>
          <div>
            <TbAward size="30px" color={getGradeIconColor()} />
            <p>
              {name}님은 <GradeSpan>{grade}</GradeSpan> 등급입니다.
            </p>
          </div>
        </ContentCategory>
      </CategoryBox>
      <hr />
      <ContentDescription>
        <p>상품 설명</p>
        <p>{detail}</p>
      </ContentDescription>
      {resize && <hr />}
    </div>
  );
};

export default DetailContent;
