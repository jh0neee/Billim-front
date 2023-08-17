import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';

import axios from 'axios';
import { Profile } from '../UI/Profile';
import { useAuth } from '../../hooks/useAuth';
import { useTokenRefresher } from '../../hooks/useTokenRefresher';

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

const ChatLists = ({
  setStompClient,
  messages,
  setMessages,
  onLoading,
  errorHandler,
}) => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const [chatList, setChatList] = useState([]);
  const [showLatestMessage, setShowLatestMessage] = useState('');
  const { tokenErrorHandler } = useTokenRefresher(auth);

  // const { chatRoomId } = useParams();

  const client = useRef(null);

  // console.log(useParams(), chatRoomId);

  useEffect(() => {
    const initializeStompClient = () => {
      client.current = new StompJS.Client({
        brokerURL: `ws://localhost:8080/stomp/chat`,
      });

      client.current.webSocketFactory = function () {
        return new SockJS('http://3.36.154.178:8080/stomp/chat');
      };

      client.current.onConnect = async () => {
        console.log('채팅 목록 WebSocket 연결되었습니다.');
        setStompClient(client.current);

        fetchChatRooms();
      };

      console.log('7번');
      client.current.onStompError = err => {
        console.log(err);
        errorHandler(err);
      };

      console.log('8번');
      console.log('Activating Stomp client...');
      client.current.activate();
    };

    const fetchChatRooms = async () => {
      try {
        onLoading(true);
        const response = await axios.get(`${url}/api/chat/rooms`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          params: {
            buyerId: auth.memberId,
          },
        });

        const responseData = await response.data;

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
          return updatedChatList;
        });

        responseData.forEach(chatRoom => {
          client.current.subscribe(
            `/subscribe/chat/${chatRoom.chatRoomId}`,
            onRoomRecieved(chatRoom.chatRoomId),
          );
          console.log(`채팅방 구독 설정 완료 - 방 ID: ${chatRoom.chatRoomId}`);
        });

        onLoading(false);
      } catch (err) {
        // console.log(err);
        // console.log('Error fetching chat rooms:', err);
        if (
          err.response.status === 401 &&
          err.response.data.code !== 'INVALID_EMAIL_PASSWORD'
        ) {
          tokenErrorHandler(err);
          onLoading(false);
        } else {
          errorHandler(err);
        }
      }
    };

    initializeStompClient();

    return () => {
      console.log('채팅 목록 WebSocket 연결이 해제되었습니다.');
      client.current.deactivate();
    };
  }, []);

  const onRoomRecieved = chatRoomId => message => {
    const messageBody = JSON.parse(message.body);
    // console.log('onRoomReceived 호출됨:', messageBody);
    if (messageBody.newMessage === true) {
      console.log('입장했습니다: ', messageBody);
      // console.log(messageBody, messageBody.chatRoomId, roomId);
      setShowLatestMessage(messageBody);
      console.log(messageBody.chatRoomId, chatRoomId);
      if (messageBody.chatRoomId === chatRoomId) {
        setMessages(prev => [...prev, messageBody]);
      }
    }
  };

  console.log(showLatestMessage);
  console.log(chatList);
  console.log('messages: ', messages);

  return (
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
                  <p>
                    {chat.receiverNickname}({chat.chatRoomId})
                  </p>
                  <Unread unread={chat.unreadCount}>
                    <p>{chat.unreadCount}</p>
                  </Unread>
                </NameBox>
                <p>{chat.latestMessageTime.slice(0, 10)}</p>
              </div>
              <p>
                {chat.chatRoomId === showLatestMessage.chatRoomId &&
                showLatestMessage !== ''
                  ? showLatestMessage.message
                  : chat.latestMessage}
              </p>
            </DetailBox>
          </ReceiverList>
        ))}
    </ChatList>
  );
};

export default ChatLists;
