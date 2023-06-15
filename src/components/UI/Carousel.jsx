import React from 'react';
import styled, { css } from 'styled-components';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import theme from '../../styles/theme';

const CarouselSlider = styled(Slider)`
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

  ${({ slidesToShow }) =>
    slidesToShow === 2 &&
    css`
      margin: 2rem auto;
      padding-left: 2.8rem;
      width: 50%;
    `}
  ${({ slidesToShow }) =>
    slidesToShow === 1 &&
    css`
      margin-left: 40%;
      width: 27%;
    `}

  @media ${theme.desktop} {
    margin-top: 2rem;
    margin-left: 20%;
    width: 69%;

    .slick-dots {
      right: 60px;
    }

    ${({ slidesToShow }) =>
      slidesToShow === 2 &&
      css`
        margin: 2rem auto;
        padding-left: 4rem;
        width: 40%;
      `}
    ${({ slidesToShow }) =>
      slidesToShow === 1 &&
      css`
        margin-left: 43%;
        width: 23%;
      `}
  }
  @media ${theme.laptop} {
    margin: 2rem auto;
    padding-left: 2.8rem;
    width: 67%;

    .slick-dots {
      right: -8px;
    }
    ${({ slidesToShow }) =>
      slidesToShow === 1 &&
      css`
        margin: 2rem auto;
        padding-left: 1.8rem;
        width: 34%;
      `}
  }
  @media ${theme.tablet}, ${theme.mobile} {
    padding-left: 1.8rem;
    width: 66%;

    .slick-dots {
      right: -2px;
    }
  }
`;

const CarouselImgBox = styled.div`
  cursor: pointer;

  > p {
    padding-top: 10px;
    padding-right: 29%;
    text-align: center;

    ${({ slidesToShow }) =>
      slidesToShow === 2 &&
      css`
        padding-right: 15%;
      `}
  }

  @media ${theme.desktop} {
    > p {
      padding-right: 41%;

      ${({ slidesToShow }) =>
        slidesToShow === 2 &&
        css`
          padding-right: 24%;
        `}
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

const Carousel = ({ items }) => {
  const slidesToShow = items.length > 3 ? 3 : items.length;

  const carouselSetting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: items.length > slidesToShow,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: '-5px',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '0px',
          autoplay: items.length > 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: items.length > 2 ? 2 : items.length,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '0px',
          autoplay: items.length > 2,
        },
      },
    ],
  };

  return (
    <CarouselSlider {...carouselSetting}>
      {items.map((item, index) => (
        <CarouselImgBox key={index} slidesToShow={items.length}>
          <img src="https://via.placeholder.com/200x200" alt="예시이미지" />
          <p>{item}</p>
        </CarouselImgBox>
      ))}
    </CarouselSlider>
  );
};

export default Carousel;
