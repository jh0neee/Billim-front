import React from 'react';
import styled from 'styled-components';

import { Profile } from '../UI/Profile';

const UserParagraphBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 1rem;
  padding-left: 1rem;

  > * {
    &:last-child {
      display: flex;
      margin-top: 0.5rem;
    }
  }
`;

const MyPageUser = () => {
  return (
    <div>
      <Profile size="130px" />
      <UserParagraphBox>
        <p>닉네임</p>
        <div>
          <p>LV.</p>
          <p>가입일</p>
        </div>
      </UserParagraphBox>
    </div>
  );
};

export default MyPageUser;
