import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as P from './styles/Product.styles';

import axios from 'axios';
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
import { useToastAlert } from '../../hooks/useToastAlert';

const DetailView = ({ items, onDeleteProduct }) => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const productId = items.productId;
  const navigate = useNavigate();

  const perPage = 4;
  const [reviewData, setReviewData] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { tokenErrorHandler } = useTokenRefresher(auth);
  const { ToastWrapper } = useToastAlert();
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

  useEffect(() => {
    axios
      .get(`${url}/review/list/${productId}?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then(response => {
        setReviewData(response.data.content);
        setCount(response.data.totalElements);
      })
      .catch(err => {
        errorHandler(err);
      });
  }, [currentPage]);

  const EnterChatRoom = () => {
    axios
      .post(
        `${url}/api/chat/room/product/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          params: {
            memberId: auth.memberId,
          },
        },
      )
      .then(response => {
        const { chatRoomId } = response.data;

        if (chatRoomId) {
          navigate(`/chat/messages/${chatRoomId}`);
        }
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

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {ToastWrapper('top-center')}
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
      <P.DetailLayout key={items.productId}>
        {isLoading && <LoadingSpinner asOverlay />}
        <P.ButtonLayout>
          {auth.memberId === items.sellerMemberId && (
            <Link to={`/product/${items.productId}`}>수정하기</Link>
          )}
          {auth.memberId === items.sellerMemberId && (
            <Link onClick={deleteWarningHandler}>삭제하기</Link>
          )}
          {auth.memberId !== items.sellerMemberId && (
            <P.ChatLink onClick={EnterChatRoom}>
              <ChatIcon />
              <p>채팅하기</p>
            </P.ChatLink>
          )}
        </P.ButtonLayout>
        <DetailHeader
          name={items.productName}
          scope={items.starRating.toFixed(1)}
          grade={items.sellerGrade}
          reviewCount={count}
        />
        <DetailImageGallery
          images={items.imageUrls}
          productName={items.productName}
        />
        <P.DetailBox>
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
            sellerId={items.sellerMemberId}
            buyerId={auth.memberId}
            category={items.category}
            amount={items.price}
            productId={items.productId}
            alreadyDates={items.alreadyDates}
          />
        </P.DetailBox>
        <P.StyledLine />
        <P.DetailReviewBox>
          <P.ReviewTitle>후기</P.ReviewTitle>
          <DetailReview
            reviewData={reviewData}
            count={count}
            perPage={perPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </P.DetailReviewBox>
      </P.DetailLayout>
    </>
  );
};

export default DetailView;
