import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import axios from 'axios';
import ErrorModal from '../util/ErrorModal';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { Profile } from '../components/UI/Profile';
import { useAuth } from '../hooks/useAuth';
import { useLoadingError } from '../hooks/useLoadingError';
import { useTokenRefresher } from '../hooks/useTokenRefresher';

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

const NameBox = styled.div`
  display: flex;
  align-items: center;
`;

const Unread = styled.div`
  margin-left: 0.2rem;
  padding: 4px;
  border-radius: 10px;
  background-color: ${props => (props.unread !== 0 ? '#ff3932' : 'none')};

  > p {
    visibility: ${props => (props.unread !== 0 ? 'visible' : 'hidden')};
    font-family: TRoundWind;
    font-size: 0.5rem;
    color: white;
    margin: 0 1.5px;
  }
`;

const ChatContent = styled.div`
  background-color: #f1f3f5;
  border: 1px solid #dee2e6;
`;

const Chat = () => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const updateMsgChatRoomId = useSelector(state => state.chat.chatRoomId);
  const updateMessage = useSelector(state => state.chat.message);
  const [chatList, setChatList] = useState([]);
  const [showLatestMessage, setShowLatestMessage] = useState(false);
  const { tokenErrorHandler } = useTokenRefresher(auth);
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();

  useEffect(() => {
    onLoading(true);
    axios
      .get(`${url}/api/chat/rooms`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          buyerId: auth.memberId,
        },
      })
      .then(response => {
        const responseData = response.data;
        setChatList(prevChatList => {
          const chatRoomIds = prevChatList.map(chat => chat.chatRoomId);
          const newChats = responseData.filter(
            chat => !chatRoomIds.includes(chat.chatRoomId),
          );
          const updatedChatList = [...prevChatList, ...newChats];
          updatedChatList.sort(
            (a, b) =>
              new Date(b.latestMessageTime) - new Date(a.latestMessageTime),
          );
          onLoading(false);
          return updatedChatList;
        });
      })
      .catch(err => {
        if (
          err.response.status === 401 &&
          err.response.data.code !== 'INVALID_EMAIL_PASSWORD'
        ) {
          tokenErrorHandler(err);
          onLoading(false);
        } else {
          errorHandler(err);
        }
      });
  }, []);

  useEffect(() => {
    setShowLatestMessage(true);
  }, [updateMessage]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <ChatLayout>
        {isLoading && <LoadingSpinner asOverlay />}
        <ChatList>
          {!chatList && (
            <ReceiverList>채팅 내역이 없습니다! 시작해보세요!</ReceiverList>
          )}
          {chatList &&
            chatList.map(chat => (
              <ReceiverList
                to={`/chat/messages/${chat.chatRoomId}`}
                key={chat.chatRoomId}
              >
                <Profile size="50px" src={chat.receiverProfileImageUrl} />
                <DetailBox>
                  <div>
                    <NameBox>
                      <p>{chat.receiverNickname}</p>
                      <Unread unread={chat.unreadCount}>
                        <p>{chat.unreadCount}</p>
                      </Unread>
                    </NameBox>
                    <p>{chat.latestMessageTime.slice(0, 10)}</p>
                  </div>
                  <p>
                    {chat.chatRoomId === updateMsgChatRoomId &&
                    showLatestMessage
                      ? updateMessage
                      : chat.latestMessage}
                  </p>
                </DetailBox>
              </ReceiverList>
            ))}
        </ChatList>
        <ChatContent>
          <Outlet />
        </ChatContent>
      </ChatLayout>
    </>
  );
};

export default Chat;
