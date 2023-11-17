/* eslint-disable prefer-const */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';

import axios from 'axios';
import theme from '../../styles/theme';
import { Profile } from '../UI/Profile';

const ChatList = styled.ul`
  background-color: #f1f3f5;
  border: 1px solid #dee2e6;

  &.noneDisplay {
    display: none;
  }

  @media ${theme.tablet} {
    height: 78vh;
  }
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
  margin-left: 0.3rem;

  > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > p:last-child {
      font-size: 0.7rem;
      color: #868e96;
    }
  }

  > div:last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;

    > p {
      margin-left: 0.1rem;
      font-size: 0.85rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const NameBox = styled.div`
  margin-left: 0.1rem;
  font-size: 0.9rem;
  font-weight: 600;
`;

const Unread = styled.div`
  margin-left: 0.2rem;
  padding: 4px 6px;
  border-radius: 12px;
  background-color: ${({ unreadCount, updatedUnread, inChatRoom }) =>
    (unreadCount === 0 && updatedUnread === undefined) ||
    updatedUnread === 0 ||
    inChatRoom
      ? 'transparent'
      : '#ff3932'};

  > p {
    visibility: ${({ unreadCount, updatedUnread, inChatRoom }) =>
      (unreadCount === 0 && updatedUnread === undefined) ||
      updatedUnread === 0 ||
      inChatRoom
        ? 'hidden'
        : 'visible'};
    font-weight: 600;
    font-size: 0.7rem;
    color: white;
  }
