import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import DetePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/calendar.css';

import Button from '../UI/Button';
import differenceInDays from 'date-fns/differenceInDays';
import { useToastAlert } from '../../hooks/useToastAlert';

const ConfirmBox = styled.div`
  background: #ededed;

  > div {
    max-width: 405px;
    margin: 0 auto;
    display: grid;
    align-items: center;

    > * {
      margin: 0.7rem 0px;

      &:nth-child(-n + 3),
      &:last-child {
        margin: 1rem auto;
      }

      &:nth-child(6) {
        font-weight: 600;
        font-size: 18px;
      }
    }
  }
`;

const PaymentBox = styled.div`
  padding: 0 2.5rem;
  font-size: 15px;

  .left {
    float: left;
  }

  .right {
    float: right;
  }
`;

const DetailConfirm = ({
  image,
  tradeMethod,
  name,
  seller,
  sellerId,
  buyerId,
  category,
  amount,
  productId,
  alreadyDates,
}) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const days = differenceInDays(endDate, startDate) + 1;
  const total = (amount * days).toLocaleString('ko-KR');
  const { showToast } = useToastAlert();

  const onChangeCalendar = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const dateToString = date => {
    if (date === null) return '';

    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      date.getDate().toString().padStart(2, '0')
    );
  };

  const disabledDates = alreadyDates.map(dateString => new Date(dateString));

  const rentalDate =
    startDate || endDate
      ? `${dateToString(startDate)}  ~  ${dateToString(endDate)}`
      : null;

  const handlePayment = () => {
    if (startDate === null || endDate === null) {
      showToast('날짜를 선택해주세요', 'warning');
      return;
    }

    if (sellerId === buyerId) {
      showToast('판매자는 구입할 수 없는 상품입니다.', 'error');
      return;
    }

    const disabledDateExists = disabledDates.some(date => {
      return startDate <= date && endDate >= date;
    });

    if (disabledDateExists) {
      showToast(
        '예약할 수 없는 날짜가 선택되었습니다.\n확인 후 다시 선택해주세요.',
        'warning',
      );
      return;
    }

    const paymentUrl = `/${productId}/payment`;

    navigate(paymentUrl, {
      state: {
        rentalDate,
        days,
        image,
        tradeMethod,
        name,
        category,
        price: amount,
        seller,
      },
    });
  };

  return (
    <ConfirmBox>
      <div>
        <DetePicker
          showIcon
          selected={startDate}
          onChange={onChangeCalendar}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          minDate={new Date()}
          locale={ko}
          isClearable={true}
          excludeDates={disabledDates}
          inline
        />
        <p>{rentalDate}</p>
        <hr width="75%" />
        <PaymentBox>
          <p className="left">\ {amount?.toLocaleString('ko-KR')} / 일</p>
          <p className="right">\ {amount?.toLocaleString('ko-KR')}</p>
        </PaymentBox>
        <PaymentBox>
          <p className="left">대여일</p>
          <p className="right">{isNaN(days) ? '0일' : days + '일'}</p>
        </PaymentBox>
        <PaymentBox>
          <p className="left">총 합계</p>
          <p className="right">{isNaN(days) ? '￦ 0' : '￦ ' + total}</p>
        </PaymentBox>
        <Button onClick={handlePayment}>결제하기</Button>
      </div>
    </ConfirmBox>
  );
};

export default DetailConfirm;
