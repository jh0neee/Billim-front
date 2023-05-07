import React, { useState } from "react";
import styled, { css } from "styled-components";

import { RiHeart3Fill, RiHeart3Line, RiStarSFill } from "react-icons/ri";
import Card from "../UI/Card";

const ProductItemBox = styled.div`
  margin: 8px 7px 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikeIcon = styled.div`
  position: absolute;
  top: 9px;
  left: 142px;
  font-size: 18px;
`;

const ProductParagraph = styled.p`
  font-size: 12px;

  ${(props) =>
    props.amount &&
    css`
      margin: 0 10px;
    `}
`;

const ProductListItem = (props) => {
  const [isWishAdd, setIsWishAdd] = useState(false);

  const handleWishlistClick = (item) => {
    setIsWishAdd(!isWishAdd);

    item.likeCount += 1;

    if (item.likeCount === 2) {
      item.likeCount -= 2;
    }
  };

  return (
    <>
      {props.items.map((item) => (
        <Card key={item.id} width='169px' height='192px'>
          <img src='https://via.placeholder.com/169x140' alt='상품예시이미지' />
          <LikeIcon onClick={() => handleWishlistClick(item)}>
            {item.likeCount === 1 ? (
              <RiHeart3Fill color='red' />
            ) : (
              <RiHeart3Line />
            )}
          </LikeIcon>
          <ProductItemBox>
            <ProductParagraph>{item.name}</ProductParagraph>
            <ProductParagraph>
              <RiStarSFill />
              {item.scope}
            </ProductParagraph>
          </ProductItemBox>
          <ProductParagraph amount>\ {item.amount} /일</ProductParagraph>
        </Card>
      ))}
    </>
  );
};

export default ProductListItem;
