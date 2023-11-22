import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Input from '../../UI/Input';
import theme from '../../../styles/theme';
import { Profile } from '../../UI/Profile';

// ChatList.jsx
export const ChatList = styled.ul`
  background-color: #f1f3f5;
  border: 1px solid #dee2e6;

  &.noneDisplay {
    display: none;
  }

  @media ${theme.tablet} {
    height: 87vh;
  }
`;

export const ReceiverList = styled(Link)`
  color: #343a40;
  display: flex;
  padding: 0.8rem;
  border-bottom: 1px solid #dee2e6;
`;

export const DetailBox = styled.div`
  width: 10.5rem;
  margin: auto;
  margin-left: 0.3rem;

  &.fullWidth {
    width: calc(100% - 50px);
  }

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

export const NameBox = styled.div`
  margin-left: 0.1rem;
  font-size: 0.9rem;
  font-weight: 600;
`;

export const Unread = styled.div`
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

// MessageChat.jsx
export const MessageChatLayout = styled.form`
  height: 84vh;
`;

export const MessageBox = styled.div`
  position: relative;
  padding: 1rem;
  height: calc(84vh - 145.6px);
  background-color: white;
  overflow-y: auto;
  overflow-x: hidden;

  @media ${theme.tablet} {
    height: calc(100vh - 237.8px);
  }
`;

export const MessageDate = styled.p`
  margin: 10px auto;
  padding: 0.5rem;
  width: 9.5rem;
  border: 1px solid rgb(222, 226, 230);
  border-radius: 2rem;
  text-align: center;
  font-size: 0.85rem;
`;

export const SystemBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StartMessage = styled.p`
  margin: 1rem 0 0.375rem;
  text-align: center;
  color: #343a40;
  font-size: 0.85rem;
`;

export const ProductBox = styled.div`
  display: flex;
  padding: 0px 1rem 0 1.3rem;
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

export const MessageInputBox = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  padding: 0 1.3rem;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;

export const MessageButton = styled.button`
  width: 30px;
  height: 30px;
`;

export const ChatBoxLayout = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
`;

export const MessageContainer = styled.div`
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

export const ChatMessageBox = styled.div`
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

export const ChatReadTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.isSent ? 'flex-end' : 'flex-start')};
`;

export const ChatRead = styled.p`
  margin: ${props => (props.hasTime ? '0 0 0.2rem' : '0 0 0.7rem')};
  color: goldenrod;
  font-size: 12px;
`;

export const ChatTime = styled.p`
  margin: 0 0 0.5rem;
  font-size: 10px;
`;

export const ChatUserProfile = styled.div`
  align-self: center;
`;

export const ChatImageMessage = styled.img`
  width: 200px;
  margin: 0.5rem;
  border-radius: 15px;
`;

export const PreviewBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 52vh;
  object-fit: contain;
`;

export const ProductInfoBox = styled(Link)`
  display: flex;
  cursor: pointer;
`;

export const ProductInfoContent = styled.div`
  margin-left: 0.5rem;
  margin-top: 0.2rem;
  > * {
    font-size: 0.8rem;

    &:last-child {
      margin-top: 0.5rem;
      font-weight: 600;
    }
  }
`;

export const ProductInfoImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: fill;
  border-radius: 3px;
`;

export const UserProfile = styled(Profile)`
  border: 1px solid rgb(222, 226, 230);
`;

export const MessageInput = styled(Input)`
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

export const ExitIcon = styled.button`
  all: unset;
  align-self: center;
  margin-left: 1rem;

  &:hover {
    cursor: pointer;
  }

  > svg {
    width: 30px;
    height: 20px;
  }

  > p {
    font-size: 10px;
  }
`;

export const ExitButton = styled.button`
  all: unset;
  font-size: 0.8rem;
  color: dimgray;
  margin-bottom: 0.375rem;
  text-decoration: underline;
  text-underline-position: under;
  cursor: pointer;
`;
