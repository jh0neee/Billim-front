import React from 'react';
import styled from 'styled-components';

const LoadingLayout = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const LoadingRotate = styled.div`
  display: inline-block;
  width: 64px;
  height: 64px;

  @keyframes loading-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  &::after {
    content: ' ';
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #fcd34d;
    border-color: #fcd34d transparent #fcd34d transparent;
    animation: loading-rotate 1.2s linear infinite;
  }
`;

const LoadingSpinner = props => {
  return (
    <LoadingLayout className={`${props.asOverlay}`}>
      <LoadingRotate />
    </LoadingLayout>
  );
};

export default LoadingSpinner;
