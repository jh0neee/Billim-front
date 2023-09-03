import React from 'react';
import styled from 'styled-components';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { Profile } from '../UI/Profile';
import { Paginate } from '../UI/Pagination';

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
  border-bottom: ${({ dataZero, lastData }) =>
    dataZero || lastData ? '0' : '1px solid #dee2e6'};

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

const DetailReview = ({ reviewData, count, currentPage, setCurrentPage }) => {
  const perPage = 4;

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const getCurrentItems = () => {
    const firstItemIndex = (currentPage - 1) * perPage;
    const lastItemIndex = firstItemIndex + perPage;
    return reviewData.slice(firstItemIndex, lastItemIndex);
  };

  const dateFormat = date => {
    return format(parseISO(date), 'yyyy-MM-dd');
  };

  const currentItems = getCurrentItems();

  return (
    <>
      <ReviewLayout>
        {currentItems.length === 0 && (
          <ReviewContent dataZero>
            <p>작성된 리뷰가 없습니다.</p>
          </ReviewContent>
        )}
        {currentItems.map(review => (
          <ReviewContent
            key={review.reviewId}
            lastData={currentItems.length === 1}
          >
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
      {currentItems.length > 0 && (
        <Paginate
          activePage={currentPage}
          itemsCountPerPage={perPage}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          isPageStyle={true}
        />
      )}
    </>
  );
};

export default DetailReview;
