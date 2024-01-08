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
  @media (max-width: 988px) {
    flex-direction: column;
  }
`;

const ProductItemLayout = styled.div`
  margin: 4rem 5rem 5rem;
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

const SearchBox = styled.div`
  background: #f7f7f7;
  width: 85%;
  height: 4.7rem;
  padding: 1rem;
  margin: 2rem auto 0;
  text-align: center;

  > p {
    line-height: 1.4;
  }

  > * {
    &:first-child {
      > span {
        font-weight: 700;
        font-family: 'SCDream';
      }
    }

    &:last-child {
      font-size: 0.9rem;
    }
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
        {searchValue !== null &&
          (searchValue && items.length !== 0 ? (
            <SearchBox>
              <p>
                &apos;<span>{searchValue}</span>&apos;에 대한 검색결과입니다.
              </p>
              <p>{items.length}개의 상품이 검색되었습니다.</p>
            </SearchBox>
          ) : (
            <SearchBox>
              <p>
                &apos;<span>{searchValue}</span>&apos;에 대한 검색결과가
                없습니다.
              </p>
              <p>정확한 검색어인지 확인하고 다시 시도해 주세요.</p>
            </SearchBox>
          ))}
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
