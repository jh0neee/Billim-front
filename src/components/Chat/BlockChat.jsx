import React from 'react';
import styled from 'styled-components';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { PiWechatLogoDuotone as ChatIcon } from 'react-icons/pi';

const BlankChatBox = styled.div`
  margin: auto;
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const MainText = styled.span`
  color: #495057;
  font-size: 1rem;
  font-weight: 600;
`;

const BlankChatText = styled.p`
  color: #868e96;
  font-size: 0.85rem;
  line-height: 1.2rem;
`;

const NoListText = styled.p`
  color: #868e96;
  font-size: 0.85rem;
  line-height: 1.5rem;
`;

const HilightText = styled.span`
  color: #343a40;
  padding: 0.2rem 0.4rem;
  background-color: #ffffff;
  border-radius: 7px;
`;

const BlockChat = ({ hasChatRoom }) => {
  return (
    <BlankChatBox>
      {hasChatRoom ? (
        <NoListText>
          <MainText>채팅 내역이 없습니다!</MainText> <br />
          상세페이지, 마이페이지 등에서{' '}
          <HilightText>
            <ChatIcon />
            채팅하기
          </HilightText>
          를 클릭해 <br />
          공유/이용자와 채팅방을 생성할 수 있습니다.
        </NoListText>
      ) : (
        <>
          <HiOutlineChatBubbleLeftRight size="80px" />
          <BlankChatText>
            <MainText>대화 내역이 없습니다.</MainText> <br />
            대화 목록에서 상대를 선택하고 메시지를 주고받을 수 있습니다.
          </BlankChatText>
        </>
      )}
    </BlankChatBox>
  );
};

export default BlockChat;
