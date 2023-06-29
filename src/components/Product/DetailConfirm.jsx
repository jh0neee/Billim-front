import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import DetePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/calendar.css';

import Button from '../UI/Button';
import differenceInDays from 'date-fns/differenceInDays';

const ConfirmBox = styled.div`
  display: grid;
  align-items: center;
  background: #ededed;

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

const DetailConfirm = ({ amount, name, alreadyDates }) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const days = differenceInDays(endDate, startDate) + 1;
  const total = (amount * days).toLocaleString('ko-KR');

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

  const rentalDate = `${dateToString(startDate)}  ~  ${dateToString(endDate)}`;

  const handlePayment = () => {
    const paymentUrl = `/${name}/payment`;

    navigate(paymentUrl, { state: { rentalDate, days } });
  };

  return (
    <ConfirmBox>
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
    </ConfirmBox>
  );
};

export default DetailConfirm;
