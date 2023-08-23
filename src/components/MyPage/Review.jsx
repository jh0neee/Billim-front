import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import axios from 'axios';
import theme from '../../styles/theme';
import Button from '../UI/Button';
import Input from '../UI/Input';
import StarRating from './StarRating';
import ErrorModal from '../../util/ErrorModal';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { NoneText } from './WishList';
import { useLoadingError } from '../../hooks/useLoadingError';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import { useTokenRefresher } from '../../hooks/useTokenRefresher';

const ReviewLayout = styled.div`
  background-color: #ededed;
  margin: 1rem 0 2rem;
  padding: 1rem;
`;

const OrderCreatedAt = styled.p`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 1rem;
  font-size: 0.6rem;
`;

const ReviewItemList = styled.div`
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media ${theme.mobile} {
    padding: 0;
  }
`;

const TopList = styled.div`
  display: flex;
  align-items: flex-start;
`;

const BottomList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 5rem;

  @media ${theme.mobile} {
    margin-top: 4rem;
  }
`;

const ReviewItemTextBox = styled.div`
  margin: auto 0 auto 1.5rem;
  font-size: 0.8rem;

  > * {
    &:nth-child(-n + 2) {
      font-size: 0.9rem;
      font-weight: 500;
      padding: 0.2rem 0;
    }

    &:last-child {
      padding-top: 2rem;
    }
  }

  > div {
    display: flex;
    align-items: center;
  }

  @media ${theme.mobile} {
    margin: auto 1rem;

    > * {
      &:nth-child(-n + 2) {
        font-size: 0.85rem;
      }
    }
  }
`;

const WritedReview = styled.div`
  margin: 1rem 1rem 0;

  > div {
    width: 100%;
    padding: 1rem;
    background-color: white;

    &:last-child {
      margin-top: 1rem;
      font-size: 0.8rem;
    }
  }

  @media ${theme.mobile} {
    margin: 1rem 0 0;
  }
`;

const ProductImage = styled.img`
  width: 100px;
  height: 120px;

  @media ${theme.mobile} {
    width: 70px;
    height: 90px;
  }
`;

const ReviewInputBox = styled.form`
  display: flex;
  flex-direction: column;

  > button {
    align-self: center;
  }
`;

const ExtraButton = styled(Button)`
  margin: 0;
  width: 60px;
  height: 27px;
  font-size: 10px;
  font-weight: 400;
`;

const Review = () => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const [isOpenReview, setIsOpenReview] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const [rating, setRating] = useState(0);
  const [formState, inputHandler] = useForm({}, false);
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();
  const { tokenErrorHandler } = useTokenRefresher(auth);

  useEffect(() => {
    getReview();
  }, []);

  const getReview = () => {
    onLoading(true);

    axios
      .get(`${url}/review/my/list`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          memberId: auth.memberId,
        },
      })
      .then(response => {
        setReviewList(
          [
            ...response.data.writableReviewList,
            ...response.data.writtenReviewList,
          ].sort(
            (a, b) => new Date(b.orderCreatedAt) - new Date(a.orderCreatedAt),
          ),
        );
        onLoading(false);
      })
      .catch(err => {
        if (
          err.response.status === 401 &&
          err.response.data.code !== 'INVALID_EMAIL_PASSWORD'
        ) {
          tokenErrorHandler(err);
        } else {
          errorHandler(err);
        }
      });
  };

  const toggleReview = id => {
    setIsOpenReview(prev => (prev !== id ? id : false));
  };

  const reviewSubmitHandler = (e, id) => {
    e.preventDefault();

    if (!formState.isValid) {
      alert('빈칸 없이 작성해주세요.');
      return;
    }

    onLoading(true);

    axios
      .post(
        `${url}/review/write`,
        {
          content: formState.inputs.review.value,
          orderId: id,
          starRating: rating,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        },
      )
      .then(() => {
        getReview();
        onLoading(false);
      })
      .catch(err => {
        if (
          err.response.status === 401 &&
          err.response.data.code !== 'INVALID_EMAIL_PASSWORD'
        ) {
          tokenErrorHandler(err);
        } else {
          errorHandler(err);
        }
      });
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <p>구매 후기</p>
      {isLoading && <LoadingSpinner asOverlay />}
      {reviewList.length === 0 ? (
        <NoneText>작성할 리뷰가 없습니다.</NoneText>
      ) : (
        reviewList.map(item => (
          <ReviewLayout key={item.orderId}>
            <OrderCreatedAt>{item.orderCreatedAt.slice(0, 19)}</OrderCreatedAt>
            <ReviewItemList>
              <TopList>
                <Link to={`/${item.productId}/detail`}>
                  <ProductImage src={item.productImageUrl} alt="상품이미지" />
                </Link>
                <ReviewItemTextBox>
                  <p>{item.productName}</p>
                  <p>\{item.price.toLocaleString('kr-KR')}</p>
                  <p>{item.sellerNickname}</p>
                </ReviewItemTextBox>
              </TopList>
              <BottomList>
                {item.isWritable && (
                  <ExtraButton onClick={() => toggleReview(item.orderId)}>
                    {isOpenReview === item.orderId ? '취소' : '후기 작성'}
                  </ExtraButton>
                )}
              </BottomList>
            </ReviewItemList>
            {item.isWritable && isOpenReview === item.orderId && (
              <WritedReview review>
                <p> ➤ 후기 작성하기</p>
                <ReviewInputBox
                  onSubmit={e => reviewSubmitHandler(e, item.orderId)}
                >
                  <StarRating rating={rating} setRating={setRating} />
                  <Input
                    element="textarea"
                    id="review"
                    width="100%"
                    rows="5"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText={null}
                    onInput={inputHandler}
                  />
                  <ExtraButton type="submit">확인</ExtraButton>
                </ReviewInputBox>
              </WritedReview>
            )}
            {!item.isWritable && (
              <WritedReview>
                <p>내가 작성한 후기</p>
                <div>{item.content}</div>
              </WritedReview>
            )}
          </ReviewLayout>
        ))
      )}
    </>
  );
};

export default Review;
