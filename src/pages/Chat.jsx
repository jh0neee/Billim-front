import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import theme from '../styles/theme';
import BlockChat from '../components/Chat/BlockChat';
import MessageChat from '../components/Chat/MessageChat';
import ChatLists from '../components/Chat/ChatLists';
import ErrorModal from '../util/ErrorModal';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useLoadingError } from '../hooks/useLoadingError';

const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const ChatLayout = styled.div`
  margin-top: 85px;
  width: 100%;
  max-width: 1250px;
  height: 84vh;
  display: grid;
  grid-template-columns: 0.5fr 2fr;

  @media ${theme.tablet} {
    margin-top: 150px;
    height: 78vh;
  }
`;

const ChatContent = styled.div`
  background-color: #f1f3f5;
  border: 1px solid #dee2e6;

  @media ${theme.tablet} {
    overflow: hidden;
  }
`;

const Chat = () => {
  const roomId = Number(useLocation().pathname.slice(15));
  const [messages, setMessages] = useState([]);
  const [enteredUsers, setEnteredUsers] = useState({});
  const [inChatRoom, setInChatRoom] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [correctSender, setCorrectSender] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <ChatContainer>
        <ChatLayout>
          {isLoading && <LoadingSpinner asOverlay />}
          <ChatLists
            setCorrectSender={setCorrectSender}
            setUserInfo={setUserInfo}
            setEnteredUsers={setEnteredUsers}
            setInChatRoom={setInChatRoom}
            setStompClient={setStompClient}
            messages={messages}
            setMessages={setMessages}
            onLoading={onLoading}
            errorHandler={errorHandler}
          />
          <ChatContent>
            {!roomId ? (
              <BlockChat />
            ) : (
              <MessageChat
                correctSender={correctSender}
                userInfo={userInfo}
                enteredUsers={enteredUsers}
                inChatRoom={inChatRoom}
                stompClient={stompClient}
                messages={messages}
                setMessages={setMessages}
              />
            )}
          </ChatContent>
        </ChatLayout>
      </ChatContainer>
    </>
  );
};

export default Chat;
