import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import axios from 'axios';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import ErrorModal from '../../util/ErrorModal';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';
import { useLoadingError } from '../../hooks/useLoadingError';
import { useTokenRefresher } from '../../hooks/useTokenRefresher';
import { useCancelReservation } from '../../hooks/useCancelReservation';
import theme from '../../styles/theme';
import { useContentResize } from '../../hooks/useContentResize';

const ContentBox = styled.div`
  background-color: #ededed;
  margin: 1rem 0;

  > * {
    &:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
    }
  }
`;

const ProductBox = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 530px) {
    align-self: flex-start;
  }
`;

const ParagraphBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 1.5rem;
  font-size: 0.9rem;

  > a:hover {
    text-decoration: underline;
  }

  > * {
    &:nth-child(2) {
      padding: 0.5rem 0 1rem;
    }
  }

  @media ${theme.mobile} {
    font-size: 0.8rem;
    margin-top: 0.2rem;

    > * {
      &:nth-child(2) {
        padding: 0.5rem 0 0.7rem;
      }

      &:last-child {
        font-size: 0.8rem;
        margin-top: 0.7rem;
      }
    }
  }
`;

const DateBox = styled.div`
  > * {
    line-height: 1.3;
    font-size: 0.8rem;
  }

  > p > span {
    font-weight: 600;
  }

  @media ${theme.mobile} {
    > * {
      font-size: 0.7rem;
    }
  }
`;

const InformBox = styled.div`
  column-count: 2;
  padding: 0 1rem 1rem;
  display: flex;
  flex-direction: ${props => (props.informResize ? 'column' : 'row')};
  align-items: flex-end;
  justify-content: space-between;

  > * {
    &:last-child {
      margin-top: ${props => (props.informResize ? '0.5rem' : '0')};
    }
  }
`;

const SellerBox = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: center;

  > * {
    margin-left: 1rem;
  }
`;

const PurchaseState = styled.p`
  padding-left: 0.3rem;
  font-family: TRoundWind;
  font-size: 1.2rem;
  font-weight: 600;
`;

const PurchaseDate = styled.p`
  font-size: 0.8rem;

  @media ${theme.mobile} {
    font-size: 0.5rem;
  }
`;

const PurchaseImage = styled.img`
  width: ${props => (props.dateResize ? '150px' : '120px')};
  height: ${props => (props.dateResize ? '170px' : '140px')};

  @media ${theme.mobile} {
    width: 115px;
    height: 135px;
  }
`;

const ExtraButton = styled(Button)`
  margin: ${props =>
    props.informResize
      ? css`
          ${props.cancel ? '0 0 0 0.3rem' : '0 0 0 1rem'};
        `
      : css`
          ${props.cancel ? '0 0 0.5rem 0' : '0 0 0 1rem'};
        `};
  width: 60px;
  height: 27px;
  font-size: 10px;
  font-weight: 400;
`;

const PurchaseManagement = () => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const contentRef = useRef(null);
  const { contentResize: InformResize } = useContentResize(531, contentRef);
  const { contentResize: DateResize } = useContentResize(500, contentRef);
  const { isLoading, onLoading, error, errorHandler, clearError } =
    useLoadingError();
  const { tokenErrorHandler } = useTokenRefresher(auth);
  const [purchaseProduct, setPurchaseProduct] = useState([]);
  const {
    updatedItem,
    showReservaionModal,
    cancelCancellationHandler,
    cancelConfirmHandler,
    cancelReservationHandler,
  } = useCancelReservation(purchaseProduct);

  useEffect(() => {
    onLoading(true);
    axios
      .get(`${url}/order/my/purchase`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          memberId: auth.memberId,
        },
      })
      .then(response => {
        setPurchaseProduct(response.data.productOrders);
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
  }, [auth.token]);

  let currentStatus;
  const StatusHandler = (status, start, end) => {
    if (status === 'DONE') {
      const currentDate = new Date();
      const startDate = new Date(start);
      const endDate = new Date(end);

      if (currentDate < startDate) {
        currentStatus = '예약완료';
      } else if (currentDate > endDate) {
        currentStatus = '사용완료';
      } else {
        currentStatus = '사용중';
      }
    } else {
      if (status === 'CANCELED') {
        currentStatus = '취소';
      }
    }
    return currentStatus;
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Modal
        show={showReservaionModal}
        onCancel={cancelCancellationHandler}
        header="예약을 취소하시겠습니까?"
        footer={
          <>
            <Button sub small width="60px" onClick={cancelCancellationHandler}>
              아니오
            </Button>
            <Button small width="60px" onClick={cancelReservationHandler}>
              예
            </Button>
          </>
        }
      >
        <p>
          해당 상품의 예약이 완전히 취소되며, <br />
          동일한 예약일자에 재예약할 수 없습니다.
        </p>
      </Modal>
      <p>구매관리</p>
      {purchaseProduct.length === 0 && (
        <ContentBox>
          <p>구매한 상품이 없습니다.</p>
        </ContentBox>
      )}
      {updatedItem.map(item => (
        <ContentBox key={item.orderId} ref={contentRef}>
          <div>
            <PurchaseState>
              {StatusHandler(item.status, item.orderStartAt, item.orderEndAt)}
            </PurchaseState>
            <PurchaseDate>주문일자 : {item.orderDate}</PurchaseDate>
          </div>
          <InformBox informResize={InformResize}>
            <ProductBox>
              <PurchaseImage
                src={item.imageUrl}
                alt="구매상품이미지"
                dateResize={DateResize}
              />
              <ParagraphBox>
                <Link to={`/${item.productId}/detail`}>{item.productName}</Link>
                <p>\ {item.price.toLocaleString('ko-KR')}</p>
                <DateBox>
                  {DateResize ? (
                    <>
                      <p>
                        {`대여시작일 |`} <br />
                        <span>{`${item.orderStartAt}`}</span>
                      </p>

                      <p>
                        {`대여종료일 |`} <br />
                        <span> {`${item.orderEndAt}`}</span>
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        대여시작일 | <span>{`${item.orderStartAt}`}</span>
                      </p>
                      <p>
                        대여종료일 | <span>{`${item.orderEndAt}`}</span>
                      </p>
                    </>
                  )}
                </DateBox>
                <SellerBox>
                  {item.sellerNickname}
                  {!InformResize && (
                    <ExtraButton small width="70px">
                      문의하기
                    </ExtraButton>
                  )}
                </SellerBox>
              </ParagraphBox>
            </ProductBox>
            <div>
              {InformResize && (
                <ExtraButton small width="70px">
                  문의하기
                </ExtraButton>
              )}
              {currentStatus === '예약완료' && (
                <ExtraButton
                  cancel
                  small
                  informResize={InformResize}
                  width="70px"
                  onClick={() => cancelConfirmHandler(item.orderId)}
                >
                  예약취소
                </ExtraButton>
              )}
            </div>
          </InformBox>
        </ContentBox>
      ))}
    </>
  );
};

export default PurchaseManagement;
