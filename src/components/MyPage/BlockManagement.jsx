import React from 'react';
import styled from 'styled-components';

import Button from '../UI/Button';
import { Profile } from '../UI/Profile';
import { review } from '../../data';

const BlockLayout = styled.div`
  margin: 0.5rem 0;
`;

const BlockItemBox = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BlockTopBox = styled.div`
  display: flex;
  align-items: center;
`;

const BlockBottomBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const BlockItemTextBox = styled.div`
  margin-left: 1.5rem;
  font-size: 0.8rem;

  > * {
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.2rem 0;

    &:last-child {
      padding-top: 0.3rem;
    }
  }
`;

const ExtraButton = styled(Button)`
  width: 60px;
  height: 27px;
  font-size: 10px;
  font-weight: 400;
`;

const BlockManagement = () => {
  return (
    <>
      <p>차단관리</p>
      <BlockLayout>
        {review.map(item => (
          <BlockItemBox key={item.id}>
            <BlockTopBox>
              <Profile size="50px" />
              <BlockItemTextBox>
                <p>{item.username}</p>
                <p>차단일자 : {item.date}</p>
              </BlockItemTextBox>
            </BlockTopBox>
            <BlockBottomBox>
              <ExtraButton>차단해제</ExtraButton>
            </BlockBottomBox>
          </BlockItemBox>
        ))}
      </BlockLayout>
    </>
  );
};

export default BlockManagement;
