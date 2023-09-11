import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import axios from 'axios';
import Button from '../UI/Button';
import ErrorModal from '../../util/ErrorModal';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';
import { Paginate } from '../UI/Pagination';
import { useLoadingError } from '../../hooks/useLoadingError';
import { useTokenRefresher } from '../../hooks/useTokenRefresher';

export const SaleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SaleLayout = styled.div`
  margin: 3rem 0.5rem 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 3rem;
  justify-items: center;

  @media (max-width: 1110px) {
    grid-template-columns: 1.5fr 1.5fr;
  }
  @media (max-width: 512px) {
    grid-template-columns: 1fr;
  }

  > * {
    cursor: pointer;
  }
`;

const NoneText = styled.div`
  text-align: center;
  margin-top: 7rem;
  line-height: 1.5;

  > * {
    &:last-child {
      font-size: 0.8rem;
    }
  }
`;

const SaleBox = styled.div`
  position: relative;
  display: inline-block;
`;

const SaleImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 10px;
  border: 1px solid lightgray;

  @media (max-width: 1280px) {
    width: 140px;
    height: 140px;
  }

  @media (min-width: 950px) and (max-width: 1110px), (max-width: 512px) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: 512px) {
    width: 220px;
    height: 220px;
  }
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 98%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: white;
  font-size: 16px;
  text-align: center;
  padding-top: 50%;
  pointer-events: none;
  transition: opacity 0.3s;

  ${SaleBox}:hover & {
    opacity: 1;
  }
`;

export const EnrollButton = styled(Button)`
  margin: 0 2rem 0 0;
  width: 60px;
  height: 27px;
  font-size: 10px;
  font-weight: 400;

  @media (max-width: 512px) {
    margin: 0;
  }
`;

const SalesManagement = () => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const [loadedData, setLoadedData] = useState([]);
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();
  const { tokenErrorHandler } = useTokenRefresher(auth);

  const perPage = 6;
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    onLoading(true);
    axios
      .get(`${url}/order/my/sales?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          memberId: auth.memberId,
        },
      })
      .then(response => {
        setLoadedData(response.data.content);
        setCount(response.data.totalElements);
        onLoading(false);
      })
      .catch(err => {
        if (
          err.response.status === 401 &&
          err.response.data.code !== 'INVALID_EMAIL_PASSWORD'
        ) {
          tokenErrorHandler(err);
          onLoading(false);
        } else {
          errorHandler(err);
        }
      });
  }, [currentPage]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <SaleHeader>
        <p>판매중인 상품</p>
        <EnrollButton to="/product/new">상품 등록</EnrollButton>
      </SaleHeader>
      {count === 0 ? (
        <NoneText>
          <p>새로운 상품을 등록해보세요! </p>
          <p>&apos;상품 등록&apos; 버튼을 통해 당신의 물건을 공유해보세요.</p>
        </NoneText>
      ) : (
        <SaleLayout>
          {loadedData.map(item => (
            <SaleBox key={item.productId}>
              <Link to={`/mypage/sales/${item.productId}`}>
                <SaleImage src={item.imageUrl} alt="상품이미지" />
                <TextOverlay>{item.productName}</TextOverlay>
              </Link>
            </SaleBox>
          ))}
        </SaleLayout>
      )}
      {count > 0 && (
        <Paginate
          activePage={currentPage}
          itemsCountPerPage={perPage}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      )}
    </>
  );
};

export default SalesManagement;
