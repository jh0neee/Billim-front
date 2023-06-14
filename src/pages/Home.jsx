import React from 'react';
import styled from 'styled-components';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { carouselSetting } from '../styles/Carousel';
import theme from '../styles/theme';

const ContentBox = styled.div`
  max-width: 1024px;
  margin: 85px auto 0;
  text-align: center;

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

  > p {
    text-align: center;
    font-family: 'TRoundWind';
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

const Carousel = styled(Slider)`
  margin-top: 2rem;
  margin-left: 13%;
  width: 80%;
  text-align: center;

  .slick-list {
    overflow: hidden;
    text-align: center;
  }

  .slick-dots {
    bottom: -55px;
    right: 38px;
  }

  @media ${theme.desktop} {
    margin-top: 2rem;
    margin-left: 20%;
    width: 69%;

    .slick-dots {
      right: 60px;
    }
  }
  @media ${theme.laptop} {
    margin: 2rem auto;
    padding-left: 2.8rem;
    width: 67%;

    .slick-dots {
      right: -8px;
    }
  }
  @media ${theme.tablet}, ${theme.mobile} {
    padding-left: 1.8rem;
    width: 66%;

    .slick-dots {
      right: 2px;
    }
  }
`;

const CarouselImgBox = styled.div`
  cursor: pointer;

  > p {
    padding-top: 10px;
    padding-right: 29%;
    text-align: center;
  }

  @media ${theme.desktop} {
    > p {
      padding-right: 41%;
    }
  }
  @media ${theme.laptop} {
    > p {
      padding-right: 16%;
    }
  }
  @media ${theme.tablet}, ${theme.mobile} {
    > p {
      padding-right: 12%;
    }
  }
`;

const Home = () => {
  const carouselItem = ['item1', 'item2', 'item3', 'item4'];

  return (
    <React.Fragment>
      <ContentBox>
        {/* <img src="https://via.placeholder.com/1260x400" alt="예시이미지" />
        <img src="https://via.placeholder.com/1260x400" alt="예시이미지" />
        <img src="https://via.placeholder.com/1260x400" alt="예시이미지" /> */}
        <CarouselBox>
          <p>최근 본 상품</p>
          <Carousel {...carouselSetting}>
            {carouselItem.map((item, index) => (
              <CarouselImgBox key={index}>
                <img
                  src="https://via.placeholder.com/200x200"
                  alt="예시이미지"
                />
                <p>{item}</p>
              </CarouselImgBox>
            ))}
          </Carousel>
        </CarouselBox>
      </ContentBox>
      <Footer>푸터</Footer>
    </React.Fragment>
  );
};

export default Home;
