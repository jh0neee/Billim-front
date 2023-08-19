import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import axios from 'axios';
import theme from '../../styles/theme';
import Button from '../UI/Button';
import ErrorModal from '../../util/ErrorModal';
import LoadingSpinner from '../UI/LoadingSpinner';
import SalesDetailInfo from './SalesDetailInfo';
import { useAuth } from '../../hooks/useAuth';
import { HiChevronLeft } from 'react-icons/hi';
import { useLoadingError } from '../../hooks/useLoadingError';
import { useTokenRefresher } from '../../hooks/useTokenRefresher';
import { useCancelReservation } from '../../hooks/useCancelReservation';

const DetailSaleBox = styled.div`
  background-color: #ededed;
  margin: 1rem 0;
  padding: 1rem;
`;

const DetailSalesTitle = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0 !important;
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
        rentalItem ? '1.5rem 0 0' : '2rem 0px 1.5rem'};

      @media ${theme.mobile} {
        padding: 0.5rem 0 0;
      }
    }

    &:last-child {
      padding-top: ${({ rentalItem }) => (rentalItem ? '0.5rem' : 'null')};
    }
  }

  > div {
    display: flex;
    align-items: center;
  }

  @media (max-width: 513px) {
    font-size: 0.7rem;
  }
  @media ${theme.mobile} {
    margin-left: 0;
  }
`;

const SalesImage = styled.img`
  width: 90px;
  height: 100px;

  @media (max-width: 513px) {
    width: 85px;
    height: 95px;
  }
  @media ${theme.mobile} {
    width: 140px;
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

const GoBack = styled(HiChevronLeft)`
  cursor: pointer;
  margin-top: 0.1rem;
`;

const SalesDetailManagement = () => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const navigate = useNavigate();
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

        const sortedWaitingItem = responseData.standbyOrders.sort(
          (a, b) => new Date(a.startAt) - new Date(b.startAt),
        );

        setSalesItem(responseData);
        setRentalItem(responseData.currentOrder);
        setWaitinItem(sortedWaitingItem);
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
      <DetailSalesTitle>
        <GoBack size="40px" onClick={() => navigate(-1)} />
        <p>판매관리</p>
      </DetailSalesTitle>
      <DetailSaleBox>
        <SaleTopBox>
          <SalesImage src={salesItem.imageUrls} alt="상품이미지" />
          <TopTextBox rentalItem={rentalItem}>
            <ProductText to={`/${productId}/detail`}>
              {salesItem.productName}
            </ProductText>
            {rentalItem ? (
              <>
                <p>상태: 대여중</p>
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
