import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import axios from 'axios';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { useAuth } from '../../hooks/useAuth';
import { pointAction } from '../../store/point';
import { GrPowerReset } from 'react-icons/gr';
import { useToastAlert } from '../../hooks/useToastAlert';
import { useLoadingError } from '../../hooks/useLoadingError';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import { useTokenRefresher } from '../../hooks/useTokenRefresher';

const PointLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1.3fr 1fr;
  align-items: center;
  justify-items: start;
  margin-top: 1rem;
  margin: 5px;

  .usePointButton {
    margin: 0.5rem;
  }

  @media (max-width: 412px) {
    grid-template-columns: ${props => !props.use && '3fr 2fr 0.7fr 0.5fr'};
    margin-bottom: ${props => !props.use && '2.5rem !important'};

    * {
      &:first-child {
        margin-left: 1.5rem;
      }
    }

    ${props =>
      props.use &&
      css`
        grid-template-rows: 0.3fr 0.5fr;
        grid-template-columns: 1fr 0.7fr 0.3fr;
        justify-items: center;

        .title {
          grid-area: 1/1/2/4;
          justify-self: start;
        }
        .second {
          grid-area: 2/1/3/2;
          margin: 0 0 0 1.5rem;
        }
        .usePointButton {
          grid-area: 2/2/3/3;
          width: 50px;
        }
        .reset {
          grid-area: 2/3/3/4;
          justify-self: start;
        }
      `}
  }
`;

const ResetButton = styled(GrPowerReset)`
  cursor: pointer;
`;

const PaymentPoint = ({ onInput, formState, total, discount }) => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const dispatch = useDispatch();
  const remainingPoints = useSelector(state => state.point.remainingPoint);

  const [point, setPoint] = useState(0);
  const [isBtnEnabled, setIsBtnEnabled] = useState(true);
  const [resetInput, setResetInput] = useState(false);
  const { onLoading, errorHandler } = useLoadingError();
  const { tokenErrorHandler } = useTokenRefresher(auth);
  const { showToast } = useToastAlert();

  useEffect(() => {
    // 페이지 벗어나면 적립금 초기화
    dispatch(pointAction.usePoints(0));
  }, [dispatch]);

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
  }, [dispatch, auth.token]);

  const applyUsageAmount = () => {
    const usageAmount = formState.inputs.usedPoint.value;
    const totalAmount = total - discount;

    if (usageAmount <= remainingPoints) {
      if (usageAmount > totalAmount) {
        showToast(`최대 ${totalAmount}적립금까지 사용가능합니다.`, 'warning');
      } else {
        dispatch(pointAction.usePoints(usageAmount));
        setIsBtnEnabled(false);
      }
    } else {
      showToast('사용가능 적립금보다 많습니다.', 'error');
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
      <PointLayout use={true}>
        <p className="title">사용</p>
        <Input
          bar
          id="usedPoint"
          element="input"
          width="8.5rem"
          height="20px"
          className="second"
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
          className="usePointButton"
          onClick={applyUsageAmount}
          disabled={!isBtnEnabled}
        >
          사용
        </Button>
        <ResetButton onClick={resetUsageAmount} className="reset" />
      </PointLayout>
    </>
  );
};

export default PaymentPoint;
