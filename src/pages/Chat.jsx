import React from 'react';
import styled from 'styled-components';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
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

const ReceiverList = styled.li`
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

const BlankChatBox = styled.div`
  margin: 11rem auto;
  text-align: center;

  > p {
    color: #868e96;
    font-size: 0.85rem;
    line-height: 1.2rem;
    > span {
      color: #495057;
      font-size: 1rem;
      font-weight: 600;
    }
  }
`;

const Chat = () => {
  return (
    <ChatLayout>
      <ChatList>
        <ReceiverList>
          <Profile size="50px" />
          <DetailBox>
            <div>
              <p>대화상대1</p>
              <p>06.03</p>
            </div>
            <p>채팅 미리보기 최대 30자로 설정할 것</p>
          </DetailBox>
        </ReceiverList>
        <ReceiverList>
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
        <BlankChatBox>
          <HiOutlineChatBubbleLeftRight size="80px" />
          <p>
            <span>대화 내역이 없습니다.</span> <br />
            대화 목록에서 상대를 선택하고 메시지를 주고받을 수 있습니다.
          </p>
        </BlankChatBox>
      </ChatContent>
    </ChatLayout>
  );
};

export default Chat;
