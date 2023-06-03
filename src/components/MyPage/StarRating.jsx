import React from 'react';
import styled from 'styled-components';

import { TbStarFilled } from 'react-icons/tb';

const StarRatingLayout = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0.5rem 0.3rem;
`;

const StarIcon = styled.span`
  color: ${props => (props.filled ? '#fcd34d' : 'gray')};
  cursor: 'pointer';
`;

const RatingText = styled.p`
  font-family: 'TRoundWind';
  font-size: 0.85rem;
  margin-left: 0.5rem;
`;

const StarRating = ({ rating, setRating }) => {
  const handleClick = selectedRating => {
    setRating(selectedRating);
  };

  return (
    <StarRatingLayout>
      {[1, 2, 3, 4, 5].map(star => (
        <StarIcon
          key={star}
          filled={star <= rating}
          onClick={() => handleClick(star)}
        >
          <TbStarFilled size="25px" />
        </StarIcon>
      ))}
      <RatingText>
        {rating === 5
          ? '아주 좋아요'
          : rating === 4
          ? '마음에 들어요'
          : rating === 3
          ? '보통이에요'
          : rating === 2
          ? '그냥 그래요'
          : rating === 1
          ? '별로에요'
          : null}
      </RatingText>
    </StarRatingLayout>
  );
};

export default StarRating;
