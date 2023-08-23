import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import theme from '../styles/theme';
import Carousel from '../components/UI/Carousel';
import ErrorModal from '../util/ErrorModal';
import { useLoadingError } from '../hooks/useLoadingError';

const ContentBox = styled.div`
  max-width: 1024px;
  margin: 85px auto 0;
  text-align: center;
  overflow: hidden;

  @media ${theme.desktop} {
    max-width: 1440px;
  }
  @media ${theme.laptop} {
    max-width: 768px;
  }

  @media ${theme.tablet}, ${theme.mobile} {
    max-width: 375px;
    margin: 150px auto 0;
  }
`;

const Footer = styled.footer`
  height: 90px;
  color: #cccccc;
  text-align: left;
`;

const CarouselBox = styled.div`
  margin-top: 4.5rem;
  margin-bottom: 3.75rem;
  height: ${props => (props.isEmpty ? 'auto' : '400px')};

  > p:first-child {
    text-align: center;
    font-family: 'TRoundWind';
    font-size: 2.3rem;
    font-weight: 600;
  }
`;

const CarouselText = styled.p`
  color: #868e96;
  text-align: center;
  font-family: 'SCDream';
  font-size: 1.4rem;
  padding: 2rem;
`;

const Home = () => {
  const url = process.env.REACT_APP_URL;
  const [recentItems, setResentItems] = useState([]);
  const { error, clearError, errorHandler } = useLoadingError();

  useEffect(() => {
    axios
      .get(`${url}/product/list/most/popular`)
      .then(response => setResentItems(response.data))
      .catch(err => errorHandler(err));
  }, []);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <ContentBox>
        <img src="https://via.placeholder.com/1260x400" alt="예시이미지" />
        <img src="https://via.placeholder.com/1260x400" alt="예시이미지" />
        <img src="https://via.placeholder.com/1260x400" alt="예시이미지" />
        <CarouselBox isEmpty={recentItems.length === 0}>
          <p>인기 상품</p>
          {recentItems.length === 0 ? (
            <CarouselText>최근 내역이 없습니다.</CarouselText>
          ) : (
            <Carousel items={recentItems} />
          )}
        </CarouselBox>
      </ContentBox>
      <Footer>푸터</Footer>
    </React.Fragment>
  );
};

export default Home;
