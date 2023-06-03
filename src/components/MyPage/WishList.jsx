import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { RiHeart3Fill, RiHeart3Line, RiStarSFill } from 'react-icons/ri';
import { productItems } from '../../data';

const WishListLayout = styled.div`
  margin: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 3rem;
  justify-items: center;

  > * {
    cursor: pointer;
  }
`;

const NoneText = styled.p`
  text-align: center;
  margin-top: 7rem;
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;

  > p {
    margin: 0.5rem 0px;
    font-size: 0.8rem;
  }
`;

const ProductItemBox = styled.div`
  margin: 8px 7px 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikeIcon = styled.div`
  position: absolute;
  margin-top: 0.4rem;
  margin-left: 9.2rem;
  font-size: 18px;
`;

const ProductParagraph = styled.p`
  font-size: 12px;

  ${props =>
    props.amount &&
    css`
      margin: 0 10px;
    `}
`;

const WishList = () => {
  const [isWishAdd, setIsWishAdd] = useState(false);
  const favoriteItems = productItems.filter(item => item.likeCount === 1);

  const handleWishlistClick = item => {
    setIsWishAdd(!isWishAdd);

    item.likeCount += 1;

    if (item.likeCount === 2) {
      item.likeCount -= 2;
    }
  };

  return (
    <>
      <p>관심상품</p>
      {favoriteItems.length === 0 ? (
        <NoneText>관심상품이 없습니다.</NoneText>
      ) : (
        <WishListLayout>
          {favoriteItems.map(item => (
            <ListBox key={item.id}>
              <Link to={`/${item.name}/detail`}>
                <img
                  src="https://via.placeholder.com/169x140"
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
                <ProductParagraph amount>\ {item.amount} /일</ProductParagraph>
              </Link>
            </ListBox>
          ))}
        </WishListLayout>
      )}
    </>
  );
};

export default WishList;
