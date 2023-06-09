import React from 'react';
import styled from 'styled-components';

import theme from '../../styles/theme';
import { RiStarSFill } from 'react-icons/ri';

const TitleBox = styled.div`
  padding: 1rem 0;

  @media (max-width: 925px), ${theme.mobile} {
    text-align: center;
  }
`;

const DetailTitle = styled.div`
  margin-bottom: 0.7rem;
  font-family: 'TRoundWind';
  font-weight: 700;
  font-size: 1.5rem;
`;

const TitleCollection = styled.div`
  display: flex;
  align-items: center;

  > p {
    margin: 0 0.5rem;
  }

  @media (max-width: 925px), ${theme.mobile} {
    justify-content: center;
  }
`;

const TitleParagraph = styled.div`
  font-weight: 500;
`;

const DetailHeader = ({ name, scope, grade, reviewCount }) => {
  return (
    <TitleBox>
      <DetailTitle>{name}</DetailTitle>
      <TitleCollection>
        <RiStarSFill />
        <TitleParagraph>{scope}</TitleParagraph>
        <p>|</p>
        <TitleParagraph>{grade}</TitleParagraph>
        <p>|</p>
        <TitleParagraph>후기 {reviewCount}개</TitleParagraph>
      </TitleCollection>
    </TitleBox>
  );
};

export default DetailHeader;
