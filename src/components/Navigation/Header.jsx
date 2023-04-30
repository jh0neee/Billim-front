import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { IoMenu } from "react-icons/io5";
import NavLinks from "./NavLinks";
import logoImg from "../../asset/image/billim_logo_1.png";

const HeaderBox = styled.div`
  margin: auto;
  height: 85px;
  padding: 0px 10px;
  display: grid;
  grid-template-columns: 2fr 6fr 2fr;
  align-items: center;
  justify-items: center;

  .menu_button {
    font-size: 40px;
    margin-right: 10rem;
    cursor: pointer;
  }
`;

const LogoImg = styled.img`
  width: 112px;
  height: 48px;
`;

const Header = () => {
  return (
    <HeaderBox>
      <IoMenu className='menu_button' />
      <Link>
        <LogoImg src={logoImg} />
      </Link>
      <NavLinks />
    </HeaderBox>
  );
};

export default Header;
