import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as M from './styles/MyPage.styles';

import axios from 'axios';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import ErrorModal from '../../util/ErrorModal';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';
import { NoneText } from './WishList';
import { Paginate } from '../UI/Pagination';
import { useToastAlert } from '../../hooks/useToastAlert';
import { useLoadingError } from '../../hooks/useLoadingError';
import { useContentResize } from '../../hooks/useContentResize';
import { useTokenRefresher } from '../../hooks/useTokenRefresher';
import { useCancelReservation } from '../../hooks/useCancelReservation';

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
  const { showToast } = useToastAlert();

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
      return showToast('삭제된 상품입니다.', 'warning');
    } else {
      return navigate(`/${id}/detail`);
    }
  };

  const EnterChatRoom = (isDeleted, productId) => {
    if (isDeleted) {
      showToast('삭제된 상품에 대한 문의는 할 수 없습니다.', 'error');
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
        <M.ContentBox key={item.orderId} ref={contentRef}>
          <div>
            <M.PurchaseState>
              {StatusHandler(item.status, item.orderStartAt, item.orderEndAt)}
            </M.PurchaseState>
            <M.PurchaseDate>주문일자 : {item.orderDate}</M.PurchaseDate>
          </div>
          <M.InformBox informResize={InformResize}>
            <M.ProductBox>
              <M.PurchaseImage
                src={item.imageUrl}
                alt={`[상품] ${item.productName}`}
                dateResize={DateResize}
              />
              <M.ParagraphBox>
                <div onClick={() => toProduct(item.deleted, item.productId)}>
                  {item.productName}
                </div>
                <p>\ {item.price.toLocaleString('ko-KR')}</p>
                <M.DateBox>
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
                </M.DateBox>
                <M.SellerBox>
                  {item.sellerNickname}
                  {!InformResize && (
                    <M.ExtraButton
                      small
                      width="70px"
                      onClick={() =>
                        EnterChatRoom(item.deleted, item.productId)
                      }
                    >
                      문의하기
                    </M.ExtraButton>
                  )}
                </M.SellerBox>
              </M.ParagraphBox>
            </M.ProductBox>
            <div>
              {InformResize && (
                <M.ExtraButton
                  small
                  width="70px"
                  onClick={() => EnterChatRoom(item.deleted, item.productId)}
                >
                  문의하기
                </M.ExtraButton>
              )}
              {currentStatus === '예약완료' && (
                <M.ExtraButton
                  cancel
                  small
                  informResize={InformResize}
                  width="70px"
                  onClick={() => cancelConfirmHandler(item.orderId)}
                >
                  예약취소
                </M.ExtraButton>
              )}
            </div>
          </M.InformBox>
        </M.ContentBox>
      ))}
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

export default PurchaseManagement;
