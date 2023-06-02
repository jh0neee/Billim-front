import React, { useState } from "react";
import styled from "styled-components";

import Button from "../UI/Button";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import { Profile } from "../UI/Profile";

const SaleInfoLayout = styled.div`
  margin: 3rem 0 0;

  > p {
    margin-left: 1.3rem;
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const SaleBottomBox = styled.div`
  column-count: 2;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  > * {
    &:last-child {
      > button {
        margin-bottom: 0;
      }
    }
  }
`;

const BuyerInfo = styled.div`
  display: flex;
  align-items: center;
`;

const BottomTextBox = styled.div`
  margin-left: 1rem;
  font-size: 0.8rem;

  > p {
    padding-bottom: 0.25rem;
    text-decoration-line: ${(props) =>
      props.status === "취소" ? "line-through" : "none"};
    text-decoration-thickness: 1px;
    text-decoration-color: #ec0b0b;
  }
`;

const ListCard = styled(Card)`
  background-color: white;
  border: none;
  margin: 1rem auto;
  padding: 1rem;

  > hr:last-child {
    display: none;
  }
`;

const ExtraButton = styled(Button)`
  margin-left: 0.5rem;
  width: 55px;
  height: 18px;
  font-size: 10px;
  font-weight: 400;
`;

const SalesDetailInfo = ({ label, salesItems, setSalesItems, items }) => {
  const [selectedId, setSelectedId] = useState("");
  const [showReservaionModal, setShowReservationModal] = useState(false);

  const cancelCancellationHandler = () => {
    setShowReservationModal(false);
  };
  const cancelConfirmHandler = (id) => {
    setShowReservationModal(true);
    setSelectedId(id);
  };

  const cancelReservationHandler = () => {
    setShowReservationModal(false);
    const updatedItem = salesItems.map((item) =>
      item.id === selectedId ? { ...item, status: "취소" } : item
    );

    setSalesItems(updatedItem);
  };

  return (
    <>
      <Modal
        show={showReservaionModal}
        onCancel={cancelCancellationHandler}
        header='예약을 취소하시겠습니까?'
        footer={
          <>
            <Button sub small width='60px' onClick={cancelCancellationHandler}>
              아니오
            </Button>
            <Button small width='60px' onClick={cancelReservationHandler}>
              예
            </Button>
          </>
        }>
        <p>
          해당 상품의 예약이 완전히 취소되며, <br />
          이후 같은 날짜의 재예약은 불가능할 수 있습니다.
        </p>
      </Modal>
      <SaleInfoLayout>
        <p>{label}</p>
        <ListCard width='95%'>
          {items.length === 0 ? (
            <p>{label}이 없습니다.</p>
          ) : (
            items.map((item) => (
              <>
                <SaleBottomBox key={item.id}>
                  <BuyerInfo>
                    <Profile size='70px' />
                    <BottomTextBox status={item.status}>
                      <p>구매자: {item.customer}</p>
                      <p>거래방법: {item.trade}</p>
                      <p>대여기간: {item.date}</p>
                    </BottomTextBox>
                  </BuyerInfo>
                  {item.status === "대기중" ? (
                    <div>
                      <ExtraButton
                        onClick={() => cancelConfirmHandler(item.id)}>
                        취소하기
                      </ExtraButton>
                      <ExtraButton>채팅하기</ExtraButton>
                    </div>
                  ) : null}
                </SaleBottomBox>
                <hr width='100%' />
              </>
            ))
          )}
        </ListCard>
      </SaleInfoLayout>
    </>
  );
};

export default SalesDetailInfo;
