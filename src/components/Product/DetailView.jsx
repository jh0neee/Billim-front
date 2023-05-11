import React, { useState } from "react";
import styled from "styled-components";

import DetailHeader from "./DetailHeader";
import DetailContent from "./DetailContent";
import DetailConfirm from "./DetailConfirm";
import DetailReview from "./DetailReview";
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

const DetailView = (props) => {
  const [isViewMore, setIsViewMore] = useState(false);

  const handleViewMore = () => {
    setIsViewMore(!isViewMore);
  };

  return (
    <>
      {props.items.map((item) => (
        <DetailLayout key={item.id}>
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
            <DetailContent />
            <DetailConfirm amount={item.amount} />
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
