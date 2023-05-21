import React from "react";
import styled, { css } from "styled-components";

import Button from "../UI/Button";
import { Profile } from "../UI/Profile";

const EditMemberLayout = styled.div`
  margin: 0 0 3rem;
`;

const EditMemberBox = styled.div`
  display: grid;
  grid-template-columns: 0.35fr 1fr 0.3fr;
  align-items: ${(props) => (props.first ? "flex-start" : "center")};
  margin: 2rem 0;

  ${(props) =>
    props.first &&
    css`
      > p,
      button {
        margin-top: 1rem;
      }

      > div {
        > p {
          font-size: 0.65rem;
          margin-top: 0.5rem;
        }
      }
    `}

  >* {
    &:first-child {
      margin-left: 0.5rem;
      font-weight: 600;
    }
  }
`;

const ExtraButton = styled(Button)`
  margin: 0;
  width: 60px;
  height: 27px;
  font-size: 10px;
  font-weight: 400;

  ${(props) =>
    props.kakao &&
    css`
      width: 35px;
      height: 35px;
      border-radius: 2rem;
      color: black;
      background-color: #fee500;
      font-weight: 600;
    `}
`;

const EditMember = () => {
  return (
    <>
      <p>회원정보수정</p>
      <hr />
      <EditMemberLayout>
        <EditMemberBox first>
          <p>사진</p>
          <div>
            <Profile size='50px' />
            <p>
              회원님을 알릴 수 있는 사진을 등록해주세요. <br />
              등록된 사진은 회원님의 게시물이나 댓글에 사용됩니다.
            </p>
          </div>
          <ExtraButton sub>사진 변경</ExtraButton>
        </EditMemberBox>
        <hr />
        <EditMemberBox>
          <p>닉네임</p>
          <p>현재 닉네임</p>
          <ExtraButton sub>닉네임 변경</ExtraButton>
        </EditMemberBox>
        <hr />
        <EditMemberBox>
          <p>주소</p>
          <p>현재 주소</p>
          <ExtraButton sub>주소 변경</ExtraButton>
        </EditMemberBox>
        <hr />
        <EditMemberBox>
          <p>소셜연동</p>
          <ExtraButton kakao>K</ExtraButton>
        </EditMemberBox>
        <hr />
      </EditMemberLayout>
    </>
  );
};

export default EditMember;
