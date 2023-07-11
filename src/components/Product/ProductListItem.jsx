import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Card from '../UI/Card';
import ErrorModal from '../../util/ErrorModal';
import { useAuth } from '../../hooks/useAuth';
import { useLoadingError } from '../../hooks/useLoadingError';
import { RiHeart3Fill, RiHeart3Line, RiStarSFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
const ProductCard = styled(Card)`
  width: 100%;
  border: none;

  @media (max-width: 890px) {
    max-width: 340px;
  }
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: calc(353.67 / 335.98 * 100%);
`;

const ProductImage = styled.img`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const ProductInfoBox = styled.div`
  padding-top: 12px;
  width: 100%;
  height: 80px;
`;

const ProductItemBox = styled.div`
  margin: 8px 7px 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikeIcon = styled.div`
  position: absolute;
  top: 9px;
  right: 10px;
  font-size: 23px;
`;

const ProductParagraph = styled.p`
  font-size: 1rem;
  font-weight: 600;

  ${props =>
    props.amount &&
    css`
      margin: 15px 10px 0;
    `}
`;

const ProductListItem = ({ items }) => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [interestList, setInterestList] = useState([]);
  const { error, clearError, errorHandler } = useLoadingError();

  useEffect(() => {
    if (isLoggedIn) {
      getInterestList();
    }
  }, [isLoggedIn]);

  const getInterestList = () => {
    axios
      .get(`${url}/product/my/interestList`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          memberId: auth.memberId,
        },
      })
      .then(response => {
        const responseData = response.data.myInterestProductList;
        setInterestList(responseData);
      })
      .catch(err => {
        errorHandler(err);
      });
  };

  const handleInterestToggle = selectItem => {
    const correctItem = interestList.find(
      item => item.productId === selectItem.productId,
    );

    if (interestList.includes(correctItem)) {
      axios
        .post(
          `${url}/product/interest`,
          {
            interest: false,
            productId: selectItem.productId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.token}`,
            },
          },
        )
        .then(() => {
          setInterestList(prevItem =>
            prevItem.filter(item => item.productId !== selectItem.productId),
          );
        })
        .catch(err => {
          errorHandler(err);
        });
    } else {
      axios
        .post(
          `${url}/product/interest`,
          {
            interest: true,
            productId: selectItem.productId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.token}`,
            },
          },
        )
        .then(() => {
          setInterestList(prevItem => [...prevItem, selectItem]);
        })
        .catch(err => {
          errorHandler(err);
        });
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {items.length === 0 ? (
        <span>검색결과가 없습니다.</span>
      ) : (
        items.map(item => (
          <ProductCard key={item.productId}>
            <Link to={`/${item.productId}/detail`}>
              <ImageBox>
                <ProductImage src={item.imageUrls[0]} alt="상품이미지" />
              </ImageBox>
            </Link>
            <LikeIcon onClick={() => handleInterestToggle(item)}>
              {!interestList && <RiHeart3Line color="grey" />}
              {interestList &&
              interestList.find(obj => obj.productId === item.productId) ? (
                <RiHeart3Fill color="red" />
              ) : (
                <RiHeart3Line color="grey" />
              )}
            </LikeIcon>
            <ProductInfoBox>
              <Link to={`/${item.productId}/detail`}>
                <ProductItemBox>
                  <ProductParagraph>{item.productName}</ProductParagraph>
                  <ProductParagraph>
                    <RiStarSFill />
                    {item.starRating}
                  </ProductParagraph>
                </ProductItemBox>
                <ProductParagraph amount>
                  \ {item.price.toLocaleString('ko-KR')} /일
                </ProductParagraph>
              </Link>
            </ProductInfoBox>
          </ProductCard>
        ))
      )}
    </>
  );
};

export default ProductListItem;
