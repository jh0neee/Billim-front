import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import Input from '../UI/Input';
import parseISO from 'date-fns/parseISO';
import AWS from 'aws-sdk';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';

import theme from '../../styles/theme';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { Profile } from '../UI/Profile';
import { ImageInput } from '../UI/ImageUpload';
import { useLocation } from 'react-router-dom';
import { useLoadingError } from '../../hooks/useLoadingError';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import { useTokenRefresher } from '../../hooks/useTokenRefresher';
import { PiImagesLight, PiPaperPlaneRightLight } from 'react-icons/pi';

const MessageChatLayout = styled.form`
  height: 84vh;
`;

const MessageBox = styled.div`
  position: relative;
  padding: 1rem;
  height: calc(84vh - 145.6px);
  background-color: white;
  overflow-y: auto;
  overflow-x: hidden;

  @media ${theme.tablet} {
    height: calc(100vh - 299.8px);
  }
`;

const MessageDate = styled.p`
  margin: 10px auto;
  padding: 0.5rem;
  width: 9.5rem;
  border: 1px solid rgb(222, 226, 230);
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

const ProductBox = styled.div`
  display: flex;
  padding: 0px 3rem 0 1.3rem;
  align-items: center;
  justify-content: space-between;
  height: 75.6px;
  background-color: white;
  border-bottom: 1px solid rgb(222, 226, 230);

  > div:first-child {
    display: flex;
    align-items: center;
    > p {
      margin-left: 0.3rem;
    }
  }
  > div:last-child {
    display: flex;
  }
`;

const MessageInputBox = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  padding: 0 1.3rem;
  align-items: center;
  justify-content: space-between;
  background-color: white;
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
  background-color: ${props => (props.isSent ? '#9BBEE7' : '#FFF6E5')};
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

const ChatUserProfile = styled.div`
  align-self: center;
`;

const ChatImageMessage = styled.img`
  width: 50px;
  height: 50px;
`;

const PreviewBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 52vh;
  object-fit: contain;
`;

const ProductInfoContent = styled.div`
  margin-left: 0.5rem;
  margin-top: 0.3rem;
  > * {
    font-size: 0.8rem;

    &:last-child {
      margin-top: 0.5rem;
      font-weight: 600;
    }
  }
`;

const ProductInfoImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: fill;
  border-radius: 3px;
`;

const UserProfile = styled(Profile)`
  border: 1px solid rgb(222, 226, 230);
`;

const MessageInput = styled(Input)`
  max-width: auto;
  width: 100%;
  display: flex;
  justify-content: center;

  > input {
    width: 90%;
    border-radius: 0px;
    border-top: 1px solid rgb(222, 226, 230);
    border-bottom: 1px solid rgb(222, 226, 230);
    border-left: none;
    border-right: none;
  }
