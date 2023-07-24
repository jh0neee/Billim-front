/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import axios from 'axios';
import Modal from '../../components/UI/Modal';
import Button from '../../components/UI/Button';
import ErrorModal from '../../util/ErrorModal';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import PaymentConfirm from '../../components/Product/PaymentConfirm';
import PaymentInformation from '../../components/Product/PaymentInformation';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { HiChevronLeft } from 'react-icons/hi';
import { useLoadingError } from '../../hooks/useLoadingError';

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
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const productId = useParams().productId;
  const {
    rentalDate,
    days,
    image,
    tradeMethod,
    name,
    category,
    price,
    seller,
  } = location.state;

  const [coupon, setCoupon] = useState([]);
  const [tradeSelectedOpt, setTradeSelectedOpt] = useState('');
  const [couponSelectedOpt, setCouponSelectedOpt] = useState('');
  const [formState, inputHandler] = useForm({}, false);
  const { address, address_detail, address_legal } = formState.inputs;
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();

  const [showCancelModal, setShowCancelModal] = useState(false);
  const closeCancelModal = () => {
    setShowCancelModal(false);
    navigate(`/${productId}/detail`);
  };

  useEffect(() => {
    onLoading(true);
    axios
      .get(`${url}/coupon/list`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          memberId: auth.memberId,
        },
      })
      .then(response => {
        const responseData = response.data;

        const coupons = responseData.map(coupon => ({
          ...coupon,
          name: `${coupon.name} (${coupon.rate}%)`,
        }));

        const couponList =
          coupons.length === 0
            ? [{ name: '사용가능한 쿠폰이 없습니다' }]
            : [{ name: '선택하세요' }, ...coupons];

        setCoupon(couponList);
        onLoading(false);
      })
      .catch(err => {
        errorHandler(err);
      });
  }, [auth.token]);

  const onSubmit = e => {
    e.preventDefault();
    const combinedAddress = `${address?.value} ${address_detail?.value} ${address_legal?.value}`; // 전체 주소
    const startAt = rentalDate.slice(0, 10);
    const endAt = rentalDate.slice(15);

    const requestData = {
      couponIssueId: formState.inputs.couponIssueId.value,
      startAt,
      endAt,
      productId: Number(productId),
      usedPoint: formState.inputs.usedPoint.value,
      tradeMethod: formState.inputs.tradeMethod.value,
    };

    if (formState.inputs.tradeMethod.value === 'DELIVERY') {
      requestData.name = formState.inputs.name.value;
      requestData.phone = formState.inputs.phone.value;
      requestData.address = combinedAddress;
    }

    onLoading(true);
    axios
      .post(`${url}/order`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then(response => {
        const paymentData = response.data;

        const IMP = window.IMP;
        IMP.init('imp71210173');

        const data = {
          pg: 'kakaopay.TC0ONETIME',
          pay_method: 'card',
          merchant_uid: paymentData.merchantUid,
          name: paymentData.name,
          amount: paymentData.amount,
        };

        IMP.request_pay(data, async response => {
          if (response.success) {
            try {
              await axios.get(`${url}/payment/complete`, {
                headers: {
                  Authorization: `Bearer ${auth.token}`,
                },
                params: {
                  imp_uid: response.imp_uid,
                  merchant_uid: response.merchant_uid,
                },
              });
              navigate('/mypage/purchase');
            } catch (err) {
              errorHandler(err);
            }
          } else {
            try {
              await axios.get(`${url}/payment/failure`, {
                headers: {
                  Authorization: `Bearer ${auth.token}`,
                },
                params: {
                  merchant_uid: response.merchant_uid,
                },
              });
              setShowCancelModal(true);
              onLoading(false);
            } catch (err) {
              errorHandler(err);
            }
          }
        });
        onLoading(false);
      })
      .catch(err => {
        errorHandler(err);
      });
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showCancelModal}
        header="결제 취소"
        onCancel={closeCancelModal}
        footer={
          <Button small width="60px" onClick={closeCancelModal}>
            확인
          </Button>
        }
      >
        결제가 취소되었습니다.
      </Modal>
      <PaymentLayout onSubmit={onSubmit}>
        {isLoading && <LoadingSpinner asOverlay />}
        <PaymentTitle>
          <GoBack size="45px" onClick={() => navigate(-1)} />
          확인 및 결제
        </PaymentTitle>
        <PaymentBox>
          <PaymentInformation
            tradeMethod={tradeMethod}
            rentalDate={rentalDate}
            coupon={coupon}
            tradeSelectedOpt={tradeSelectedOpt}
            setTradeSelectedOpt={setTradeSelectedOpt}
            couponSelectedOpt={couponSelectedOpt}
            setCouponSelectedOpt={setCouponSelectedOpt}
            onInput={inputHandler}
            formState={formState}
          />
          <div>
            <PaymentConfirm
              coupon={coupon}
              imageUrl={image}
              amount={price}
              tradeMethod={tradeMethod}
              category={category}
              name={name}
              seller={seller}
              days={days}
              tradeSelectedOpt={tradeSelectedOpt}
              couponSelectedOpt={couponSelectedOpt}
              onInput={inputHandler}
            />
          </div>
        </PaymentBox>
      </PaymentLayout>
    </>
  );
};

export default ProductPayment;
