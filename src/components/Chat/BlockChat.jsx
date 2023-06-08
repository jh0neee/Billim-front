import React from 'react';
import styled from 'styled-components';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';

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

const BlockChat = () => {
  return (
    <BlankChatBox>
      <HiOutlineChatBubbleLeftRight size="80px" />
      <p>
        <span>대화 내역이 없습니다.</span> <br />
        대화 목록에서 상대를 선택하고 메시지를 주고받을 수 있습니다.
      </p>
    </BlankChatBox>
  );
};

export default BlockChat;
