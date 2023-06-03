import React from 'react';
import styled from 'styled-components';

import Button from '../UI/Button';
import Modal from '../UI/Modal';
import { purchasedProduct } from '../../data';
import { useCancelReservation } from '../../hooks/useCancelReservation';

const ContentBox = styled.div`
  background-color: #ededed;
  margin: 1rem 0;

  > * {
    &:first-child {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
    }
  }
`;

const ProductBox = styled.div`
  display: flex;
`;

const ParagraphBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 1.5rem;
  font-size: 0.9rem;

  > * {
    &:first-child {
      padding-bottom: 0.5rem;
    }
  }
`;

const InformBox = styled.div`
  column-count: 2;
  padding: 0 1rem 1rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const SellerBox = styled.div`
  margin-top: 1.3rem;

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
`;

const CancelButton = styled(Button)`
  margin-bottom: 1rem;
`;

const PurchaseManagement = () => {
  const {
    updatedItem,
    showReservaionModal,
    cancelCancellationHandler,
    cancelConfirmHandler,
    cancelReservationHandler,
  } = useCancelReservation(purchasedProduct);

  return (
    <>
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
      {updatedItem.map(item => (
        <ContentBox key={item.id}>
          <div>
            <PurchaseState>{item.status}</PurchaseState>
            <PurchaseDate>주문일시 : {item.date}</PurchaseDate>
          </div>
          <InformBox>
            <ProductBox>
              <img
                src="https://via.placeholder.com/100x120"
                alt="상품예시이미지"
              />
              <ParagraphBox>
                <p>{item.name}</p>
                <p>\ {item.amount.toLocaleString('ko-KR')}</p>
                <SellerBox>
                  {item.seller}
                  <Button small width="70px">
                    문의하기
                  </Button>
                </SellerBox>
              </ParagraphBox>
            </ProductBox>
            {item.status === '예약완료' && (
              <CancelButton
                small
                width="70px"
                onClick={() => cancelConfirmHandler(item.id)}
              >
                예약취소
              </CancelButton>
            )}
          </InformBox>
        </ContentBox>
      ))}
    </>
  );
};

export default PurchaseManagement;
