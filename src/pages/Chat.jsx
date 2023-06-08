import React from 'react';
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';

import { Profile } from '../components/UI/Profile';

const ChatLayout = styled.div`
  margin-top: 85px;
  height: 84vh;
  display: grid;
  grid-template-columns: 0.5fr 2fr;
`;

const ChatList = styled.ul`
  background-color: #f1f3f5;
  border: 1px solid #dee2e6;
`;

const ReceiverList = styled(Link)`
  color: #343a40;
  display: flex;
  padding: 0.8rem;
  border-bottom: 1px solid #dee2e6;
`;

const DetailBox = styled.div`
  width: 10.5rem;
  margin: auto;

  > div {
    display: flex;
    justify-content: space-between;
    > p:first-child {
      font-weight: 600;
    }
    > p:last-child {
      font-size: 0.85rem;
      color: #868e96;
    }
  }

  > p {
    margin-top: 0.575rem;
    font-size: 0.85rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ChatContent = styled.div`
  background-color: #f1f3f5;
  border: 1px solid #dee2e6;
`;

const Chat = () => {
  return (
    <ChatLayout>
      <ChatList>
        <ReceiverList to="/chat/messages">
          <Profile size="50px" />
          <DetailBox>
            <div>
              <p>대화상대1</p>
              <p>06.03</p>
            </div>
            <p>채팅 미리보기 최대 30자로 설정할 것</p>
          </DetailBox>
        </ReceiverList>
        <ReceiverList to="/chat/messages">
          <Profile size="50px" />
          <DetailBox>
            <div>
              <p>대화상대2</p>
              <p>06.01</p>
            </div>
            <p>대화내용 최대 30자 </p>
          </DetailBox>
        </ReceiverList>
      </ChatList>
      <ChatContent>
        <Outlet />
      </ChatContent>
    </ChatLayout>
  );
};

export default Chat;
