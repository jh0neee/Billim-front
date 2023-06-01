import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import DetailHeader from "./DetailHeader";
import DetailContent from "./DetailContent";
import DetailConfirm from "./DetailConfirm";
import DetailReview from "./DetailReview";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { review } from "../../data";

const DetailLayout = styled.div`
  width: 70%;
  margin: 120px auto 0;
  font-family: "SCDream";
`;

const DetailImage = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: center;

  > div {
    display: flex;
    flex-direction: column;
  }

  > * {
    &:first-child {
      margin-right: 1rem;
    }
  }
`;

const DetailImageBox = styled.div`
  > * {
    &:first-child {
      margin-bottom: 1rem;
      margin-right: 1rem;
    }

    &:last-child {
      margin-right: 1rem;
    }
  }
`;

const DetailBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 1.5rem;
  padding: 2.5rem 0px;
`;

const DetailReviewBox = styled.div`
  margin: 2rem 1rem;
  display: flex;
  flex-direction: column;

  > * {
    &:last-child {
      margin: 2rem auto 0;
    }
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

const DetailView = (props) => {
  const [isViewMore, setIsViewMore] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const deleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const handleViewMore = () => {
    setIsViewMore(!isViewMore);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("삭제되었습니다.");
  };

  return (
    <>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header='삭제하시겠습니까?'
        footer={
          <>
            <Button sub small width='60px' onClick={cancelDeleteHandler}>
              취소
            </Button>
            <Button small width='60px' onClick={confirmDeleteHandler}>
              삭제
            </Button>
          </>
        }>
        <p>삭제 후에는 취소할 수 없습니다.</p>
      </Modal>
      {props.items.map((item) => (
        <DetailLayout key={item.id}>
          <ButtonLayout>
            <Link to={`/product/${item.id}`}>수정하기</Link>
            <Link onClick={deleteWarningHandler}>삭제하기</Link>
          </ButtonLayout>
          <DetailHeader name={item.name} scope={item.scope} />
          <DetailImage>
            <img
              src='https://via.placeholder.com/400x300'
              alt='상품예시이미지'
            />
            <DetailImageBox>
              <img
                src='https://via.placeholder.com/200x150'
                alt='상품예시이미지'
              />
              <img
                src='https://via.placeholder.com/200x150'
                alt='상품예시이미지'
              />
            </DetailImageBox>
            <DetailImageBox>
              <img
                src='https://via.placeholder.com/200x150'
                alt='상품예시이미지'
              />
              <img
                src='https://via.placeholder.com/200x150'
                alt='상품예시이미지'
              />
            </DetailImageBox>
          </DetailImage>
          <DetailBox>
            <DetailContent tradeMethod={item.trade} />
            <DetailConfirm amount={item.amount} name={item.name} />
          </DetailBox>
          <hr />
          <DetailReviewBox>
            <ReviewTitle>후기</ReviewTitle>
            <DetailReview data={review} isViewMore={isViewMore} />
            {isViewMore ? (
              <MdKeyboardArrowUp size='35px' onClick={handleViewMore} />
            ) : (
              <MdKeyboardArrowDown size='35px' onClick={handleViewMore} />
            )}
          </DetailReviewBox>
        </DetailLayout>
      ))}
    </>
  );
};

export default DetailView;
