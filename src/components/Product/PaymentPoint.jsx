import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import axios from 'axios';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { useAuth } from '../../hooks/useAuth';
import { pointAction } from '../../store/point';
import { GrPowerReset } from 'react-icons/gr';
import { useLoadingError } from '../../hooks/useLoadingError';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import { toast, ToastContainer } from 'react-toastify';

const PointLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1.3fr 1fr;
  align-items: center;
  justify-items: start;
  margin-top: 1rem;
  margin: 5px;
`;

const ResetButton = styled(GrPowerReset)`
  cursor: pointer;
`;

const PaymentPoint = ({ onInput, formState }) => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const dispatch = useDispatch();
  const remainingPoints = useSelector(state => state.point.remainingPoint);

  const [point, setPoint] = useState(0);
  const [isBtnEnabled, setIsBtnEnabled] = useState(true);
  const [resetInput, setResetInput] = useState(false);
  const { onLoading, errorHandler } = useLoadingError();

  useEffect(() => {
    onLoading(true);
    axios
      .get(`${url}/point/available`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          memberId: auth.memberId,
        },
      })
      .then(response => {
        const pointData = response.data;
        setPoint(pointData);
        dispatch(pointAction.updatePoints(pointData));
        onLoading(false);
      })
      .catch(err => {
        errorHandler(err);
      });
  }, [dispatch]);

  const applyUsageAmount = () => {
    const usageAmount = formState.inputs.use_point.value;

    if (usageAmount <= remainingPoints) {
      dispatch(pointAction.usePoints(usageAmount));
      setIsBtnEnabled(false);
    } else {
      toast.error('사용가능 적립금보다 많습니다.');
    }
  };

  const resetUsageAmount = () => {
    dispatch(pointAction.updatePoints(point));
    dispatch(pointAction.usePoints(0));
    setIsBtnEnabled(true);
    setResetInput(true);
  };

  return (
    <>
      <PointLayout>
        <p>보유적립금</p>
        <p>{remainingPoints}</p>
      </PointLayout>
      <PointLayout>
        <p>사용</p>
        <Input
          bar
          id="use_point"
          element="input"
          width="8.5rem"
          height="20px"
          reset={resetInput}
          setReset={setResetInput}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={null}
          onInput={onInput}
        />
        <Button
          type="button"
          sub
          small
          width="80px"
          onClick={applyUsageAmount}
          disabled={!isBtnEnabled}
        >
          사용
        </Button>
        <ResetButton onClick={resetUsageAmount} />
        <ToastContainer
          position="top-center"
          limit={1}
          autoClose={3000}
          pauseOnHover={false}
          closeOnClick
        />
      </PointLayout>
    </>
  );
};

export default PaymentPoint;
