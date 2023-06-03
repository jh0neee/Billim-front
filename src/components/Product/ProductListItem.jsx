import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { RiHeart3Fill, RiHeart3Line, RiStarSFill } from 'react-icons/ri';
import Card from '../UI/Card';

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
  font-size: 14.5px;
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
          <Card key={item.id} width="247px" height="323px" border="none">
            <Link to={`/${item.name}/detail`}>
              <img
                src="https://via.placeholder.com/247x233"
                alt="상품예시이미지"
              />
            </Link>
            <LikeIcon onClick={() => handleWishlistClick(item)}>
              {item.likeCount === 1 ? (
                <RiHeart3Fill color="red" />
              ) : (
                <RiHeart3Line />
              )}
            </LikeIcon>
            <Link to={`/${item.name}/detail`}>
              <ProductItemBox>
                <ProductParagraph>{item.name}</ProductParagraph>
                <ProductParagraph>
                  <RiStarSFill />
                  {item.scope}
                </ProductParagraph>
              </ProductItemBox>
              <ProductParagraph amount>
                \ {item.amount.toLocaleString('ko-KR')} /일
              </ProductParagraph>
            </Link>
          </Card>
        ))
      )}
    </>
  );
};

export default ProductListItem;
