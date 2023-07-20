import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

// import Input from '../UI/Input';
import Button from '../UI/Button';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';

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
  // const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const roomId = auth.memberId;
  const today = format(new Date(), 'yyyy년 MM월 dd일');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    if (roomId) {
      const socket = new SockJS(`http://localhost:8080/stomp/chat`);
      const client = Stomp.over(socket);
      client.debug = null;

      client.connect({}, () => {
        setStompClient(client);
        client.subscribe(`/subscribe/chat/${roomId}`, onMessageRecieved);
      });

      return () => {
        if (client) {
          client.disconnect();
        }
      };
    }
  }, [roomId]);

  const onMessageRecieved = message => {
    console.log(message);
    const messageBody = JSON.parse(message.body);
    setMessages(prevMsg => [...prevMsg, messageBody]);
  };

  const sendMessage = () => {
    let count = 0;
    if (inputText.trim() !== '') {
      const messageData = {
        chatRoomId: roomId,
        senderId: count++,
        message: inputText,
      };

      const headers = { Authorization: `Bearer ${auth.token}` };

      stompClient.send(`send/text`, headers, JSON.stringify(messageData));
    }
  };

  return (
    <MessageChatLayout>
      <MessageBox>
        <MessageDate>{today}</MessageDate>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      </MessageBox>
      <MessageInputBox>
        {/* <Input
          element="textarea"
          id="chatMessage"
          width="55rem"
          validators={[]}
          errorText={null}
          onInput={() => {}}
        /> */}
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <MessageButton onClick={sendMessage}>전송</MessageButton>
      </MessageInputBox>
    </MessageChatLayout>
  );
};

export default MessageChat;
