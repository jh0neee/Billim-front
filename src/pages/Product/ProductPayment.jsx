import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import PaymentInformation from '../../components/Product/PaymentInformation';
import PaymentConfirm from '../../components/Product/PaymentConfirm';
import { HiChevronLeft } from 'react-icons/hi';
import { productItems } from '../../data';
import { useForm } from '../../hooks/useForm';

const PaymentLayout = styled.form`
  width: 80%;
  margin: 120px auto 0;
  font-family: 'SCDream';
`;
const PaymentTitle = styled.div`
  display: flex;
  align-items: center;
  font-family: 'TRoundWind';
  font-size: 1.65rem;
  font-weight: 700;
`;

const GoBack = styled(HiChevronLeft)`
  cursor: pointer;
`;

const PaymentBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 1.5rem;
  padding: 2.5rem 0px;
`;

const ProductPayment = () => {
  const itemName = useParams().itemName;
  const loadedContents = productItems.find(item => item.name === itemName);
  const [formState, inputHandler] = useForm({}, false);

  const navigate = useNavigate();

  const [tradeSelectedOpt, setTradeSelectedOpt] = useState('');
  const [couponSelectedOpt, setCouponSelectedOpt] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <PaymentLayout onSubmit={onSubmit}>
      <PaymentTitle>
        <GoBack size="45px" onClick={() => navigate(-1)} />
        확인 및 결제
      </PaymentTitle>
      <PaymentBox>
        <PaymentInformation
          items={loadedContents}
          tradeSelectedOpt={tradeSelectedOpt}
          setTradeSelectedOpt={setTradeSelectedOpt}
          couponSelectedOpt={couponSelectedOpt}
          setCouponSelectedOpt={setCouponSelectedOpt}
          onInput={inputHandler}
          formState={formState}
        />
        <div>
          <PaymentConfirm
            items={loadedContents}
            tradeSelectedOpt={tradeSelectedOpt}
            couponSelectedOpt={couponSelectedOpt}
            onInput={inputHandler}
          />
        </div>
      </PaymentBox>
    </PaymentLayout>
  );
};

export default ProductPayment;
