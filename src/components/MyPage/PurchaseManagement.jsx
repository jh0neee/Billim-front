import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import axios from 'axios';
import Modal from '../UI/Modal';
import theme from '../../styles/theme';
import Button from '../UI/Button';
import ErrorModal from '../../util/ErrorModal';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';
import { NoneText } from './WishList';
import { Paginate } from '../UI/Pagination';
import { useLoadingError } from '../../hooks/useLoadingError';
import { useTokenRefresher } from '../../hooks/useTokenRefresher';
import { useCancelReservation } from '../../hooks/useCancelReservation';
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
    &:first-child {
      cursor: pointer;
    }

    &:first-child:hover {
      text-decoration: underline;
    }

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
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const { contentResize: InformResize } = useContentResize(531, contentRef);
  const { contentResize: DateResize } = useContentResize(500, contentRef);

  const perPage = 4;
  const [purchaseProduct, setPurchaseProduct] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, onLoading, error, errorHandler, clearError } =
    useLoadingError();
  const { tokenErrorHandler } = useTokenRefresher(auth);
  const {
    showReservaionModal,
    cancelCancellationHandler,
    cancelConfirmHandler,
    cancelReservationHandler,
  } = useCancelReservation(
    purchaseProduct,
    tokenErrorHandler,
    onLoading,
    errorHandler,
  );

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getPurchase();
  }, [currentPage]);

  const getPurchase = () => {
    onLoading(true);
    axios
      .get(`${url}/order/my/purchase`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          memberId: auth.memberId,
          page: currentPage,
        },
      })
      .then(response => {
        setPurchaseProduct(response.data.content);
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
  };

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

  const toProduct = (isDeleted, id) => {
    if (isDeleted) {
      return alert('삭제된 상품입니다.');
    } else {
      return navigate(`/${id}/detail`);
    }
  };

  const EnterChatRoom = (isDeleted, productId) => {
    if (isDeleted) {
      alert('삭제된 상품에 대한 문의는 할 수 없습니다.');
      return;
    }

    axios
      .post(
        `${url}/api/chat/room/product/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          params: {
            memberId: auth.memberId,
          },
        },
      )
      .then(response => {
        const { chatRoomId } = response.data;

        if (chatRoomId) {
          navigate(`/chat/messages/${chatRoomId}`);
        }
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
      <Modal
        show={showReservaionModal}
        onCancel={cancelCancellationHandler}
        header="예약을 취소하시겠습니까?"
        footer={
          <>
            <Button sub small width="60px" onClick={cancelCancellationHandler}>
              아니오
            </Button>
            <Button
              small
              width="60px"
              onClick={() => cancelReservationHandler(getPurchase)}
            >
              예
            </Button>
          </>
        }
      >
        <p>
          해당 상품의 예약이 완전히 취소되며, <br />
          동일한 예약일자에 재예약할 수 있습니다.
        </p>
      </Modal>
      <p>구매관리</p>
      {count === 0 && <NoneText>구매한 상품이 없습니다.</NoneText>}
      {purchaseProduct.map(item => (
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
                <div onClick={() => toProduct(item.deleted, item.productId)}>
                  {item.productName}
                </div>
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
                    <ExtraButton
                      small
                      width="70px"
                      onClick={() =>
                        EnterChatRoom(item.deleted, item.productId)
                      }
                    >
                      문의하기
                    </ExtraButton>
                  )}
                </SellerBox>
              </ParagraphBox>
            </ProductBox>
            <div>
              {InformResize && (
                <ExtraButton
                  small
                  width="70px"
                  onClick={() => EnterChatRoom(item.deleted, item.productId)}
                >
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
      {count > 0 && (
        <Paginate
          activePage={currentPage}
          itemsCountPerPage={perPage}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          isPageStyle={true}
        />
      )}
    </>
  );
};

export default PurchaseManagement;
