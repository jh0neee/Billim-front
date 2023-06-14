import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { IoClose, IoMenu } from 'react-icons/io5';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import SideMenu from './SideMenu';
import BackDrop from '../UI/BackDrop';
import logoImg from '../../asset/image/billim_logo_1.png';
import theme from '../../styles/theme';

const HeaderBox = styled.div`
  position: fixed;
  margin: 0 auto;
  padding: 0px 10px;
  max-width: 1440px;
  width: 100vw;
  height: 85px;
  top: 0;
  display: grid;
  grid-template-columns: 2fr 6fr 2fr;
  align-items: center;
  justify-items: center;
  z-index: 9;
  background-color: rgba(255, 255, 255, 0.9);

  @media ${theme.desktop} {
    left: 50%;
    transform: translateX(-50%);
  }
  @media ${theme.laptop} {
    max-width: 1024px;
  }
  @media ${theme.tablet} {
    height: 150px;
    max-width: 768px;
  }
  @media ${theme.mobile} {
    height: 150px;
    max-width: 480px;
    grid-template-columns: 2fr 5fr 2fr;
  }
`;

const IconOpen = styled(IoMenu)`
  cursor: pointer;
  font-size: 40px;
`;

const IconClose = styled(IoClose)`
  cursor: pointer;
  font-size: 40px;
  position: absolute;
  right: 0;
  margin: 1.5rem;
`;

const LogoImg = styled.img`
  width: 112px;
  height: 48px;
  justify-self: center;
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
        <Link to="/">
          <LogoImg src={logoImg} alt="logo" />
        </Link>
        <NavLinks />
      </HeaderBox>
    </React.Fragment>
  );
};

export default Header;
