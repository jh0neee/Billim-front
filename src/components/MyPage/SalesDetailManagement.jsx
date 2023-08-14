import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import axios from 'axios';
import theme from '../../styles/theme';
import Button from '../UI/Button';
import ErrorModal from '../../util/ErrorModal';
import LoadingSpinner from '../UI/LoadingSpinner';
import SalesDetailInfo from './SalesDetailInfo';
import { useAuth } from '../../hooks/useAuth';
import { useLoadingError } from '../../hooks/useLoadingError';
import { useTokenRefresher } from '../../hooks/useTokenRefresher';
import { useCancelReservation } from '../../hooks/useCancelReservation';

const DetailSaleBox = styled.div`
  background-color: #ededed;
  margin: 1rem 0;
  padding: 1rem;
`;

const SaleTopBox = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;

  @media ${theme.mobile} {
    flex-direction: column;
  }
`;

const TopTextBox = styled.div`
  margin-left: 1.5rem;
  font-size: 0.8rem;

  > * {
    &:nth-child(2) {
      padding: ${({ rentalItem }) =>
        rentalItem ? '2rem 0 0' : '2.5rem 0 1.5rem'};

      @media (max-width: 502px) {
        padding: 1.5rem 0 0;
      }
      @media ${theme.mobile} {
        padding: 0.5rem 0 0;
      }
    }

    &:last-child {
      @media ${theme.mobile} {
        padding-top: 0.2rem;
      }
    }
  }

  > div {
    display: flex;
    align-items: center;
  }

  @media (max-width: 502px) {
    font-size: 0.7rem;
  }
  @media ${theme.mobile} {
    margin-left: 0;
  }
`;

const SalesImage = styled.img`
  width: 100px;
  height: 120px;

  @media (max-width: 502px) {
    width: 75px;
    height: 95px;
  }
  @media ${theme.mobile} {
    width: 130px;
    height: 150px;
    margin: 0 0 1rem;
  }
`;

const ProductText = styled(Link)`
  font-size: 0.9rem;
  font-weight: 600;

  @media ${theme.mobile} {
    font-size: 0.8rem;
  }
`;

const ExtraButton = styled(Button)`
  margin: 0 0.5rem 0.1rem;
  width: 55px;
  height: 18px;
  font-size: 10px;
  font-weight: 400;
`;

const SalesDetailManagement = () => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const productId = useParams().productId;
  const [salesItem, setSalesItem] = useState({});
  const [rentalItem, setRentalItem] = useState({});
  const [waitingItem, setWaitinItem] = useState([]);
  const [usedItem, setUsedItem] = useState([]);
  const { tokenErrorHandler } = useTokenRefresher(auth);
  const { isLoading, onLoading, error, errorHandler, clearError } =
    useLoadingError();

  const {
    showReservaionModal,
    cancelCancellationHandler,
    cancelConfirmHandler,
    cancelReservationHandler,
  } = useCancelReservation(
    waitingItem,
    tokenErrorHandler,
    onLoading,
    errorHandler,
  );

  useEffect(() => {
    getSales();
  }, []);

  const getSales = () => {
    onLoading(true);
    axios
      .get(`${url}/order/my/sales/${productId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          memberId: auth.memberId,
        },
      })
      .then(response => {
        const responseData = response.data;
        console.log(responseData);
        setSalesItem(responseData);
        setRentalItem(responseData.currentOrder);
        setWaitinItem(responseData.standbyOrders);
        setUsedItem([
          ...responseData.pastOrders,
          ...responseData.canceledOrders,
        ]);
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
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <p>판매관리</p>
      <DetailSaleBox>
        <SaleTopBox>
          <SalesImage src={salesItem.imageUrls} alt="상품이미지" />
          <TopTextBox rentalItem={rentalItem}>
            <ProductText to={`/${productId}/detail`}>
              {salesItem.productName}
            </ProductText>
            {rentalItem ? (
              <>
                <p>상태: {rentalItem.status}</p>
                <div>
                  <p>구매자: {rentalItem.buyerNickname}</p>
                  {<ExtraButton>채팅하기</ExtraButton>}
                </div>
                <p>{`${rentalItem.startAt} ~ ${rentalItem.endAt}`}</p>
              </>
            ) : (
              <p>현재 대여 중인 상품이 없습니다.</p>
            )}
          </TopTextBox>
        </SaleTopBox>
        <hr />
        <SalesDetailInfo
          label="대기 내역"
          items={waitingItem}
          productId={salesItem.productId}
          showModal={showReservaionModal}
          onConfirm={cancelConfirmHandler}
          onCancellation={cancelCancellationHandler}
          onCancelHandler={() => cancelReservationHandler(getSales)}
          onLoading={onLoading}
          errorHandler={errorHandler}
          tokenErrorHandler={tokenErrorHandler}
        />
        <SalesDetailInfo label="완료 내역" items={usedItem} />
      </DetailSaleBox>
    </>
  );
};

export default SalesDetailManagement;
