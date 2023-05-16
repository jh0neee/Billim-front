import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

import { searchAction } from "../../store/search";

const SideNavList = styled.ul`
  list-style: none;
  margin: 0px;
  width: 100%;
  display: flex;
  padding: 20px 60px;
  flex-direction: column;

  ${(props) =>
    props.sub &&
    css`
      align-items: flex-end;
      padding: 10px 20px 0 0;
      @keyframes slide {
        0% {
          transform: translateY(-10%);
        }
        100% {
          transform: translateY(0);
        }
      }
      animation: slide 0.25s ease-out forwards;
    `}

  .line {
    width: 100%;
    margin: 20px 0;
  }
`;

const SideNavItem = styled.li`
  margin: 0.5rem 0.1rem;

  ${(props) =>
    props.in &&
    css`
      padding-left: 0.4rem;
    `}
`;

const SideLink = styled(NavLink)`
  border: 1px solid transparent;
  font-family: "SCDream";
  font-weight: 600;
  font-size: 1rem;
  color: ${(props) => props.theme.fontColor};
  text-decoration: none;
  transition: color 0.3s ease;

  ${(props) =>
    props.main &&
    css`
      font-family: "TRoundWind";
      font-weight: 700;
      font-size: 1.5rem;
    `}

  &:hover {
    color: ${(props) => props.theme.fontHover};
  }
`;

const MyPageTitle = styled.p`
  cursor: pointer;
  font-family: "TRoundWind";
  font-weight: 700;
  font-size: 1.5rem;
`;

const SideMenu = () => {
  //NOTE - 마이페이지는 로그인 시에만 보이도록
  const [isSlideMenu, setIsSlideMenu] = useState(false);
  const dispatch = useDispatch();

  const slideHandler = (e) => {
    e.stopPropagation();
    setIsSlideMenu(!isSlideMenu);
  };

  const handleClearSearch = () => {
    dispatch(searchAction.CLEAR_SEARCH(false));
  };

  return (
    <SideNavList>
      <SideNavItem>
        <SideLink to='/product' $main onClick={handleClearSearch}>
          전체상품
        </SideLink>
      </SideNavItem>
      <SideNavItem $in>
        <SideLink to='/product/living' onClick={handleClearSearch}>
          생활용품
        </SideLink>
      </SideNavItem>
      <SideNavItem $in>
        <SideLink to='/product/apparel' onClick={handleClearSearch}>
          의류잡화
        </SideLink>
      </SideNavItem>
      <SideNavItem $in>
        <SideLink to='/product/sporting' onClick={handleClearSearch}>
          운동용품
        </SideLink>
      </SideNavItem>
      <SideNavItem $in>
        <SideLink to='/product/electronic' onClick={handleClearSearch}>
          전자제품
        </SideLink>
      </SideNavItem>
      <hr className='line' />
      <SideNavItem>
        <MyPageTitle onClick={slideHandler}>마이페이지</MyPageTitle>
        {isSlideMenu && (
          <SideNavList sub>
            <SideNavItem>
              <SideLink to='mypage/purchase'>구매관리</SideLink>
            </SideNavItem>
            <SideNavItem>
              <SideLink to='mypage/sales'>판매관리</SideLink>
            </SideNavItem>
            <SideNavItem>
              <SideLink to='mypage/favorite'>관심상품</SideLink>
            </SideNavItem>
            <SideNavItem>
              <SideLink to='mypage/review'>후기</SideLink>
            </SideNavItem>
            <SideNavItem>
              <SideLink to='mypage/block'>차단관리</SideLink>
            </SideNavItem>
            <SideNavItem>
              <SideLink to='mypage/member'>회원정보수정</SideLink>
            </SideNavItem>
          </SideNavList>
        )}
      </SideNavItem>
    </SideNavList>
  );
};

export default SideMenu;
