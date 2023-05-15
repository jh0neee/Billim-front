import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import ProductListItem from "../../components/Product/ProductListItem";
import ProductCategory from "../../components/Product/ProductCategory";
import { productItems } from "../../data";

const CategoryLayout = styled.div`
  margin-top: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "TRoundWind";
  font-weight: 700;
`;

const ProductItemLayout = styled.div`
  margin: 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 3.5rem;
  justify-items: center;
  font-family: SCDream;

  >*{
    cursor: pointer;
  }
`;

const ProductList = () => {
  const category = useLocation().pathname.slice(9);

  const items = productItems.filter((item) => {
    return category === "" ? item : item.category === category;
  });

  return (
    <>
      <CategoryLayout>
        <ProductCategory items={items} />
      </CategoryLayout>
      <ProductItemLayout>
        <ProductListItem items={items} />
      </ProductItemLayout>
    </>
  );
};

export default ProductList;
