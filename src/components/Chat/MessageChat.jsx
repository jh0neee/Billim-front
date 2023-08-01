import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

import axios from 'axios';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { VALIDATOR_REQUIRE } from '../../util/validators';

const MessageChatLayout = styled.form`
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

const StartMessage = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: #343a40;
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
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const chatRoomId = useLocation().pathname.slice(15);
  const today = format(new Date(), 'yyyy년 MM월 dd일');
  const [startMessage, setStartMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [formState, inputHandler] = useForm({}, false);

  useEffect(() => {
    axios
      .get(`${url}/api/chat/messages/${chatRoomId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then(response => {
        console.log(response);
        setStartMessage(response.data[0].message);
      })
      .catch(err => console.log(err));

    if (chatRoomId) {
      const socket = new SockJS(`http://localhost:8080/stomp/chat`);
      const client = Stomp.over(socket);

      client.connect({}, () => {
        setStompClient(client);
        client.subscribe(`/subscribe/chat/${chatRoomId}`, onMessageRecieved);
      });

      return () => {
        if (client) {
          client.disconnect();
        }
      };
    }
  }, [chatRoomId]);

  const onMessageRecieved = message => {
    console.log(message);
    const messageBody = JSON.parse(message.body);
    setMessages(prevMsg => [...prevMsg, messageBody]);
  };

  const sendMessage = () => {
    if (stompClient) {
      const messageData = {
        chatRoomId,
        senderId: auth.memberId,
        message: formState.inputs.message.value,
      };
      console.log(messageData);
      const headers = { Authorization: `Bearer ${auth.token}` };
      stompClient.send(
        `/publish/send/text`,
        headers,
        JSON.stringify(messageData),
      );
    } else {
      console.log(
        'WebSocket 연결 실패: stompClient가 아직 설정되지 않았습니다.',
      );
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <MessageChatLayout onSubmit={submitHandler}>
      <MessageBox>
        <MessageDate>{today}</MessageDate>
        <StartMessage>{startMessage}</StartMessage>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      </MessageBox>
      <MessageInputBox>
        <Input
          element="textarea"
          id="message"
          width="55rem"
          validators={[VALIDATOR_REQUIRE()]}
          errorText={null}
          onInput={inputHandler}
        />
        <MessageButton type="submit">전송</MessageButton>
      </MessageInputBox>
    </MessageChatLayout>
  );
};

export default MessageChat;
