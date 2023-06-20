import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductListItem from '../../components/Product/ProductListItem';
import ProductCategory from '../../components/Product/ProductCategory';
import { Paginate } from '../../components/UI/Pagination';
import { productItems } from '../../data';
import theme from '../../styles/theme';

const ProductLayout = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const CategoryLayout = styled.div`
  margin-top: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'TRoundWind';
  font-weight: 700;

  @media ${theme.tablet}, ${theme.mobile} {
    margin-top: 150px;
  }
  @media (max-width: 890px) {
    flex-direction: column;
  }
`;

const ProductItemLayout = styled.div`
  margin: 5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, auto));
  row-gap: 3.5rem;
  column-gap: 2.5rem;
  justify-items: center;
  font-family: SCDream;

  > * {
    cursor: pointer;
  }

  @media ${theme.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(200px, auto));
  }
`;

const ProductList = () => {
  const category = useLocation().pathname.slice(9);
  const { searchItems, isSearching } = useSelector(state => state.search);

  const perPage = 20;
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const filteredItems =
      category === ''
        ? productItems
        : productItems.filter(item => item.category === category);

    setItems(isSearching ? searchItems : filteredItems);
    setCount(isSearching ? searchItems.length : filteredItems.length);
    setCurrentItems(
      isSearching
        ? searchItems.slice(0, perPage)
        : filteredItems.slice(0, perPage),
    );
  }, [category, searchItems, isSearching]);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
    const firstItemIndex = (pageNumber - 1) * perPage;
    const lastItemIndex = firstItemIndex + perPage;
    setCurrentItems(items.slice(firstItemIndex, lastItemIndex));
  };

  return (
    <ProductLayout>
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
    </ProductLayout>
  );
};

export default ProductList;
