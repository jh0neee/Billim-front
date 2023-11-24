import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import theme from '../../styles/theme';

const CarouselSlider = styled(Slider)`
  margin: 4rem auto 0px;
  width: 95%;
  text-align: center;

  .slick-list {
    overflow: hidden;
    text-align: center;
  }

  .slick-dots {
    bottom: -55px;
  }

  ${({ lengthofslide }) =>
    lengthofslide === 2 &&
    css`
      width: 50%;
    `}

  ${({ lengthofslide }) =>
    lengthofslide === 1 &&
    css`
      width: 27%;
    `}

  @media ${theme.desktop} {
    width: 69%;

    ${({ lengthofslide }) =>
      lengthofslide === 2 &&
      css`
        width: 40%;
      `}

    ${({ lengthofslide }) =>
      lengthofslide === 1 &&
      css`
        width: 23%;
      `}
  }
  @media ${theme.laptop} {
    width: 67%;

    ${({ lengthofslide }) =>
      lengthofslide === 1 &&
      css`
        width: 34%;
      `}
  }

  @media ${theme.tablet}, ${theme.mobile} {
    width: 66%;
  }
`;

const CarouselImgBox = styled(Link)`
  cursor: pointer;

  flex-direction: column;
  align-items: center;
  display: flex !important;

  > p {
    font-family: 'SCDream';
    padding-top: 10px;
    text-align: center;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const CarouselImage = styled.img`
  width: 200px;
  height: 200px;
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
    <CarouselSlider {...carouselSetting} lengthofslide={items.length}>
      {items.map(item => (
        <div key={item.productId}>
          <CarouselImgBox to={`/${item.productId}/detail`}>
            <CarouselImage
              src={item.imageUrl}
              alt={`[상품] ${item.productName}`}
            />
            <p>{item.productName}</p>
          </CarouselImgBox>
        </div>
      ))}
    </CarouselSlider>
  );
};

export default Carousel;
