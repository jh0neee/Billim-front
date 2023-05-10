import React, { useState } from "react";
import styled from "styled-components";

import DetePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/calendar.css";

import Button from "../../components/UI/Button";

const ConfirmBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ccc;

  > * {
    margin: 1rem 0;
  }
`;

const DetailComfirm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChangeCalendar = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const dateToString = (date) => {
    if (date === null) return;

    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0")
    );
  };
  return (
    <ConfirmBox>
      <p>\금액 / 일</p>
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
        inline
      />
      <p>
        {dateToString(startDate)} ~ {dateToString(endDate)}
      </p>
      <hr width='75%' />
      <p>대여일</p>
      <p>총 합계</p>
      <Button>결제하기</Button>
    </ConfirmBox>
  );
};

export default DetailComfirm;