`;

const MessageChat = ({
  correctSender,
  userInfo,
  enteredUsers,
  inChatRoom,
  stompClient,
  messages,
  setMessages,
}) => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const fileRef = useRef(null);
  const chatRoomId = useLocation().pathname.slice(15);
  const [inRoomId, setInRoomId] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [resetInput, setResetInput] = useState(false);
  const [startMessage, setStartMessage] = useState('');
  const [pastMessages, setPastMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [productInfo, setProductInfo] = useState({});
  const [formState, inputHandler] = useForm({}, false);
  const { tokenErrorHandler } = useTokenRefresher(auth);
  const { onLoading, errorHandler } = useLoadingError();

  const [sendImageModal, setSendImageModal] = useState(false);
  const cancelSendImage = () => {
    setSendImageModal(false);
    setSelectedFile(null);
  };

  useEffect(() => {
    const messageBox = document.getElementById('message-box');
    messageBox.scrollTop = messageBox.scrollHeight;
  }, [messages, pastMessages]);

  const getProductInfo = () => {
    axios
      .get(`${url}/api/chat/product-info/${chatRoomId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then(response => {
        setProductInfo(response.data);
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
  };

  useEffect(() => {
    if (!chatRoomId) {
      return;
    }

    setMessages([]);

    axios
      .get(`${url}/api/chat/messages/${chatRoomId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then(response => {
        const messageData = response.data;
        getProductInfo();
        const firstDate = format(
          parseISO(messageData[0].sendAt),
          'yyyy년 MM월 dd일',
        );
        setInRoomId(messageData[0].chatRoomId);
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
  }, [chatRoomId]);

  const BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME;
  const REGION = process.env.REACT_APP_REGION;
  const ACCESS_KEY = process.env.REACT_APP_ACCESS;
  const SECRET_KEY = process.env.REACT_APP_SECRET;

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
    region: REGION,
  });

  const pickImageHandler = () => {
    fileRef.current.click();
  };

  const convertImageToBase64 = imageFile => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageSelection = async event => {
    const selectedImage = event.target.files[0];

    setSelectedFile(selectedImage);

    if (selectedImage) {
      const base64Image = await convertImageToBase64(selectedImage);
      setPreviewFile(base64Image);
    }
    setSendImageModal(true);
  };

  const handleUpload = file => {
    const s3 = new AWS.S3();

    const params = {
      Bucket: BUCKET_NAME,
      Key: `chat/${file.name}`,
      Body: file,
      ACL: 'public-read',
      ContentType: file.type,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        errorHandler(err);
      } else {
        sendMessage(data.Location);
      }
    });
  };

  const sendMessage = imageUrl => {
    if (!formState.inputs.message.value) {
      alert('메시지 입력해주세요');
      return;
    }

    const headers = { Authorization: `Bearer ${auth.token}` };

    if (stompClient) {
      if (selectedFile) {
        const messageData = {
          chatRoomId,
          senderId: auth.memberId,
          encodedImage: imageUrl,
        };

        stompClient.publish({
          destination: `/publish/send/image`,
          body: JSON.stringify(messageData),
          headers,
        });

        setSendImageModal(false);
        setSelectedFile(null);
      } else {
        const messageData = {
          chatRoomId,
          senderId: auth.memberId,
          message: formState.inputs.message.value,
        };

        stompClient.publish({
          destination: `/publish/send/text`,
          body: JSON.stringify(messageData),
          headers,
        });
      }
    }
  };

  const convertToAmPmFormat = createdAt => {
    const date = new Date(createdAt);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const meridiem = hour >= 12 ? '오후' : '오전';
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

  const readMessage = msg => {
    let exam;

    for (const key in inChatRoom) {
      if (inChatRoom[key] && Number(key) === msg.chatRoomId) {
        axios.post(
          `${url}/api/chat/message/read`,
          {
            chatRoomId: msg.chatRoomId,
            messageId: msg.messageId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.token}`,
            },
          },
        );
        return (exam = true);
      } else {
        exam = false;
      }
    }
    return exam;
  };

  const MessageLists = (messages, msg, index, messageType, read) => {
    const isSentByRoom = msg.chatRoomId === Number(chatRoomId);
    const isSentByUser = msg.senderId === auth.memberId;
    const timeValue = convertToAmPmFormat(msg.sendAt);
    const nextMessage = messages[index + 1];
    const prevMessage = messages[index - 1];

    const trueNewMessage = msg.newMessage;
    const pastMessages = messageType === 'pastMessage' && !msg.newMessage;
    const currentMessages = messageType === 'currentMessage' && msg.newMessage;

    const isDifferentUser =
      prevMessage && prevMessage?.senderId !== msg.senderId;

    const isSameTimeAsNext =
      nextMessage &&
      msg.sendAt.slice(11, 16) === nextMessage.sendAt.slice(11, 16);

    const isSameDateAsNext =
      prevMessage &&
      msg.sendAt.slice(0, 10) !== prevMessage?.sendAt.slice(0, 10);

    const renderChatMessage = () => {
      return (
        <React.Fragment key={msg.messageId}>
          {isSameDateAsNext && (
            <MessageDate>
              {formatDate(prevMessage?.sendAt.slice(0, 10))}
            </MessageDate>
          )}
          <MessageContainer isSent={isSentByUser}>
            {isSentByUser && (
              <ChatReadTime isSent={isSentByUser}>
                <ChatRead hasTime={!isSameTimeAsNext}>{!read && '1'}</ChatRead>
                {!isSameTimeAsNext && <ChatTime>{timeValue}</ChatTime>}
              </ChatReadTime>
            )}
            {!isSentByUser && (
              <ChatUserProfile>
                {isDifferentUser || !isSameTimeAsNext ? (
                  <UserProfile size="40px" src={userInfo.userProfile} />
                ) : (
                  <div style={{ marginLeft: '40px' }} />
                )}
              </ChatUserProfile>
            )}
            <ChatMessageBox isSent={isSentByUser}>
              {msg.message.includes(`${BUCKET_NAME}.s3`) ? (
                <ChatImageMessage src={msg.message} alt="채팅이미지" />
              ) : (
                <p>{`[${msg.messageId}] ${msg.message}`}</p>
              )}
            </ChatMessageBox>
            {!isSentByUser && (
              <ChatReadTime isSent={isSentByUser}>
                <ChatRead hasTime={!isSameTimeAsNext}>{!read && '1'}</ChatRead>
                {!isSameTimeAsNext && <ChatTime>{timeValue}</ChatTime>}
              </ChatReadTime>
            )}
          </MessageContainer>
        </React.Fragment>
      );
    };

    if (isSentByRoom) {
      if (pastMessages) {
        return renderChatMessage();
      } else if (currentMessages) {
        return trueNewMessage && renderChatMessage();
      }
    }
  };

  const renderPastMessages = () => {
    return pastMessages.map((msg, index) => {
      let read;
      if (!correctSender) {
        read = true;
      } else {
        read = msg.read;
      }
      return MessageLists(pastMessages, msg, index, 'pastMessage', read);
    });
  };

  const renderMessages = () => {
    return messages.map((msg, index) => {
      let read;
      if (msg.newMessage) {
        read = readMessage(msg);
      }
      return MessageLists(messages, msg, index, 'currentMessage', read);
    });
  };

  const submitHandler = e => {
    e.preventDefault();
    if (Number(chatRoomId) === inRoomId) {
      sendMessage();
      setResetInput(true);
    }
  };

  return (
    <>
      <Modal
        show={sendImageModal}
        header="이미지 전송"
        onCancel={cancelSendImage}
        footer={
          <>
            <Button
              small
              width="60px"
              onClick={() => handleUpload(selectedFile)}
            >
              전송
            </Button>
            <Button small width="60px" onClick={cancelSendImage}>
              취소
            </Button>
          </>
        }
      >
        <PreviewBox>
          <ImagePreview src={previewFile} alt="이미지프리뷰" />
        </PreviewBox>
      </Modal>
      <MessageChatLayout onSubmit={submitHandler}>
        <ProductBox>
          <div>
            <UserProfile size="40px" src={userInfo.userProfile} />
            <p>{userInfo.user}</p>
          </div>
          <div>
            <ProductInfoImage
              src={productInfo.productImageUrl}
              alt="상품이미지"
            />
            <ProductInfoContent>
              <p>{productInfo.productName}</p>
              <p>{productInfo.price?.toLocaleString('ko-KR')}원</p>
            </ProductInfoContent>
          </div>
        </ProductBox>
        <MessageBox id="message-box">
          <MessageDate>{currentDate}</MessageDate>
          <StartMessage>{startMessage}</StartMessage>
          <ChatBoxLayout>
            {renderPastMessages()}
            {renderMessages()}
          </ChatBoxLayout>
        </MessageBox>
        <MessageInputBox>
          <PiImagesLight size="30px" onClick={pickImageHandler} />
          <ImageInput
            id="file-input"
            type="file"
            ref={fileRef}
            onChange={handleImageSelection}
          />
          <MessageInput
            element="input"
            type="text"
            id="message"
            rows={2}
            width="55rem"
            reset={resetInput}
            setReset={setResetInput}
            placeholder="메시지를 입력하세요."
            validators={[VALIDATOR_REQUIRE()]}
            errorText={null}
            onInput={inputHandler}
          />
          <MessageButton type="submit">
            <PiPaperPlaneRightLight size="30px" />
          </MessageButton>
        </MessageInputBox>
      </MessageChatLayout>
    </>
  );
};

export default MessageChat;
