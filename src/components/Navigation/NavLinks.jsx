import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { TbMessageChatbot } from "react-icons/tb";
import { Profile } from "../UI/Profile";

const NavList = styled.ul`
  list-style: none;
  margin-left: 3rem;
  padding: 0px;
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 1fr;
  column-gap: 15px;
  justify-items: center;
  align-items: center;
`;

const NavItem = styled.li`
  margin: 0.1rem;

  &:last-child {
    margin-bottom: 0.3rem;
    font-size: 1.1rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  border: 1px solid transparent;
  font-family: "SCDream";
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
  text-decoration: none;
`;

const NavLinks = () => {
  //NOTE - icon은 로그인 시에만 보이게, 로그아웃은 profile modal 안에
  return (
    <NavList>
      <NavItem>
        <StyledNavLink to='/chat'>
          <TbMessageChatbot size='38px' />
        </StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink>
          <Profile size='35px' />
        </StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink to='/login'>로그인</StyledNavLink>
      </NavItem>
    </NavList>
  );
};

export default NavLinks;