`;

const ChatLists = ({
  url,
  auth,
  setHasChatRoom,
  exitStatus,
  setRead,
  setCorrectSender,
  setUserInfo,
  setEnteredUsers,
  setInChatRoom,
  setStompClient,
  setMessages,
  setUnreadMessages,
  onLoading,
  errorHandler,
  tokenErrorHandler,
}) => {
  const [chatList, setChatList] = useState([]);
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [showLatestMessage, setShowLatestMessage] = useState([]);

  const client = useRef(null);

  useEffect(() => {
    const initializeStompClient = () => {
      client.current = new StompJS.Client({
        brokerURL: `ws://localhost:8080/stomp/chat`,
        debug: str => {},
      });

      client.current.webSocketFactory = function () {
        return new SockJS(`${url}/stomp/chat`);
      };

      client.current.onConnect = async () => {
        console.log('채팅 목록 WebSocket 연결되었습니다.');
        setStompClient(client.current);

        fetchChatRooms();
      };

      client.current.onStompError = err => {
        errorHandler(err);
      };

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

        const initialEnteredStatus = {};
        responseData.forEach(chatRoom => {
          initialEnteredStatus[chatRoom.chatRoomId] = false;
        });
        setInChatRoom(initialEnteredStatus);

        const initialEnteredUsers = {};
        responseData.forEach(chatRoom => {
          initialEnteredUsers[chatRoom.chatRoomId] = [];
        });
        setEnteredUsers(initialEnteredUsers);

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

        setHasChatRoom(responseData.length === 0);

        responseData.forEach(chatRoom => {
          client.current.subscribe(
            `/subscribe/chat/${chatRoom.chatRoomId}`,
            onRoomRecieved(chatRoom.chatRoomId),
          );
        });

        onLoading(false);
      } catch (err) {
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

  useEffect(() => {
    if (exitStatus.status) {
      setChatList(prev =>
        prev.filter(chat => chat.chatRoomId !== exitStatus.chatRoomId),
      );
    }
  }, [exitStatus]);

  const openChatRoomHandler = (chat, chatRoomId) => {
    setUserInfo({
      user: chat.receiverNickname,
      userProfile: chat.receiverProfileImageUrl,
    });

    setActiveRoomId(chatRoomId);
    setInChatRoom(prev => {
      const updatedEnteredStatus = { ...prev };

      for (const key in prev) {
        const roomId = String(chatRoomId);

        if (key === roomId) {
          updatedEnteredStatus[key] = true;
        } else {
          updatedEnteredStatus[key] = false;
        }

        const chatRoomIds = chatList.map(room => room.chatRoomId);
        if (!chatRoomIds.includes(exitStatus.chatRoomId) && exitStatus.status) {
          delete updatedEnteredStatus[exitStatus.chatRoomId];
        }
      }

      return updatedEnteredStatus;
    });

    setEnteredUsers(prev => {
      const updatedUsers = { ...prev };

      for (const key in prev) {
        const roomId = String(chatRoomId);
        const usersInChatRoom = updatedUsers[key];

        if (key === roomId) {
          usersInChatRoom.push(auth.memberId);
        } else {
          if (usersInChatRoom.includes(auth.memberId)) {
            updatedUsers[key] = usersInChatRoom.filter(
              userId => userId !== auth.memberId,
            );
          }
        }
      }

      return updatedUsers;
    });

    setChatList(prevChatList => {
      return prevChatList.map(chat => {
        if (chat.chatRoomId === chatRoomId) {
          const updatedChat = {
            ...chat,
            unreadCount: 0,
            updatedUnreadCount: 0,
          };
          return updatedChat;
        }
        return chat;
      });
    });
  };

  const updateBadges = (read, chatRoomId, senderId) => {
    setChatList(prevChatList => {
      return prevChatList.map(chat => {
        if (chat.chatRoomId === chatRoomId) {
          let updatedUnreadCount = chat.updatedUnreadCount;

          if (senderId === chat.receiverId) {
            if (updatedUnreadCount === undefined) {
              updatedUnreadCount = chat.unreadCount + 1;
            } else if (updatedUnreadCount !== undefined && !read) {
              updatedUnreadCount += 1;
            } else {
              updatedUnreadCount = 0;
            }
          }

          return {
            ...chat,
            updatedUnreadCount,
          };
        }
        return chat;
      });
    });
  };

  let latestMessages = [];
  const onRoomRecieved = chatRoomId => message => {
    const messageBody = JSON.parse(message.body);
    const isCurrentUserInRoom = messageBody.chatRoomId === chatRoomId;

    if (messageBody.newMessage) {
      if (isCurrentUserInRoom) {
        setCorrectSender(messageBody.senderId !== auth.memberId);
        setMessages(prev => [...prev, messageBody]);
        setUnreadMessages(prev => [...prev, messageBody]);
        if (messageBody.senderId !== auth.memberId) {
          updateBadges(
            messageBody.read,
            messageBody.chatRoomId,
            messageBody.senderId,
          );
        }
      }

      const latestMessage =
        messageBody.type === 'IMAGE'
          ? '사진을 보냈습니다.'
          : messageBody.message;

      const latestMessageTime = messageBody.sendAt;

      const findMsgObjectIdx = latestMessages.findIndex(
        obj => obj.chatRoomId === messageBody.chatRoomId,
      );

      if (findMsgObjectIdx !== -1) {
        latestMessages[findMsgObjectIdx].message = latestMessage;
      } else {
        latestMessages.push({
          chatRoomId: messageBody.chatRoomId,
          message: latestMessage,
          date: latestMessageTime,
        });
      }

      setRead(messageBody.read);
      setShowLatestMessage(latestMessages);
    } else {
      setUnreadMessages(prev => {
        return prev.filter(
          unreadMsg => unreadMsg.chatRoomId === messageBody.chatRoomId,
        );
      });

      if (messageBody.senderId !== auth.memberId) {
        updateBadges(
          messageBody.read,
          messageBody.chatRoomId,
          messageBody.senderId,
        );
      }

      setRead(messageBody.read);
    }
  };

  const renderShowLatestMessage = chat => {
    const findMsgObject = showLatestMessage.find(
      obj => chat.chatRoomId === obj.chatRoomId,
    );

    let message, date;
    if (findMsgObject) {
      message = findMsgObject.message;
      date = findMsgObject.date;
    } else {
      if (chat.latestMessage.includes('billim.s3')) {
        message = '사진을 보냈습니다.';
      } else {
        message = chat.latestMessage;
        date = chat.latestMessageTime;
      }
    }
    return { message, date };
  };

  chatList.sort((a, b) => {
    const dateA = renderShowLatestMessage(a).date;
    const dateB = renderShowLatestMessage(b).date;
    return new Date(dateB) - new Date(dateA);
  });

  chatList.forEach(chat => {
    const { message, date } = renderShowLatestMessage(chat);

    if (chat.latestMessage !== message) {
      chat.latestMessage = message;
      chat.latestMessageTime = date;
    }
  });

  return (
    <ChatList className={chatList.length === 0 ? 'noneDisplay' : ''}>
      {chatList &&
        chatList.map(chat => {
          return (
            <ReceiverList
              to={`/chat/messages/${chat.chatRoomId}`}
              key={chat.chatRoomId}
              onClick={() => openChatRoomHandler(chat, chat.chatRoomId)}
            >
              <Profile size="50px" src={chat.receiverProfileImageUrl} />
              <DetailBox>
                <div>
                  <NameBox>
                    <p>{chat.receiverNickname}</p>
                  </NameBox>
                  <p>{renderShowLatestMessage(chat).date.slice(0, 10)}</p>
                </div>
                <div>
                  <p>{renderShowLatestMessage(chat).message}</p>
                  <Unread
                    unreadCount={chat.unreadCount}
                    updatedUnread={chat.updatedUnreadCount}
                    inChatRoom={chat.chatRoomId === activeRoomId}
                  >
                    <p>
                      {chat.chatRoomId !== activeRoomId &&
                      chat.updatedUnreadCount !== undefined
                        ? chat.updatedUnreadCount
                        : chat.unreadCount}
                    </p>
                  </Unread>
                </div>
              </DetailBox>
            </ReceiverList>
          );
        })}
    </ChatList>
  );
};

export default ChatLists;
