import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import Card from '../UI/Card';
import { RiHeart3Fill, RiHeart3Line, RiStarSFill } from 'react-icons/ri';

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
  const [isWishAdd, setIsWishAdd] = useState(false);

  const handleWishlistClick = item => {
    setIsWishAdd(!isWishAdd);

    item.likeCount += 1;

    if (item.likeCount === 2) {
      item.likeCount -= 2;
    }
  };

  return (
    <>
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
            <LikeIcon onClick={() => handleWishlistClick(item)}>
              {item.likeCount === 1 ? (
                <RiHeart3Fill color="red" />
              ) : (
                <RiHeart3Line />
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
