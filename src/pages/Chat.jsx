import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import BlockChat from '../components/Chat/BlockChat';
import MessageChat from '../components/Chat/MessageChat';
import ChatLists from '../components/Chat/ChatLists';
import ErrorModal from '../util/ErrorModal';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useLoadingError } from '../hooks/useLoadingError';

const ChatLayout = styled.div`
  margin-top: 85px;
  height: 84vh;
  display: grid;
  grid-template-columns: 0.5fr 2fr;
`;

const ChatContent = styled.div`
  background-color: #f1f3f5;
  border: 1px solid #dee2e6;
`;

const Chat = () => {
  const roomId = Number(useLocation().pathname.slice(15));
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <ChatLayout>
        {isLoading && <LoadingSpinner asOverlay />}
        <ChatLists
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
              stompClient={stompClient}
              messages={messages}
              setMessages={setMessages}
            />
          )}
        </ChatContent>
      </ChatLayout>
    </>
  );
};

export default Chat;
