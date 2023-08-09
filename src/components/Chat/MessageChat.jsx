import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';

import axios from 'axios';
import Input from '../UI/Input';
import parseISO from 'date-fns/parseISO';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { chatAction } from '../../store/chat';
import { useLocation } from 'react-router-dom';
import { CiPaperplane } from 'react-icons/ci';
import { FcAddImage } from 'react-icons/fc';
import { useLoadingError } from '../../hooks/useLoadingError';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import { useTokenRefresher } from '../../hooks/useTokenRefresher';
import { ImageInput } from '../UI/ImageUpload';

const MessageChatLayout = styled.form`
  height: 84vh;
`;

const MessageBox = styled.div`
  padding: 1rem;
  height: 85%;
  background-color: rgba(252, 211, 77, 0.7);
  overflow-y: auto;
`;

const MessageDate = styled.p`
  margin: 10px auto;
  padding: 0.5rem;
  width: 9.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 2rem;
  text-align: center;
  font-size: 0.85rem;
`;

const StartMessage = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: #343a40;
  font-size: 0.85rem;
`;

const MessageInputBox = styled.div`
  display: flex;
  height: 15%;
  padding: 0 1.3rem;
  align-items: center;
  justify-content: space-between;
`;

const MessageButton = styled.button`
  width: 30px;
  height: 30px;
`;

const ChatBoxLayout = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
`;

const MessageContainer = styled.div`
  width: fit-content;
  align-self: ${props => (props.isSent ? 'flex-end' : 'flex-start')};
  display: flex;
  align-items: flex-end;
  font-family: 'TRoundWind';

  > p {
    margin: 0 0 0.5rem;
    font-size: 10px;
  }
`;

const ChatMessageBox = styled.div`
  padding: 0.8rem;
  margin: 0.5rem;
  border-radius: 20px;
  background-color: ${props => (props.isSent ? '#003cff' : 'white')};
  color: ${props => (props.isSent ? 'white' : 'black')};
  align-self: ${props => (props.isSent ? 'flex-end' : 'flex-start')};
  word-wrap: break-word;
  max-width: 300px;
  line-height: 1.5;
`;

const ChatReadTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.isSent ? 'flex-end' : 'flex-start')};
`;

const ChatRead = styled.p`
  margin: ${props => (props.hasTime ? '0 0 0.2rem' : '0 0 0.7rem')};
  color: goldenrod;
  font-size: 12px;
`;

const ChatTime = styled.p`
  margin: 0 0 0.5rem;
  font-size: 10px;
