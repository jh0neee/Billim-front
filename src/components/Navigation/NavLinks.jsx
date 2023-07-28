import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';

import theme from '../../styles/theme';
import { TbMessageChatbot } from 'react-icons/tb';
import { Profile } from '../UI/Profile';
import { useAuth } from '../../hooks/useAuth';

const NavList = styled.ul`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
`;

const NavItem = styled.li`
  margin: 0.1rem 0.5rem;
  position: ${props => (props.toggle ? 'relative' : 'none')};

  ${props =>
    props.login &&
    css`
      margin-bottom: 0.3rem;
      font-size: 1.1rem;
    `}
`;

const StyledNavLink = styled(NavLink)`
  border: 1px solid transparent;
  font-family: 'SCDream';
  font-weight: 600;
  color: ${props => props.theme.fontColor};
  text-decoration: none;
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const DropMenu = styled.ul`
  position: absolute;
  background-color: white;
  width: 130px;
  font-family: 'TRoundWind';
  font-size: 0.8rem;
  padding: 1rem 0;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  top: 46px;
  right: -43px;
  opacity: ${props => (props.show ? 1 : 0)};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transform: translateY(${props => (props.show ? '0' : '-20px')});
  transition: opacity 0.4s ease, visibility 0.4s;
  animation: ${slideIn} 0.4s ease-in-out;

  > :first-child {
    margin-bottom: 1rem;
  }

  @media ${theme.mobile} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90vw;
    top: 54px;
    right: -16px;
    font-size: 0.9rem;

    > *:not(:last-child) {
      margin-bottom: 0;
      margin-right: 3.5rem;
    }
  }
`;

const NavLinks = () => {
  const auth = useAuth();
  const [isSlideMenu, setIsSlideMenu] = useState(false);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isMobile = window.innerWidth <= 480;

  const slideHandler = () => {
    setIsSlideMenu(!isSlideMenu);
  };

  return (
    <NavList>
      {!isMobile && isLoggedIn && (
        <NavItem>
          <StyledNavLink to="/chat">
            <TbMessageChatbot size="38px" />
          </StyledNavLink>
        </NavItem>
      )}
      {isLoggedIn && (
        <NavItem toggle onClick={slideHandler}>
          <Profile size="35px" />
          {isSlideMenu && (
            <DropMenu show={isSlideMenu}>
              {isMobile && (
                <li>
                  <Link to="/chat">채팅하기</Link>
                </li>
              )}
              <li>
                <Link to="/mypage/purchase">마이페이지</Link>
              </li>
              <li>
                <Link to="/" onClick={() => auth.logout(false)}>
                  로그아웃
                </Link>
              </li>
            </DropMenu>
          )}
        </NavItem>
      )}
      {!isLoggedIn && (
        <NavItem login>
          <StyledNavLink to="/login">로그인</StyledNavLink>
        </NavItem>
      )}
    </NavList>
  );
};

export default NavLinks;
