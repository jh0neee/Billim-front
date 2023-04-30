import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  padding-top: 60px;
  height: 150px;
  color: #cccccc;
  text-align: left;
`;

const Home = () => {
  return (
    <React.Fragment>
      <div>
        <img src='https://via.placeholder.com/1260x400' alt='예시이미지' />
        <img src='https://via.placeholder.com/1260x400' alt='예시이미지' />
        <img src='https://via.placeholder.com/1260x400' alt='예시이미지' />
        <h1>Carousel</h1>
      </div>
      <Footer>푸터</Footer>
    </React.Fragment>
  );
};

export default Home;
