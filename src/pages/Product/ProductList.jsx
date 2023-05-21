import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductListItem from "../../components/Product/ProductListItem";
import ProductCategory from "../../components/Product/ProductCategory";
import { Paginate } from "../../components/UI/Pagination";
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

  > * {
    cursor: pointer;
  }
`;

const ProductList = () => {
  const category = useLocation().pathname.slice(9);
  const { searchItems, isSearching } = useSelector((state) => state.search);

  const perPage = 5;
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const filteredItems =
      category === ""
        ? productItems
        : productItems.filter((item) => item.category === category);

    setItems(isSearching ? searchItems : filteredItems);
    setCount(isSearching ? searchItems.length : filteredItems.length);
    setCurrentItems(
      isSearching
        ? searchItems.slice(0, perPage)
        : filteredItems.slice(0, perPage)
    );
  }, [category, searchItems, isSearching]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const firstItemIndex = (pageNumber - 1) * perPage;
    const lastItemIndex = firstItemIndex + perPage;
    setCurrentItems(items.slice(firstItemIndex, lastItemIndex));
  };

  return (
    <>
      <CategoryLayout>
        <ProductCategory />
      </CategoryLayout>
      <ProductItemLayout>
        <ProductListItem items={currentItems} />
      </ProductItemLayout>
      {currentItems.length > 0 && (
        <Paginate
          activePage={currentPage}
          itemsCountPerPage={perPage}
          totalItemsCount={items.length}
          pageRangeDisplayed={Math.ceil(count / perPage)}
          onChange={handlePageChange}
        />
      )}
    </>
  );
};

export default ProductList;
