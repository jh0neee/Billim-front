import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from 'axios';
import theme from '../../styles/theme';
import ErrorModal from '../../util/ErrorModal';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ProductListItem from '../../components/Product/ProductListItem';
import ProductCategory from '../../components/Product/ProductCategory';
import { Paginate } from '../../components/UI/Pagination';
import { useLoadingError } from '../../hooks/useLoadingError';

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
  const url = process.env.REACT_APP_URL;
  const category = useLocation().pathname.slice(9);
  const { searchValue } = useSelector(state => state.search);
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();

  const perPage = 20;
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  let requestUrl = `${url}/product/list/search?page=${currentPage}`;

  if (searchValue) {
    requestUrl += `&category&keyword=${searchValue}`;
  } else {
    requestUrl += `&category=${category}&keyword`;
  }

  useEffect(() => {
    onLoading(true);
    axios
      .get(requestUrl)
      .then(response => {
        if (response.status === 200) {
          setItems(response.data.content);
          setCount(response.data.totalElements);
        } else {
          errorHandler(response);
        }
        onLoading(false);
      })
      .catch(err => {
        errorHandler(err);
      });
  }, [requestUrl]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <ProductLayout>
        {isLoading && <LoadingSpinner asOverlay />}
        <CategoryLayout>
          <ProductCategory />
        </CategoryLayout>
        <ProductItemLayout>
          <ProductListItem items={items} />
        </ProductItemLayout>
        {items.length > 0 && (
          <Paginate
            activePage={currentPage}
            itemsCountPerPage={perPage}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        )}
      </ProductLayout>
    </>
  );
};

export default ProductList;