`;

const MessageChat = () => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const dispatch = useDispatch();
  const chatRoomId = useLocation().pathname.slice(15);
  const fileRef = useRef(null);
  const [currentDate, setCurrentDate] = useState('');
  const [resetInput, setResetInput] = useState(false);
  const [startMessage, setStartMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [pastMessages, setPastMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [formState, inputHandler] = useForm({}, false);
  const { tokenErrorHandler } = useTokenRefresher(auth);
  const { onLoading, errorHandler } = useLoadingError();

  useEffect(() => {
    const messageBox = document.getElementById('message-box');
    messageBox.scrollTop = messageBox.scrollHeight;
  }, [messages, pastMessages]);

  useEffect(() => {
    if (!chatRoomId) {
      return;
    }

    axios
      .get(`${url}/api/chat/messages/${chatRoomId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then(response => {
        const messageData = response.data;
        console.log(messageData);
        const firstDate = format(
          parseISO(messageData[0].sendAt),
          'yyyy년 MM월 dd일',
        );
        setCurrentDate(firstDate);
        setStartMessage(messageData[0].message);
        setPastMessages(messageData.slice(1));
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

    const client = new StompJS.Client({
      brokerURL: `ws://localhost:8080/stomp/chat`,
    });

    client.webSocketFactory = function () {
      return new SockJS('http://3.36.154.178:8080/stomp/chat');
    };

    client.onConnect = () => {
      console.log('WebSocket 연결되었습니다.');
      setStompClient(client);
      client.subscribe(`/subscribe/chat/${chatRoomId}`, onMessageRecieved);
    };

    client.onStompError = err => {
      errorHandler(err);
    };

    client.activate();

    return () => {
      if (client) {
        client.deactivate();
        console.log('WebSocket 연결이 해제되었습니다.');
      }
    };
  }, [chatRoomId]);

  const onMessageRecieved = message => {
    const messageBody = JSON.parse(message.body);
    console.log('메시지를 받았습니다:', messageBody);
    setMessages(prevMsg => [...prevMsg, messageBody]);
  };

  const encodeFileToBase64 = image => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => resolve(e.target.result);
      reader.onerror = err => reject(err);
    });
  };

  const pickImageHandler = () => {
    fileRef.current.click();
  };

  const fileChangeHandler = e => {
    const chatImage = e.target.files[0];
    console.log(chatImage);
    encodeFileToBase64(chatImage).then(data => {
      if (stompClient) {
        console.log('이미지 전송 중:', data);
        const messageData = {
          chatRoomId,
          senderId: auth.memberId,
          messages: data,
        };

        const headers = {
          'content-type': 'application/octet-stream',
          Authorization: `Bearer ${auth.token}`,
        };

        console.log('전송할 이미지 데이터:', JSON.stringify(messageData));
        stompClient.publish({
          destination: `/publish/send/image`,
          body: JSON.stringify(messageData),
          headers,
        });

        dispatch(
          chatAction.changeMsg({
            chatRoomId: Number(chatRoomId),
            message: '사진을 보냈습니다.',
          }),
        );
      }
    });
  };

  const sendMessage = () => {
    if (stompClient) {
      console.log('텍스트 메시지 전송 중:', formState.inputs.message.value);
      const messageData = {
        chatRoomId,
        senderId: auth.memberId,
        message: formState.inputs.message.value,
      };
      const headers = { Authorization: `Bearer ${auth.token}` };
      console.log('전송할 텍스트 메시지 데이터:', JSON.stringify(messageData));
      stompClient.publish({
        destination: `/publish/send/text`,
        body: JSON.stringify(messageData),
        headers,
      });

      dispatch(
        chatAction.changeMsg({
          chatRoomId: Number(chatRoomId),
          message: formState.inputs.message.value,
        }),
      );
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    sendMessage();
    setResetInput(true);
  };

  const convertToAmPmFormat = createdAt => {
    const date = new Date(createdAt);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const meridiem = hour >= 12 ? 'pm' : 'am';
    const convertedHour = hour % 12 || 12;

    return `${meridiem} ${convertedHour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}`;
  };

  const formatDate = createdAt => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일`;
  };

  const MessageLists = (messages, msg, index) => {
    const isSentByUser = msg.senderId === auth.memberId;
    const timeValue = convertToAmPmFormat(msg.sendAt);
    const nextMessage = messages[index + 1];

    const isSameTimeAsNext =
      nextMessage &&
      msg.sendAt.slice(11, 16) === nextMessage.sendAt.slice(11, 16);

    const isSameDateAsNext =
      nextMessage &&
      msg.sendAt.slice(0, 10) !== nextMessage.sendAt.slice(0, 10);

    return (
      <React.Fragment key={msg.messageId}>
        {isSameDateAsNext && (
          <MessageDate>
            {formatDate(nextMessage.sendAt.slice(0, 10))}
          </MessageDate>
        )}
        <MessageContainer isSent={isSentByUser}>
          {isSentByUser && (
            <ChatReadTime isSent={isSentByUser}>
              <ChatRead hasTime={!isSameTimeAsNext}>
                {!msg.read && '1'}
              </ChatRead>
              {!isSameTimeAsNext && <ChatTime>{timeValue}</ChatTime>}
            </ChatReadTime>
          )}
          <ChatMessageBox isSent={isSentByUser}>
            <p>{msg.message}</p>
          </ChatMessageBox>
          {!isSentByUser && (
            <ChatReadTime isSent={isSentByUser}>
              <ChatRead hasTime={!isSameTimeAsNext}>
                {!msg.read && '1'}
              </ChatRead>
              {!isSameTimeAsNext && <ChatTime>{timeValue}</ChatTime>}
            </ChatReadTime>
          )}
        </MessageContainer>
      </React.Fragment>
    );
  };

  const renderPastMessages = () => {
    return pastMessages.map((msg, index) =>
      MessageLists(pastMessages, msg, index),
    );
  };

  const renderMessages = () => {
    return messages.map((msg, index) => MessageLists(messages, msg, index));
  };

  return (
    <MessageChatLayout onSubmit={submitHandler}>
      <MessageBox id="message-box">
        <MessageDate>{currentDate}</MessageDate>
        <StartMessage>{startMessage}</StartMessage>
        <ChatBoxLayout>
          {renderPastMessages()}
          {renderMessages()}
        </ChatBoxLayout>
      </MessageBox>
      <MessageInputBox>
        <FcAddImage size="30px" onClick={pickImageHandler} />
        <ImageInput type="file" ref={fileRef} onChange={fileChangeHandler} />
        <Input
          element="textarea"
          type="text"
          id="message"
          rows={2}
          width="55rem"
          reset={resetInput}
          setReset={setResetInput}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={null}
          onInput={inputHandler}
        />
        <MessageButton type="submit">
          <CiPaperplane size="30px" />
        </MessageButton>
      </MessageInputBox>
    </MessageChatLayout>
  );
};

export default MessageChat;
