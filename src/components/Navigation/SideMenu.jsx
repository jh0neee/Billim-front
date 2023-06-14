import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import theme from '../../styles/theme';
import { searchAction } from '../../store/search';

const SideNavList = styled.ul`
  list-style: none;
  margin: 3rem 0;
  width: 100%;
  padding: 5% 15%;
  display: flex;
  flex-direction: column;

  ${props =>
    props.sub &&
    css`
      align-items: flex-end;
      margin: 0;
      padding: 0 0.75rem 0 0;
      @keyframes slide {
        0% {
          transform: translateY(-10%);
        }
        100% {
          transform: translateY(0);
        }
      }
      animation: slide 0.25s ease-out forwards;

      @media ${theme.desktop}, ${theme.tablet}, ${theme.mobile} {
        padding: 0 0.75rem 0 0;
      }
      @media (max-height: 600px) {
        padding: 0 10px 0 0;
      }
    `}

  .line {
    width: 100%;
    margin: 20px 0;
  }

  @media ${theme.desktop} {
    padding: 5% 23%;
  }
  @media ${theme.tablet} {
    margin: 10px 0;
    padding: 15%;
  }
  @media ${theme.mobile} {
    margin: 10px 0;
    padding: 15% 25%;
  }
  @media (max-height: 600px) {
    padding: 5% 20%;
  }
`;

const SideNavItem = styled.li`
  margin: 0.5rem 1.25rem;
  line-height: 1.3;

  ${props =>
    props.leftIn &&
    css`
      padding-left: 0.75rem;
    `}

  @media ${theme.desktop} {
    line-height: ${props => (props.mainlink ? '2' : '1.5')};
  }
  @media (max-height: 600px) {
    line-height: ${props => (props.mainlink ? '1' : '0.8')};
  }
`;

const SideLink = styled(NavLink)`
  border: 1px solid transparent;
  font-family: ${props => (props.mainlink ? 'TRoundWind' : 'SCDream')};
  font-weight: ${props => (props.mainlink ? '700' : '600')};
  font-size: ${props => (props.mainlink ? '1.5rem' : '1rem')};
  color: ${props => props.theme.fontColor};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.fontHover};
  }

  @media ${theme.desktop} {
    font-size: ${props => (props.mainlink ? '150%' : '100%')};
  }
  @media (max-height: 600px) {
    font-size: ${props => (props.mainlink ? '1.2rem' : '0.8rem')};
  }
`;

const MyPageTitle = styled.p`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  font-family: 'TRoundWind';
  font-weight: 700;
  font-size: 1.5rem;

  @media ${theme.desktop} {
    font-size: 150%;
  }
  @media (max-height: 600px) {
    font-size: 1.2rem;
  }
`;

const SideMenu = () => {
  // NOTE - 마이페이지는 로그인 시에만 보이도록
  const [isSlideMenu, setIsSlideMenu] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const slideHandler = e => {
    e.stopPropagation();
    setIsSlideMenu(!isSlideMenu);
  };

  const handleClearSearch = () => {
    dispatch(searchAction.CLEAR_SEARCH(false));
  };

  return (
    <SideNavList>
      <SideNavItem>
        <SideLink to="/product" mainlink="true" onClick={handleClearSearch}>
          전체상품
        </SideLink>
      </SideNavItem>
      <SideNavItem leftIn>
        <SideLink to="/product/living" onClick={handleClearSearch}>
          생활용품
        </SideLink>
      </SideNavItem>
      <SideNavItem leftIn>
        <SideLink to="/product/apparel" onClick={handleClearSearch}>
          의류잡화
        </SideLink>
      </SideNavItem>
      <SideNavItem leftIn>
        <SideLink to="/product/sporting" onClick={handleClearSearch}>
          운동용품
        </SideLink>
      </SideNavItem>
      <SideNavItem leftIn>
        <SideLink to="/product/electronic" onClick={handleClearSearch}>
          전자제품
        </SideLink>
      </SideNavItem>
      <hr className="line" />
      {isLoggedIn && (
        <>
          <SideNavItem>
            <MyPageTitle onClick={slideHandler}>마이페이지</MyPageTitle>
          </SideNavItem>
          {isSlideMenu && (
            <SideNavList sub>
              <SideNavItem>
                <SideLink to="mypage/purchase">구매관리</SideLink>
              </SideNavItem>
              <SideNavItem>
                <SideLink to="mypage/sales">판매관리</SideLink>
              </SideNavItem>
              <SideNavItem>
                <SideLink to="mypage/favorite">관심상품</SideLink>
              </SideNavItem>
              <SideNavItem>
                <SideLink to="mypage/review">후기</SideLink>
              </SideNavItem>
              <SideNavItem>
                <SideLink to="mypage/block">차단관리</SideLink>
              </SideNavItem>
              <SideNavItem>
                <SideLink to="mypage/member">회원정보수정</SideLink>
              </SideNavItem>
            </SideNavList>
          )}
        </>
      )}
    </SideNavList>
  );
};

export default SideMenu;
