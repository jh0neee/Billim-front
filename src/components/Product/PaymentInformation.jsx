import React, { useState } from "react";
import styled, { css } from "styled-components";
import Dropdown from "../../components/UI/DropDown";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

const PayInformation = styled.div`
  padding: 0.5rem;

  > * {
    margin-left: 0.8rem;
    font-size: 0.9rem;

    &:nth-child(3n + 1) {
      margin-left: 0;
    }
  }
`;

const InformationTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
`;

const InformationBox = styled.div`
  margin: 2rem 0;

  > * {
    margin: 1.3rem;

    &:nth-child(n + 2) {
      margin-left: 2rem;
    }
  }
`;

const PayTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
`;

const TradeDropDown = styled(Dropdown)`
  margin-left: 2.8rem !important;
`;

const PayDelivery = styled.div`
  margin: 2.5rem 0 2rem 2rem;
`;

const DeliveryItems = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr 2.7fr;
  align-items: center;
  margin-top: 1rem;

  ${(props) =>
    props.lyt &&
    css`
      margin-top: -0.45rem;
      grid-template-columns: 6.1fr 1.8fr 1fr;
      justify-items: end;
    `}
  ${(props) =>
    props.small &&
    css`
      margin: -7px;
      grid-template-columns: 2fr 2fr 2.7fr;
      justify-items: start;
    `}
`;

const options = [
  { id: 1, item: "직거래" },
  { id: 2, item: "택배" },
];

const coupon = [
  { id: 1, item: "5% coupon" },
  { id: 2, item: "10% coupon" },
  { id: 3, item: "15% coupon" },
  { id: 4, item: "20% coupon" },
];

const ProductInformation = () => {
  const [selectedOpt, setSelectedOpt] = useState("");
  const [couponselectedOpt, setCouponSelectedOpt] = useState("");

  return (
    <PayInformation>
      <InformationTitle>대여정보</InformationTitle>
      <InformationBox>
        <PayTitle>이용일자</PayTitle>
        <p>23-05-12 ~ 23-05-17</p>
      </InformationBox>
      <InformationBox>
        <PayTitle>거래방법</PayTitle>
        <p></p>
        <TradeDropDown
          options={options}
          selectedOpt={selectedOpt}
          setSelectedOpt={setSelectedOpt}
        />
      </InformationBox>
      <hr />
      <InformationBox>
        {/* //TODO - 사용에 적은 금액이 보유 적립금에서 차감 */}
        <PayTitle>적립금</PayTitle>
        <DeliveryItems small>
          <p>보유적립금</p>
          <Input type='text' element='input' width='10rem' height='1.8rem' />
        </DeliveryItems>
        <DeliveryItems small>
          <p>사용</p>
          <Input type='text' element='input' width='10rem' height='1.8rem' />
          <Button sub small width='80px'>
            사용
          </Button>
        </DeliveryItems>
      </InformationBox>
      <InformationBox>
        <PayTitle>쿠폰</PayTitle>
        <TradeDropDown
          options={coupon}
          selectedOpt={couponselectedOpt}
          setSelectedOpt={setCouponSelectedOpt}
        />
      </InformationBox>
      <hr />
      {selectedOpt === "택배" && (
        <PayDelivery>
          <DeliveryItems>
            <PayTitle>이름</PayTitle>
            <Input
              element='input'
              id='name'
              type='text'
              width='17.5rem'
              placeholder='이름 입력해주세요'
            />
          </DeliveryItems>
          <DeliveryItems>
            <PayTitle>주소</PayTitle>
            <Input
              element='input'
              id='address'
              type='text'
              width='17.5rem'
              placeholder='우편번호'
            />
            <Button sub small width='120px'>
              우편번호 찾기
            </Button>
          </DeliveryItems>
          <DeliveryItems lyt>
            <Input
              element='input'
              type='text'
              id='address_street'
              width='17.5rem'
              placeholder='도로명주소'
            />
          </DeliveryItems>
          <DeliveryItems lyt>
            <Input
              element='input'
              type='text'
              id='address_detail'
              width='17.5rem'
              placeholder='상세주소 입력해주세요'
            />
            <Input
              element='input'
              type='text'
              id='address_legal'
              width='7.5rem'
              placeholder='(법정동)'
            />
          </DeliveryItems>
          <DeliveryItems>
            <PayTitle>전화번호</PayTitle>
            <Input
              element='input'
              id='phone'
              type='text'
              width='17.5rem'
              placeholder='전화번호 입력해주세요'
            />
          </DeliveryItems>
        </PayDelivery>
      )}
    </PayInformation>
  );
};

export default ProductInformation;
