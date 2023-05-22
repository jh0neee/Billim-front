import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

import { TbMessageChatbot } from "react-icons/tb";
import { Profile } from "../UI/Profile";

const NavList = styled.ul`
  margin-left: 3rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
`;

const NavItem = styled.li`
  margin: 0.1rem 0.5rem;

  ${props => props.login && css`
    margin-bottom: 0.3rem;
    font-size: 1.1rem;
  `}
`;

const StyledNavLink = styled(NavLink)`
  border: 1px solid transparent;
  font-family: "SCDream";
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
  text-decoration: none;
`;

const NavLinks = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <NavList>
      {isLoggedIn && (
        <NavItem>
          <StyledNavLink to='/chat'>
            <TbMessageChatbot size='38px' />
          </StyledNavLink>
        </NavItem>
      )}
      {isLoggedIn && (
        <NavItem>
          <StyledNavLink>
            <Profile size='35px' />
          </StyledNavLink>
        </NavItem>
      )}
      {!isLoggedIn && (
        <NavItem login>
          <StyledNavLink to='/login'>로그인</StyledNavLink>
        </NavItem>
      )}
    </NavList>
  );
};

export default NavLinks;
