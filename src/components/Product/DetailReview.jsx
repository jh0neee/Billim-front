import React from 'react';
import styled from 'styled-components';

import { Profile } from '../UI/Profile';

const ReviewLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-gap: 0.8rem 1rem;
  line-height: 1.5;

  > * {
    padding: 1rem;
  }
`;

const ReviewContent = styled.div`
  width: 100%;

  > * {
    &:first-child {
      display: flex;
      align-items: center;
    }

    &:last-child {
      margin: 0.5rem 0;
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

const DetailReview = ({ data, isViewMore }) => {
  const exampleReview = data.slice(0, 4);
  const moreReview = data.slice(4);

  return (
    <ReviewLayout>
      {exampleReview.map(rv => (
        <ReviewContent key={rv.id}>
          <div>
            <Profile size="45px" />
            <ReviewUserBox>
              <p>{rv.username}</p>
              <p>{rv.date}</p>
            </ReviewUserBox>
          </div>
          <p>{rv.review}</p>
        </ReviewContent>
      ))}

      {isViewMore &&
        moreReview.map(rv => (
          <ReviewContent key={rv.id}>
            <div>
              <Profile size="45px" />
              <ReviewUserBox>
                <p>{rv.username}</p>
                <p>{rv.date}</p>
              </ReviewUserBox>
            </div>
            <p>{rv.review}</p>
          </ReviewContent>
        ))}
    </ReviewLayout>
  );
};

export default DetailReview;
