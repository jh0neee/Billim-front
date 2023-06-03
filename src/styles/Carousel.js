import React from 'react';
import styled, { css } from 'styled-components';
import { GrNext, GrPrevious } from 'react-icons/gr';

const ArrowButton = styled.button`
  border-radius: 50%;
  z-index: 1;
  ${props =>
    props.pos === 'left'
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

export const carouselSetting = {
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '0px',
  prevArrow: (
    <ArrowButton pos="left">
      <GrPrevious />
    </ArrowButton>
  ),
  nextArrow: (
    <ArrowButton pos="right">
      <GrNext />
    </ArrowButton>
  ),
};
