import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import DetailHeader from './DetailHeader';
import DetailContent from './DetailContent';
import DetailConfirm from './DetailConfirm';
import DetailReview from './DetailReview';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import DetailImageGallery from './DetailImageGallery';
import theme from '../../styles/theme';

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

const DetailView = ({ items }) => {
  console.log(items);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const deleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log('삭제되었습니다.');
  };

  return (
    <>
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
        <ButtonLayout>
          <Link to={`/product/${items.productId}`}>수정하기</Link>
          <Link onClick={deleteWarningHandler}>삭제하기</Link>
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
            tradeArea={items.tradeArea}
            detail={items.detail}
            image={items.sellerProfileImage}
            grade={items.sellerGrade}
          />
          <DetailConfirm
            amount={items.price}
            name={items.productName}
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
