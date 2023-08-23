import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import theme from '../../styles/theme';

const CarouselSlider = styled(Slider)`
  margin-top: 4rem;
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

  ${({ lengthofslide }) =>
    lengthofslide === 2 &&
    css`
      margin: 2rem auto;
      padding-left: 2.8rem;
      width: 50%;
    `}
  ${({ lengthofslide }) =>
    lengthofslide === 1 &&
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

    ${({ lengthofslide }) =>
      lengthofslide === 2 &&
      css`
        margin: 2rem auto;
        padding-left: 4rem;
        width: 40%;
      `}
    ${({ lengthofslide }) =>
      lengthofslide === 1 &&
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
    ${({ lengthofslide }) =>
      lengthofslide === 1 &&
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

const CarouselImgBox = styled(Link)`
  cursor: pointer;

  > p {
    font-family: 'SCDream';
    padding-top: 10px;
    padding-right: 29%;
    text-align: center;

    &:hover {
      text-decoration: underline;
    }

    ${({ lengthofslide }) =>
      lengthofslide === 2 &&
      css`
        padding-right: 15%;
      `}
  }

  @media ${theme.desktop} {
    > p {
      padding-right: 41%;

      ${({ lengthofslide }) =>
        lengthofslide === 2 &&
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
    <CarouselSlider {...carouselSetting}>
      {items.map(item => (
        <div key={item.productId}>
          <CarouselImgBox
            to={`/${item.productId}/detail`}
            lengthofslide={items.length}
          >
            <CarouselImage src={item.imageUrl} alt="상품이미지" />
            <p>{item.productName}</p>
          </CarouselImgBox>
        </div>
      ))}
    </CarouselSlider>
  );
};

export default Carousel;
