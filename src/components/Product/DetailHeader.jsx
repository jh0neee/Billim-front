import React from 'react';
import styled from 'styled-components';

import { RiStarSFill } from 'react-icons/ri';

const TitleBox = styled.div`
  padding: 1rem 0;
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
`;

const TitleParagraph = styled.div`
  font-weight: 500;
`;

const DetailHeader = props => {
  return (
    <TitleBox>
      <DetailTitle>{props.name}</DetailTitle>
      <TitleCollection>
        <RiStarSFill />
        <TitleParagraph>{props.scope}</TitleParagraph>
        <p>|</p>
        <TitleParagraph>후기 n개</TitleParagraph>
        <p>|</p>
        <TitleParagraph>등급</TitleParagraph>
        <p>|</p>
        <TitleParagraph>지역</TitleParagraph>
      </TitleCollection>
    </TitleBox>
  );
};

export default DetailHeader;
