import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as C from './styles/Chat.styles';

import axios from 'axios';
import AWS from 'aws-sdk';

import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { useForm } from '../../hooks/useForm';
import { ImageInput } from '../UI/ImageUpload';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import {
  PiImagesLight,
  PiPaperPlaneRightLight,
  PiSignOutLight,
} from 'react-icons/pi';

const MessageChat = ({
  url,
  auth,
  setOpenExitModal,
  readStatus,
  correctSender,
  userInfo,
  inChatRoom,
  stompClient,
  messages,
  setMessages,
  unreadMessages,
  onLoading,
  errorHandler,
  tokenErrorHandler,
}) => {
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
    onLoading(true);
    axios
      .get(`${url}/api/chat/product-info/${chatRoomId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then(response => {
        setProductInfo(response.data);
        onLoading(false);
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

        setInRoomId(messageData[0].chatRoomId);
        setCurrentDate(messageData[0].sendAt);
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
    if (!formState.inputs.message.value && !selectedFile) {
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
    let read;

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
        return (read = true);
      } else {
        read = false;
      }
    }
    return read;
  };

  const MessageLists = (
    messages,
    msg,
    index,
    messageType,
    read,
    allMsg = pastMessages,
  ) => {
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

    let compareDate;
    if (messageType === 'pastMessage') {
      const findPrevMsgIndex = allMsg.indexOf(msg);
      if (findPrevMsgIndex === 0) {
        compareDate = currentDate.slice(0, 10);
      } else {
        compareDate = allMsg[findPrevMsgIndex - 1]?.sendAt.slice(0, 10);
      }
    } else if (messageType === 'currentMessage') {
      if (allMsg.length === 0 && msg === messages[0]) {
        compareDate = currentDate.slice(0, 10);
      } else if (msg === messages[0]) {
        compareDate = allMsg[allMsg.length - 1]?.sendAt.slice(0, 10);
      } else {
        compareDate = prevMessage && prevMessage?.sendAt.slice(0, 10);
      }
    }

    const isSameDateAsNext = msg.sendAt.slice(0, 10) !== compareDate;

    const renderChatMessage = () => {
      return (
        <>
          {msg.type === 'SYSTEM' ? (
            <C.SystemBox>
              <C.StartMessage>{msg.message}</C.StartMessage>
              <C.ExitButton
                type="button"
                onClick={() => setOpenExitModal(true)}
              >
                채팅방 나가기
              </C.ExitButton>
            </C.SystemBox>
          ) : (
            <React.Fragment>
              {isSameDateAsNext && (
                <C.MessageDate>
                  {formatDate(msg.sendAt.slice(0, 10))}
                </C.MessageDate>
              )}
              <C.MessageContainer isSent={isSentByUser}>
                {isSentByUser && (
                  <C.ChatReadTime isSent={isSentByUser}>
                    <C.ChatRead hasTime={!isSameTimeAsNext}>
                      {!read && '1'}
                    </C.ChatRead>
                    {!isSameTimeAsNext && <C.ChatTime>{timeValue}</C.ChatTime>}
                  </C.ChatReadTime>
                )}
                {!isSentByUser && (
                  <C.ChatUserProfile>
                    {isDifferentUser || !isSameTimeAsNext ? (
                      <C.UserProfile size="40px" src={userInfo.userProfile} />
                    ) : (
                      <div style={{ marginLeft: '40px' }} />
                    )}
                  </C.ChatUserProfile>
                )}
                {msg.message.includes(`${BUCKET_NAME}.s3`) ? (
                  <C.ChatImageMessage src={msg.message} alt="채팅이미지" />
                ) : (
                  <C.ChatMessageBox isSent={isSentByUser}>
                    <p>{msg.message}</p>
                  </C.ChatMessageBox>
                )}
                {!isSentByUser && (
                  <C.ChatReadTime isSent={isSentByUser}>
                    <C.ChatRead hasTime={!isSameTimeAsNext}>
                      {!read && '1'}
                    </C.ChatRead>
                    {!isSameTimeAsNext && <C.ChatTime>{timeValue}</C.ChatTime>}
                  </C.ChatReadTime>
                )}
              </C.MessageContainer>
            </React.Fragment>
          )}
        </>
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
      if (!msg.read) {
        read = readStatus;
      } else {
        read = msg.read;
      }
      return (
        <React.Fragment key={msg.messageId}>
          {MessageLists(pastMessages, msg, index, 'pastMessage', read)}
        </React.Fragment>
      );
    });
  };

  const renderMessages = () => {
    return messages.map((msg, index) => {
      let read;
      if (msg.newMessage && !correctSender) {
        const unreadMessagesByRecipient = unreadMessages.filter(
          unread => unread.messageId === msg.messageId,
        );

        read = true;
        unreadMessagesByRecipient.forEach(() => {
          read = readStatus;
        });
      } else if (msg.newMessage && correctSender) {
        read = readMessage(msg);
      }
      return (
        <React.Fragment key={msg.messageId}>
          {MessageLists(messages, msg, index, 'currentMessage', read)}
        </React.Fragment>
      );
    });
  };

  const submitHandler = e => {
    e.preventDefault();
    if (Number(chatRoomId) === inRoomId) {
      sendMessage();
      setResetInput(true);
    }
  };

  const exitMessage = pastMessages.find(msg =>
    msg.message.includes('나갔습니다.'),
  );

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
        <C.PreviewBox>
          <C.ImagePreview src={previewFile} alt="이미지프리뷰" />
        </C.PreviewBox>
      </Modal>
      <C.MessageChatLayout onSubmit={submitHandler}>
        <C.ProductBox>
          <div>
            <C.UserProfile size="40px" src={userInfo.userProfile} />
            <p>{userInfo.user}</p>
          </div>
          <div>
            <C.ProductInfoBox to={`/${productInfo.productId}/detail`}>
              <C.ProductInfoImage
                src={productInfo.productImageUrl}
                alt={`[상품] ${productInfo.productName}`}
              />
              <C.ProductInfoContent>
                <p>{productInfo.productName}</p>
                <p>{productInfo.price?.toLocaleString('ko-KR')}원</p>
              </C.ProductInfoContent>
            </C.ProductInfoBox>
            <C.ExitIcon type="button" onClick={() => setOpenExitModal(true)}>
              <PiSignOutLight />
              <p>나가기</p>
            </C.ExitIcon>
          </div>
        </C.ProductBox>
        <C.MessageBox id="message-box">
          <C.MessageDate>{formatDate(currentDate.slice(0, 10))}</C.MessageDate>
          <C.StartMessage>{startMessage}</C.StartMessage>
          <C.ChatBoxLayout>
            {renderPastMessages()}
            {renderMessages()}
          </C.ChatBoxLayout>
        </C.MessageBox>
        <C.MessageInputBox>
          <PiImagesLight size="30px" onClick={pickImageHandler} />
          <ImageInput
            id="file-input"
            type="file"
            ref={fileRef}
            onChange={handleImageSelection}
          />
          <C.MessageInput
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
            disabled={exitMessage}
          />
          <C.MessageButton type="submit">
            <PiPaperPlaneRightLight size="30px" />
          </C.MessageButton>
        </C.MessageInputBox>
      </C.MessageChatLayout>
    </>
  );
};

export default MessageChat;
