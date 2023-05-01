import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { IoClose, IoMenu } from "react-icons/io5";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import SideMenu from "./SideMenu";
import BackDrop from "../UI/BackDrop";
import logoImg from "../../asset/image/billim_logo_1.png";

const HeaderBox = styled.div`
  position: fixed;
  margin: 0 auto;
  padding: 0px 10px;
  width: 100%;
  height: 85px;
  top: 0;
  display: grid;
  grid-template-columns: 2fr 6fr 2fr;
  align-items: center;
  justify-items: center;
  z-index: 9;
  background-color: rgba(255, 255, 255, 0.9);
`;

const IconOpen = styled(IoMenu)`
  cursor: pointer;
  font-size: 40px;
  margin-right: 10.6rem;
`;

const IconClose = styled(IoClose)`
  cursor: pointer;
  font-size: 40px;
  margin: 1.5rem 0 0 1.8rem;
`;

const LogoImg = styled.img`
  width: 112px;
  height: 48px;
`;

const Header = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const openDrawerHandler = () => {
    setIsOpenDrawer(true);
  };

  const closeDrawerHandler = () => {
    setIsOpenDrawer(false);
  };

  return (
    <React.Fragment>
      {isOpenDrawer && <BackDrop />}
      <SideDrawer show={isOpenDrawer} onClick={closeDrawerHandler}>
        <IconClose onClick={closeDrawerHandler} />
        <SideMenu />
      </SideDrawer>
      <HeaderBox>
        <IconOpen onClick={openDrawerHandler} />
        <Link>
          <LogoImg src={logoImg} alt='logo' />
        </Link>
        <NavLinks />
      </HeaderBox>
    </React.Fragment>
  );
};

export default Header;
