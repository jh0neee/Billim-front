import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import axios from 'axios';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Modal from '../UI/Modal';
import { Profile } from '../UI/Profile';
import { useAuth } from '../../hooks/useAuth';
import SmallListPagination from '../UI/SmallListPagination';

const SaleInfoLayout = styled.div`
  margin: 3rem 0 0;

  > p {
    margin-left: 1.3rem;
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const SaleBottomBox = styled.div`
  display: flex;

  > * {
    &:last-child {
      > button {
        margin-bottom: 0;
      }
    }
  }

  @media (min-width: 1101px) {
    column-count: 2;
    align-items: flex-end;
    justify-content: space-between;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BuyerInfo = styled.div`
  display: flex;
  align-items: center;

  @media (min-width: 500px) and (max-width: 1100px) {
    width: 100%;
  }
`;

const EmptyParagraph = styled.p`
  font-size: 0.7rem;

  @media (min-width: 811px) {
    font-size: 0.8rem;
  }

  @media (max-width: 400px) {
    font-size: 0.6rem;
  }
`;

const BottomTextBox = styled.div`
  margin-left: 0.7rem;
  font-size: 0.7rem;

  > p {
    padding-bottom: 0.25rem;
    text-decoration-line: ${props =>
      props.status === 'CANCELED' ? 'line-through' : 'none'};
    text-decoration-thickness: 1px;
    text-decoration-color: #ec0b0b;
  }

  > * {
    &:last-child {
      padding-top: 0.25rem;
      padding-bottom: 0;
    }
  }

  @media (min-width: 811px) {
    font-size: 0.8rem;
  }

  @media (max-width: 400px) {
    font-size: 0.6rem;
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

const ButtonBox = styled.div`
  @media (min-width: 500px) and (max-width: 1100px) {
    width: 71px;
  }

  @media (max-width: 500px) {
    align-self: flex-end;
  }
`;

const ExtraButton = styled(Button)`
  margin-left: 0.5rem;
  width: 55px;
  height: 18px;
  font-size: 10px;
  font-weight: 400;

  @media (min-width: 500px) and (max-width: 1100px) {
    margin-right: 0.5rem;
  }
`;

const SalesDetailInfo = ({
  label,
  items,
  productId,
  showModal,
  onConfirm,
  onCancellation,
  onCancelHandler,
  onLoading,
  errorHandler,
  tokenErrorHandler,
}) => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const navigate = useNavigate();

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  const EnterChatRoom = buyerId => {
    axios
      .post(
        `${url}/api/chat/room/product/${productId}/${buyerId}`,
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
      <Modal
        show={showModal}
        onCancel={onCancellation}
        header="예약을 취소하시겠습니까?"
        footer={
          <>
            <Button sub small width="60px" onClick={onCancellation}>
              아니오
            </Button>
            <Button small width="60px" onClick={onCancelHandler}>
              예
            </Button>
          </>
        }
      >
        <p>
          예약 취소하면 구매자와의 거래가 중단되며 <br />
          해당 예약을 되돌릴 수 없습니다. <br />
          취소하기 전 구매자와의 소통 후 진행해주세요.
        </p>
      </Modal>
      <SaleInfoLayout>
        <p>{label}</p>
        <ListCard width="95%">
          {items.length === 0 ? (
            <EmptyParagraph>현재 {label}이 없습니다.</EmptyParagraph>
          ) : (
            currentItems.map(item => (
              <>
                <SaleBottomBox key={item.orderId}>
                  <BuyerInfo>
                    <Profile size="45px" src={item.buyerProfileImageUrl} />
                    <BottomTextBox status={item.status}>
                      <p>구매자: {item.buyerNickname}</p>
                      <p>거래방법: {item.tradeMethods}</p>
                      <p>{`${item.startAt} ~ ${item.endAt}`}</p>
                    </BottomTextBox>
                  </BuyerInfo>
                  {label === '대기 내역' && item.status === 'DONE' ? (
                    <ButtonBox>
                      <ExtraButton onClick={() => EnterChatRoom(item.buyerId)}>
                        채팅하기
                      </ExtraButton>
                      <ExtraButton onClick={() => onConfirm(item.orderId)}>
                        취소하기
                      </ExtraButton>
                    </ButtonBox>
                  ) : null}
                </SaleBottomBox>
                <hr width="100%" />
              </>
            ))
          )}
        </ListCard>
      </SaleInfoLayout>
      <SmallListPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default SalesDetailInfo;
