import React, { useState } from 'react';
import styled from 'styled-components';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { Profile } from '../UI/Profile';
import SmallListPagination from '../UI/SmallListPagination';

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

const ReviewContent = styled.div`
  width: 100%;
  border-bottom: ${({ dataZero }) => (dataZero ? '0' : '1px solid #dee2e6')};

  > * {
    &:first-child {
      display: flex;
      align-items: center;
    }

    &:last-child {
      margin: ${({ dataZero }) => (dataZero ? '0' : '0.5rem 1rem 0')};
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
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
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
        {currentItems.map(review => (
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
      </ReviewLayout>
      <SmallListPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default DetailReview;
