import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import { RiHeart3Fill, RiHeart3Line, RiStarSFill } from "react-icons/ri";
import Card from "../UI/Card";
import { useSelector } from "react-redux";

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

const ProductListItem = ({ items }) => {
  const [isWishAdd, setIsWishAdd] = useState(false);
  const isSearching = useSelector((state) => state.search.isSearching);
  const searchItems = useSelector((state) => state.search.searchItems);

  const handleWishlistClick = (item) => {
    setIsWishAdd(!isWishAdd);

    item.likeCount += 1;

    if (item.likeCount === 2) {
      item.likeCount -= 2;
    }
  };

  return (
    <>
      {!isSearching ? (
        items.map((item) => (
          <Card key={item.id} width='169px' height='192px'>
            <Link to={`/${item.name}/detail`}>
              <img
                src='https://via.placeholder.com/169x140'
                alt='상품예시이미지'
              />
            </Link>
            <LikeIcon onClick={() => handleWishlistClick(item)}>
              {item.likeCount === 1 ? (
                <RiHeart3Fill color='red' />
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
          </Card>
        ))
      ) : searchItems.length === 0 ? (
        <span>검색결과가 없습니다.</span>
      ) : (
        <>
          {searchItems.map((item) => (
            <Card key={item.id} width='169px' height='192px'>
              <Link to={`/${item.name}/detail`}>
                <img
                  src='https://via.placeholder.com/169x140'
                  alt='상품예시이미지'
                />
              </Link>
              <LikeIcon onClick={() => handleWishlistClick(item)}>
                {item.likeCount === 1 ? (
                  <RiHeart3Fill color='red' />
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
            </Card>
          ))}
        </>
      )}
    </>
  );
};

export default ProductListItem;
