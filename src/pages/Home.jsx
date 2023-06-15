import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Carousel from '../components/UI/Carousel';
import theme from '../styles/theme';

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
  padding-top: 60px;
  height: 150px;
  color: #cccccc;
  text-align: left;
`;

const CarouselBox = styled.div`
  margin-top: 4.5rem;
  height: ${props => (props.isEmpty ? 'auto' : '350px')};

  > p:first-child {
    text-align: center;
    font-family: 'TRoundWind';
    font-size: 2.5rem;
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
  const [recentItems, setResentItems] = useState([]);

  useEffect(() => {
    const viewedProduct = localStorage.getItem('recentItems');

    if (viewedProduct == null) {
      setResentItems([]);
    } else {
      const viewedItems = JSON.parse(viewedProduct);
      console.log(viewedItems);
      setResentItems(viewedItems);
    }
  }, []);

  return (
    <React.Fragment>
      <ContentBox>
        <img src="https://via.placeholder.com/1260x400" alt="예시이미지" />
        <img src="https://via.placeholder.com/1260x400" alt="예시이미지" />
        <img src="https://via.placeholder.com/1260x400" alt="예시이미지" />
        <CarouselBox isEmpty={recentItems.length === 0}>
          <p>최근 본 상품</p>
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
