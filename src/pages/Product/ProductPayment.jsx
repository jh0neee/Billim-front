import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import PaymentInformation from "../../components/Product/PaymentInformation";
import PaymentConfirm from "../../components/Product/PaymentConfirm";
import { HiChevronLeft } from "react-icons/hi";
import { productItems } from "../../data";

const PaymentLayout = styled.div`
  width: 80%;
  margin: 120px auto 0;
  font-family: "SCDream";
`;
const PaymentTitle = styled.div`
  display: flex;
  align-items: center;
  font-family: "TRoundWind";
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
  const loadedContents = productItems.find((item) => item.name === itemName);
  
  const navigate = useNavigate();

  const [tradeSelectedOpt, setTradeSelectedOpt] = useState("");
  const [couponSelectedOpt, setCouponSelectedOpt] = useState("");

  return (
    <PaymentLayout>
      <PaymentTitle>
        <GoBack size='45px' onClick={() => navigate(-1)} />
        확인 및 결제
      </PaymentTitle>
      <PaymentBox>
        <PaymentInformation
          tradeSelectedOpt={tradeSelectedOpt}
          setTradeSelectedOpt={setTradeSelectedOpt}
          couponSelectedOpt={couponSelectedOpt}
          setCouponSelectedOpt={setCouponSelectedOpt}
        />
        <div>
          <PaymentConfirm
            items={loadedContents}
            tradeSelectedOpt={tradeSelectedOpt}
            couponSelectedOpt={couponSelectedOpt}
          />
        </div>
      </PaymentBox>
    </PaymentLayout>
  );
};

export default ProductPayment;
