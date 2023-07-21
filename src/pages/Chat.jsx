import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';

import axios from 'axios';
import exampleImage from '../asset/image/exampleImage.jpg';
import { Profile } from '../components/UI/Profile';
import { useAuth } from '../hooks/useAuth';
import { useLoadingError } from '../hooks/useLoadingError';
import ErrorModal from '../util/ErrorModal';
import LoadingSpinner from '../components/UI/LoadingSpinner';

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
  background-color: #ff3932;
  > p {
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
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();
  const [chatList, setChatList] = useState([
    {
      chatRoomId: 1,
      receiverId: 1,
      receiverNickname: '판매자',
      receiverProfileImageUrl:
        'https://billim.s3.ap-northeast-2.amazonaws.com/profile/profile-default.png',
      unreadCount: 25,
      latestMessage: '마지막 메시지',
      latestMessageTime: '2023-07-21',
    },
    {
      chatRoomId: 2,
      receiverId: 2,
      receiverNickname: '판매자2',
      receiverProfileImageUrl: exampleImage,
      unreadCount: 2,
      latestMessage: '감사합니다',
      latestMessageTime: '2023-07-25',
    },
  ]);

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
        console.log(response.data);
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
        errorHandler(err);
      });
  }, []);

  console.log(chatList);

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
                      <Unread>
                        <p>
                          {chat.unreadCount !== 0 ? chat.unreadCount : null}
                        </p>
                      </Unread>
                    </NameBox>
                    <p>{chat.latestMessageTime}</p>
                  </div>
                  <p>{chat.latestMessage}</p>
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
