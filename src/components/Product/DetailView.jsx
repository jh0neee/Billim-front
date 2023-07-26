import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import axios from 'axios';
import theme from '../../styles/theme';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import ErrorModal from '../../util/ErrorModal';
import DetailHeader from './DetailHeader';
import DetailContent from './DetailContent';
import DetailConfirm from './DetailConfirm';
import DetailReview from './DetailReview';
import LoadingSpinner from '../UI/LoadingSpinner';
import DetailImageGallery from './DetailImageGallery';
import { useAuth } from '../../hooks/useAuth';
import { useLoadingError } from '../../hooks/useLoadingError';
import { useTokenRefresher } from '../../hooks/useTokenRefresher';
import { PiWechatLogoDuotone as ChatIcon } from 'react-icons/pi';

const DetailLayout = styled.div`
  max-width: 1140px;
  width: 70%;
  margin: 120px auto 0;
  font-family: 'SCDream';

  @media (max-width: 925px) {
    width: 100%;
    overflow-x: hidden;
  }
  @media ${theme.tablet}, ${theme.mobile} {
    margin: 150px auto 0;
  }
`;

const DetailBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 1.5rem;
  padding: 2.5rem 0px;

  @media (max-width: 925px) {
    width: 70%;
    margin: 0 auto;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr;
    column-gap: 0;
    row-gap: 1.5rem;
  }
  @media ${theme.mobile} {
    width: 80%;
    margin: 0 auto;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr;
    column-gap: 0;
    row-gap: 1.5rem;
  }
  @media (max-width: 400px) {
    width: 90%;
  }
`;

const DetailReviewBox = styled.div`
  margin: 2rem 1rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 925px) {
    width: 70%;
    margin: 2rem auto;
  }
  @media ${theme.mobile} {
    width: 80%;
    margin: 2rem auto;
  }
`;

const ReviewTitle = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: 700;
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 3rem;

  > * {
    margin-left: 1rem;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      text-decoration-line: underline;
      text-underline-position: under;
    }
  }
`;

const StyledLine = styled.hr`
  @media (max-width: 925px), ${theme.mobile} {
    width: 90%;
  }
`;

const ChatLink = styled(Link)`
  display: flex;
  align-items: center;

  > svg {
    color: darkgrey;
    height: 15px;
    width: 18px;
    margin: 0 0 0.1rem 0.05rem;
  }

  &:hover > svg {
    color: #ffc300;
  }

  &:hover {
    text-decoration: none;
  }
`;

const DetailView = ({ items, onDeleteProduct }) => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const productId = items.productId;
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { tokenErrorHandler } = useTokenRefresher(auth);
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();

  const deleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    onLoading(true);
    axios
      .delete(`${url}/product/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then(() => {
        onDeleteProduct(productId);
        navigate('/product');
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

  const EnterChatRoom = () => {
    axios
      .post(`${url}/chat/room/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          memberId: auth.memberId,
        },
      })
      .then(response => {
        const { chatRoomId } = response.data;
        if (chatRoomId) {
          navigate(`/chat/messages/${chatRoomId}`);
        } else {
          console.log(chatRoomId);
        }
      })
      .catch(err => {
        errorHandler(err);
      });
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="삭제하시겠습니까?"
        footer={
          <>
            <Button sub small width="60px" onClick={cancelDeleteHandler}>
              취소
            </Button>
            <Button small width="60px" onClick={confirmDeleteHandler}>
              삭제
            </Button>
          </>
        }
      >
        <p>삭제 후에는 취소할 수 없습니다.</p>
      </Modal>
      <DetailLayout key={items.productId}>
        {isLoading && <LoadingSpinner asOverlay />}
        <ButtonLayout>
          {auth.memberId === items.sellerMemberId && (
            <Link to={`/product/${items.productId}`}>수정하기</Link>
          )}
          {auth.memberId === items.sellerMemberId && (
            <Link onClick={deleteWarningHandler}>삭제하기</Link>
          )}
          {auth.memberId !== items.sellerMemberId && (
            <ChatLink onClick={EnterChatRoom}>
              <ChatIcon />
              <p>채팅하기</p>
            </ChatLink>
          )}
        </ButtonLayout>
        <DetailHeader
          name={items.productName}
          scope={items.starRating}
          grade={items.sellerGrade}
          reviewCount={items.productReviewLists.length}
        />
        <DetailImageGallery images={items.imageUrls} />
        <DetailBox>
          <DetailContent
            name={items.sellerNickname}
            tradeMethod={items.tradeMethods}
            place={items.place}
            detail={items.detail}
            image={items.sellerProfileImage}
            grade={items.sellerGrade}
          />
          <DetailConfirm
            image={items.imageUrls[0]}
            tradeMethod={items.tradeMethods}
            name={items.productName}
            seller={items.sellerNickname}
            category={items.category}
            amount={items.price}
            productId={items.productId}
            alreadyDates={items.alreadyDates}
          />
        </DetailBox>
        <StyledLine />
        <DetailReviewBox>
          <ReviewTitle>후기</ReviewTitle>
          <DetailReview data={items.productReviewLists} />
        </DetailReviewBox>
      </DetailLayout>
    </>
  );
};

export default DetailView;
