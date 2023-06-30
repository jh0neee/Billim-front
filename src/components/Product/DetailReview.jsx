import React, { useState } from 'react';
import styled from 'styled-components';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { Profile } from '../UI/Profile';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const ReviewLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-gap: 0.8rem 1rem;
  line-height: 1.5;

  > * {
    padding: 1rem;
  }
`;

const ReviewIconBox = styled.div`
  margin: 2rem auto 0;
`;

const ReviewContent = styled.div`
  width: 100%;
  border-bottom: ${({ dataZero }) => (dataZero ? '0' : '1px solid #dee2e6')};

  > * {
    &:first-child {
      display: flex;
      align-items: center;
    }

    &:last-child {
      margin: ${({ dataZero }) => (dataZero ? '0' : '2rem 1rem 1rem')};
    }
  }
`;

const ReviewUserBox = styled.div`
  margin-left: 0.5rem;

  > * {
    &:last-child {
      font-size: 0.8rem;
    }
  }
`;

const DetailReview = ({ data }) => {
  const [isViewMore, setIsViewMore] = useState(false);
  const exampleReview = data.slice(0, 4);
  const moreReview = data.slice(4);

  const handleViewMore = () => {
    setIsViewMore(!isViewMore);
  };

  const dateFormat = date => {
    return format(parseISO(date), 'yyyy-MM-dd');
  };

  return (
    <>
      <ReviewLayout>
        {data.length === 0 && (
          <ReviewContent dataZero>
            <p>작성된 리뷰가 없습니다.</p>
          </ReviewContent>
        )}
        {exampleReview.map(review => (
          <ReviewContent key={review.reviewId}>
            <div>
              <Profile src={review.profileImageUrl} size="45px" />
              <ReviewUserBox>
                <p>{review.nickname}</p>
                <p>{dateFormat(review.createdDate)}</p>
              </ReviewUserBox>
            </div>
            <p>{review.content}</p>
          </ReviewContent>
        ))}

        {isViewMore &&
          moreReview.map(review => (
            <ReviewContent key={review.reviewId}>
              <div>
                <Profile size="45px" />
                <ReviewUserBox>
                  <p>{review.nickname}</p>
                  <p>{dateFormat(review.createdDate)}</p>
                </ReviewUserBox>
              </div>
              <p>{review.content}</p>
            </ReviewContent>
          ))}
      </ReviewLayout>
      <ReviewIconBox>
        {data.length > 4 &&
          (isViewMore ? (
            <MdKeyboardArrowUp size="35px" onClick={handleViewMore} />
          ) : (
            <MdKeyboardArrowDown size="35px" onClick={handleViewMore} />
          ))}
      </ReviewIconBox>
    </>
  );
};

export default DetailReview;
