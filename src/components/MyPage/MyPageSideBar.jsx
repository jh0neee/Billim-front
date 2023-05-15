import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MyPageMenu = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;

  > * {
    margin: 0.7rem 0px;
  }

  > a {
    font-size: 0.85rem;
  }

  > p {
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const MyPageSideBar = () => {
  return (
    <MyPageMenu>
      <p>마이페이지</p>
      <hr />
      <Link to='/mypage/purchase'>구매관리</Link>
      <Link to='/mypage/sales'>판매관리</Link>
      <Link to='/mypage/favorite'>관심상품</Link>
      <Link to='/mypage/review'>후기</Link>
      <Link to='/mypage/block'>차단관리</Link>
      <Link to='/mypage/member'>회원정보수정</Link>
    </MyPageMenu>
  );
};

export default MyPageSideBar;
