import React from 'react';
import styled from 'styled-components';
import Input from '../UI/Input';
import Button from '../UI/Button';

const MessageChatLayout = styled.div`
  height: 84vh;
`;

const MessageBox = styled.div`
  padding: 1rem;
  height: 80%;
  background-color: rgba(252, 211, 77, 0.7);
`;

const MessageDate = styled.p`
  margin: 0 auto;
  padding: 0.5rem;
  width: 9.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 2rem;
  text-align: center;
  font-size: 0.85rem;
`;

const MessageInputBox = styled.div`
  display: flex;
  height: 20%;
  padding: 0 1rem;
  align-items: center;
  justify-content: space-between;
`;

const MessageButton = styled(Button)`
  width: 10%;
  height: 73%;
`;

const MessageChat = () => {
  return (
    <MessageChatLayout>
      <MessageBox>
        <MessageDate>2023년 06월 11일</MessageDate>
      </MessageBox>
      <MessageInputBox>
        <Input
          element="textarea"
          id="chatMessage"
          width="55rem"
          validators={[]}
          errorText={null}
          onInput={() => {}}
        />
        <MessageButton type="submit">전송</MessageButton>
      </MessageInputBox>
    </MessageChatLayout>
  );
};

export default MessageChat;
