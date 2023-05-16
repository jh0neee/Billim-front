import React from "react";
import styled from "styled-components";

import { TbUserCircle } from "react-icons/tb";
import Button from "../UI/Button";
import Card from "../UI/Card";

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

  > * {
    &:last-child {
      display: none;
    }
  }
`;

const ExtraButton = styled(Button)`
  margin-left: 0.5rem;
  width: 55px;
  height: 18px;
  font-size: 10px;
  font-weight: 400;
`;

const SalesDetailInfo = ({ label, items }) => {
  return (
    <SaleInfoLayout>
      <p>{label}</p>
      <ListCard width='95%'>
        {items.map((item) => (
          <>
            <SaleBottomBox>
              <BuyerInfo>
                <TbUserCircle size='70px' />
                <BottomTextBox status={item.status}>
                  <p>구매자: {item.customer}</p>
                  <p>거래방법: {item.trade}</p>
                  <p>대여기간: {item.date}</p>
                </BottomTextBox>
              </BuyerInfo>
              <div>
                {item.status === "대기중" ? (
                  <ExtraButton>취소하기</ExtraButton>
                ) : null}
                {item.status !== "취소" ? (
                  <ExtraButton>채팅하기</ExtraButton>
                ) : null}
              </div>
            </SaleBottomBox>
            <hr width='100%' />
          </>
        ))}
      </ListCard>
    </SaleInfoLayout>
  );
};

export default SalesDetailInfo;
