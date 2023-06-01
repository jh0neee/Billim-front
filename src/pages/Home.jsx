import React from "react";
import styled, { css } from "styled-components";

import { GrNext, GrPrevious } from "react-icons/gr";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ContentBox = styled.div`
  margin-top: 85px;
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
    font-family: "TRoundWind";
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

const Carousel = styled(Slider)`
  margin-top: 2rem;
  margin-left: 20%;
  width: 60%;
  text-align: center;

  .slick-list {
    overflow: hidden;
    height: 18.5vw;
    text-align: center;
    margin-left: 45px;
  }
`;

const ArrowButton = styled.button`
  border-radius: 50%;
  z-index: 1;
  ${(props) =>
    props.pos === "left"
      ? css`
          top: 36.67%;
          left: 0;
          transform: translate(-50%, 50%);
        `
      : css`
          top: 45%;
          right: 0;
          transform: translate(50%, -50%);
        `}
  &::before {
    content: initial;
  }

  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
  }
`;

const CarouselImgBox = styled.div`
  cursor: pointer;

  > p {
    padding-top: 10px;
    padding-right: 40px;
  }
`;

const Home = () => {
  const setting = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    prevArrow: (
      <ArrowButton pos='left'>
        <GrPrevious />
      </ArrowButton>
    ),
    nextArrow: (
      <ArrowButton pos='right'>
        <GrNext />
      </ArrowButton>
    ),
  };
  return (
    <React.Fragment>
      <ContentBox>
        <img src='https://via.placeholder.com/1260x400' alt='예시이미지' />
        <img src='https://via.placeholder.com/1260x400' alt='예시이미지' />
        <img src='https://via.placeholder.com/1260x400' alt='예시이미지' />
      </ContentBox>
      <CarouselBox>
        <p>최근 본 상품</p>
        <Carousel {...setting}>
          <CarouselImgBox>
            <img src='https://via.placeholder.com/200x200' alt='예시이미지' />
            <p>아이템명1</p>
          </CarouselImgBox>
          <CarouselImgBox>
            <img src='https://via.placeholder.com/200x200' alt='예시이미지' />
            <p>아이템명2</p>
          </CarouselImgBox>
          <CarouselImgBox>
            <img src='https://via.placeholder.com/200x200' alt='예시이미지' />
            <p>아이템명3</p>
          </CarouselImgBox>
          <CarouselImgBox>
            <img src='https://via.placeholder.com/200x200' alt='예시이미지' />
            <p>아이템명4</p>
          </CarouselImgBox>
        </Carousel>
      </CarouselBox>
      <Footer>푸터</Footer>
    </React.Fragment>
  );
};

export default Home;
