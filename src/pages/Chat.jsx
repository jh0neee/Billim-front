import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import axios from 'axios';
import theme from '../styles/theme';
import Modal from '../components/UI/Modal';
import Button from '../components/UI/Button';
import BlockChat from '../components/Chat/BlockChat';
import MessageChat from '../components/Chat/MessageChat';
import ChatLists from '../components/Chat/ChatLists';
import ErrorModal from '../util/ErrorModal';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useLoadingError } from '../hooks/useLoadingError';
import { useAuth } from '../hooks/useAuth';
import { useResize } from '../hooks/useResize';
import { HeaderBox } from '../components/Navigation/Header';
import { HiChevronLeft } from 'react-icons/hi';
import { useTokenRefresher } from '../hooks/useTokenRefresher';

const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  font-family: 'SCDream';
`;

const ChatLayout = styled.div`
  margin-top: 85px;
  width: 100%;
  max-width: 1250px;
  height: 84vh;
  display: grid;
  grid-template-columns: 0.5fr 2fr;

  &.fullWidth {
    grid-template-columns: 1fr;
  }

  &.responsiveStyle {
    display: block;
  }

  @media ${theme.tablet} {
    margin-top: 85px;
    height: 87vh;
    z-index: 10;
  }
`;

const ChatContent = styled.div`
  background-color: #f1f3f5;
  border: 1px solid #dee2e6;

  &.fullHeight {
    height: 84vh;

    @media ${theme.tablet} {
      height: 75vh;
    }
  }

  &.chatHeight {
    overflow: hidden;
    height: 87vh;
  }

  @media ${theme.tablet} {
    overflow: hidden;
  }
`;

const ChatHeaderContainer = styled(HeaderBox)`
  display: flex;
  justify-content: center;
  height: 85px;
`;

const ChatHeaderBox = styled(HeaderBox)`
  max-width: 1250px;
  height: 85px;
  width: 100%;
  display: block;
`;

const ChatHeaderContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  > p {
    font-family: 'TRoundWind';
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const GoBack = styled(HiChevronLeft)`
  cursor: pointer;
`;

const Chat = () => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const navigate = useNavigate();
  const resize = useResize(768, '<');
  const roomId = Number(useLocation().pathname.slice(15));
  const prevChatPage = useSelector(state => state.pages.currentPage);
  const [hasChatRoom, setHasChatRoom] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(messages);
  const [enteredUsers, setEnteredUsers] = useState({});
  const [inChatRoom, setInChatRoom] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [correctSender, setCorrectSender] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const { tokenErrorHandler } = useTokenRefresher(auth);
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();

  const [readStatus, setReadStatus] = useState(null);
  const [exitStatus, setExitStatus] = useState({});
  const [openExitModal, setOpenExitModal] = useState(false);
  const exitChatHandler = () => {
    setOpenExitModal(false);

    onLoading(true);
    axios
      .delete(`${url}/api/chat/room/${roomId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          memberId: auth.memberId,
        },
      })
      .then(() => {
        navigate('/chat');
        setExitStatus({ chatRoomId: roomId, status: true });
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

  const clickToBack = () => {
    if (resize) {
      navigate(-1);
    } else {
      navigate(prevChatPage);
    }
  };

  const renderChatLists = () => (
    <ChatLists
      url={url}
      auth={auth}
      responsiveResize={resize}
      setHasChatRoom={setHasChatRoom}
      exitStatus={exitStatus}
      setRead={setReadStatus}
      setCorrectSender={setCorrectSender}
      setUserInfo={setUserInfo}
      setEnteredUsers={setEnteredUsers}
      setInChatRoom={setInChatRoom}
      setStompClient={setStompClient}
      setMessages={setMessages}
      setUnreadMessages={setUnreadMessages}
      onLoading={onLoading}
      errorHandler={errorHandler}
      tokenErrorHandler={tokenErrorHandler}
    />
  );

  const renderMessageChat = () => (
    <MessageChat
      url={url}
      auth={auth}
      setOpenExitModal={setOpenExitModal}
      readStatus={readStatus}
      correctSender={correctSender}
      userInfo={userInfo}
      enteredUsers={enteredUsers}
      inChatRoom={inChatRoom}
      stompClient={stompClient}
      messages={messages}
      unreadMessages={unreadMessages}
      setMessages={setMessages}
      onLoading={onLoading}
      errorHandler={errorHandler}
      tokenErrorHandler={tokenErrorHandler}
    />
  );

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={openExitModal}
        header="채팅방에서 나가시겠습니까?"
        onCancel={() => setOpenExitModal(false)}
        footer={
          <>
            <Button small width="70px" onClick={exitChatHandler}>
              나가기
            </Button>
            <Button small width="60px" onClick={() => setOpenExitModal(false)}>
              취소
            </Button>
          </>
        }
      >
        채팅방을 나가면 모든 대화내용이 삭제되고,
        <br />
        채팅목록에서도 사라집니다.
      </Modal>
      <ChatHeaderContainer>
        <ChatHeaderBox>
          <ChatHeaderContent>
            <GoBack size="45px" onClick={() => clickToBack()} />
            {resize && roomId ? <p>채팅목록</p> : <p>채팅</p>}
          </ChatHeaderContent>
        </ChatHeaderBox>
      </ChatHeaderContainer>
      <ChatContainer>
        {isLoading && <LoadingSpinner asOverlay />}
        {resize && (
          <ChatLayout className={resize ? 'responsiveStyle' : ''}>
            {roomId === 0 &&
              (hasChatRoom ? (
                <ChatContent className={hasChatRoom ? 'fullHeight' : ''}>
                  <BlockChat hasChatRoom={hasChatRoom} />
                </ChatContent>
              ) : (
                renderChatLists()
              ))}
            {roomId !== 0 && (
              <ChatContent className={resize ? 'chatHeight' : ''}>
                {renderMessageChat()}
                <div style={{ display: 'none' }}>{renderChatLists()}</div>
              </ChatContent>
            )}
          </ChatLayout>
        )}
        {!resize && (
          <ChatLayout className={hasChatRoom ? 'fullWidth' : ''}>
            {renderChatLists()}
            <ChatContent className={hasChatRoom ? 'fullHeight' : ''}>
              {!roomId ? (
                <BlockChat hasChatRoom={hasChatRoom} />
              ) : (
                renderMessageChat()
              )}
            </ChatContent>
          </ChatLayout>
        )}
      </ChatContainer>
    </>
  );
};

export default Chat;
