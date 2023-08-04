import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import axios from 'axios';
import ErrorModal from '../../util/ErrorModal';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';
import { useLoadingError } from '../../hooks/useLoadingError';
import { useTokenRefresher } from '../../hooks/useTokenRefresher';
import { RiHeart3Fill, RiHeart3Line, RiStarSFill } from 'react-icons/ri';

const WishListLayout = styled.div`
  margin: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 3rem;
  justify-items: center;

  @media (max-width: 1110px) {
    grid-template-columns: 1.5fr 1.5fr;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const NoneText = styled.p`
  text-align: center;
  margin-top: 7rem;
`;

const Image = styled.img`
  width: 140px;
  height: 140px;
  border: 1px solid lightgray;
  border-radius: 10px;

  @media (max-width: 1280px) {
    width: 140px;
    height: 140px;
  }

  @media (min-width: 950px) and (max-width: 1110px),
    (min-width: 640px) and (max-width: 768px),
    (max-width: 480px) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: 480px) {
    width: 220px;
    height: 220px;
  }
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductItemBox = styled.div`
  margin: 8px 7px 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > a:hover {
    text-decoration-line: underline;
  }

  > div {
    display: flex;
    align-items: center;
  }
`;

const LikeIcon = styled.div`
  position: absolute;
  margin-top: 0.3rem;
  margin-left: 7.3rem;
  font-size: 18px;

  @media (min-width: 950px) and (max-width: 1110px),
    (min-width: 640px) and (max-width: 768px),
    (max-width: 480px) {
    margin-top: 0.4rem;
    margin-left: 9.7rem;
    font-size: 20px;
  }

  @media (max-width: 480px) {
    margin-top: 0.5rem;
    margin-left: 11.8rem;
    font-size: 22px;
  }
`;

const ProductParagraph = styled.p`
  font-size: 12px;
  margin: ${props => (props.amount ? '0 8px' : '0 0 0 0.2rem')};

  ${props =>
    props.productName &&
    css`
      margin: 0;
      width: 84px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}

  > span {
    font-size: 14px;
    font-weight: 500;
  }
`;

const WishList = () => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const [interestItems, setInterestItems] = useState([]);
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();
  const { tokenErrorHandler } = useTokenRefresher(auth);

  useEffect(() => {
    onLoading(true);
    axios
      .get(`${url}/product/my/interest`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          memberId: auth.memberId,
        },
      })
      .then(response => {
        const responseData = response.data.myInterestProductList;
        setInterestItems(responseData);
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
  }, [auth.token]);

  const handleInterestToggle = item => {
    const interestedProductId = item.productId;
    onLoading(true);
    const isInterested = interestItems.find(
      interestItem => interestItem.productId === interestedProductId,
    );

    axios
      .post(
        `${url}/product/interest`,
        {
          interest: !isInterested,
          productId: interestedProductId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        },
      )
      .then(() => {
        if (isInterested) {
          setInterestItems(prevItems =>
            prevItems.filter(
              interestItem => interestItem.productId !== interestedProductId,
            ),
          );
        } else {
          setInterestItems(prevItems => [
            ...prevItems,
            { productId: interestedProductId },
          ]);
        }
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

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <p>관심상품</p>
      {isLoading && <LoadingSpinner asOverlay />}
      {interestItems.length === 0 ? (
        <NoneText>관심상품이 없습니다.</NoneText>
      ) : (
        <WishListLayout>
          {interestItems.map(item => (
            <ListBox key={item.productId}>
              <Link to={`/${item.productId}/detail`}>
                <Image src={item.imageUrl} alt="상품예시이미지" />
              </Link>
              <LikeIcon onClick={() => handleInterestToggle(item)}>
                {interestItems.some(
                  interestItem => interestItem.productId === item.productId,
                ) ? (
                  <RiHeart3Fill color="red" />
                ) : (
                  <RiHeart3Line color="grey" />
                )}
              </LikeIcon>
              <ProductItemBox>
                <Link to={`/${item.productId}/detail`}>
                  <ProductParagraph productName>
                    {item.productName}
                  </ProductParagraph>
                </Link>
                <div>
                  <RiStarSFill />
                  <ProductParagraph>
                    {(item.starRating || 0).toFixed(1)}
                  </ProductParagraph>
                </div>
              </ProductItemBox>
              <ProductParagraph amount>
                <span>{item.price.toLocaleString('kr-KR')}</span> / 일
              </ProductParagraph>
            </ListBox>
          ))}
        </WishListLayout>
      )}
    </>
  );
};

export default WishList;
