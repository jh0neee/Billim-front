import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import theme from '../styles/theme';
import Input from '../components/UI/Input';
import Radio from '../components/UI/Radio';
import Modal from '../components/UI/Modal';
import Button from '../components/UI/Button';
import ErrorModal from '../util/ErrorModal';
import ImageUpload from '../components/UI/ImageUpload';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { useCheckedInput } from '../hooks/useCheckedInput';
import { VALIDATOR_REQUIRE } from '../util/validators';
import { CategoryList, TradeMethod } from '../data';
import { useLoadingError } from '../hooks/useLoadingError';
import { useTokenRefresher } from '../hooks/useTokenRefresher';

export const FormLayout = styled.form`
  max-width: fit-content;
  width: 60%;
  margin: 85px auto 0px;
  padding: 1.5rem 0 0;
  font-family: SCDream;

  > p {
    font-family: TRoundWind;
    font-weight: 700;
    font-size: 1.7rem;
    text-align: center;
  }

  @media ${theme.mobile} {
    width: 70%;
    margin: 150px auto 0;
    padding: 0;
  }
  @media ${theme.tablet} {
    margin: 150px auto 0;
    padding: 0;
  }
`;

export const FormBox = styled.div`
  margin: 3rem 0px 0px;
`;

export const FormItem = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 5fr;
  margin: 20px 5rem 20px 2rem;
  align-items: center;
  justify-items: start;
  margin-left: 6rem;
  font-size: 0.9rem;

  > p {
    font-weight: 600;
    font-size: 1.1rem;
  }

  @media ${theme.mobile}, ${theme.tablet} {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 0;
  }
  @media (min-width: 769px) and (max-width: 1140px) {
    grid-template-columns: 2fr 5fr;
    margin: 20px 4rem 20px 5rem;
  }
`;

export const ItemBox = styled.div`
  display: flex;
  align-items: center;

  > p {
    margin-left: 0.5rem;
  }

  @media ${theme.mobile}, ${theme.tablet} {
    width: 90%;
    margin-top: 0.5rem;
    align-self: center;
  }
`;

export const FormInput = styled(Input)`
  margin-left: 1rem;

  @media ${theme.mobile}, ${theme.tablet} {
    width: 95%;
    margin-left: 0;
    align-self: center;
    margin-top: ${props => (props.id === 'rentalFee' ? '0.5rem' : '1rem')};

    > * {
      &:nth-child(2) {
        width: 100%;
      }
    }
  }

  @media (min-width: 769px) and (max-width: 1140px) {
    width: 95%;

    > * {
      &:nth-child(2) {
        width: 100%;
      }
    }
  }
`;

export const CategoryBox = styled.div`
  @media ${theme.mobile} {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    width: 7rem;
  }

  @media (min-width: 481px) and (max-width: 630px) {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    width: 18rem;
  }
  @media (min-width: 631px) and (max-width: 768px) {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  @media (min-width: 769px) and (max-width: 850px) {
    width: 7rem;
  }
  @media (min-width: 942px) and (max-width: 1100px) {
    width: 18rem;
  }
`;

export const TradeBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${theme.mobile}, ${theme.tablet} {
    margin-top: 0.5rem;
    margin-bottom: ${({ checkedTrade }) =>
      checkedTrade === 'DIRECT' || checkedTrade === 'ALL' ? '0' : '0.5rem'};
  }

  > div {
    @media (min-width: 375px) and (max-width: 645px),
      (min-width: 769px) and (max-width: 1060px) {
      width: ${({ checkedTrade }) =>
        checkedTrade === 'DIRECT' || checkedTrade === 'ALL' ? '7rem' : 'null'};
      align-self: baseline;
    }
  }
  > * {
    &:first-child {
      @media (min-width: 1070px) and (max-width: 1152px) {
        width: ${({ checkedTrade }) =>
          checkedTrade === 'DIRECT' || checkedTrade === 'ALL'
            ? '13rem'
            : 'null'};
      }
    }
  }
`;

export const PlaceBox = styled.div`
  font-size: 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1.5rem;
  text-align: center;

  > p {
    margin-right: 1rem;
    line-height: 0.8rem;
  }

  @media ${theme.mobile}, ${theme.tablet} {
    margin-top: 8px;
    justify-content: center;
    > p {
      margin-right: 1rem;
      line-height: 0.8rem;
    }
  }

  @media (min-width: 375px) and (max-width: 645px),
    (min-width: 769px) and (max-width: 1060px) {
    margin: 0;
    flex-direction: column;

    > p {
      margin: 0;
    }
  }

  @media (min-width: 1061px) and (max-width: 1280px) {
    flex-direction: column;

    > p {
      margin: 0;
    }
  }
`;

export const FormBtnBox = styled.div`
  margin: 1rem 0px 2rem;
  display: flex;
  justify-content: center;
  font-weight: 600;
`;

export const Line = styled.hr`
  width: 80%;

  @media ${theme.mobile}, ${theme.tablet} {
    width: 100%;
  }
`;

const NewProduct = () => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const navigate = useNavigate();
  const [registerModal, setRegisterModal] = useState(false);
  const { tokenErrorHandler } = useTokenRefresher(auth);
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();
  const [formState, inputHandler] = useForm({}, false);
  const [checkedCategory, onCheckedCategory] = useCheckedInput(
    null,
    inputHandler,
    'registerCategory',
  );
  const [checkedTrade, onCheckedTrade] = useCheckedInput(
    null,
    inputHandler,
    'registerTrade',
  );

  const closeRegister = () => {
    setRegisterModal(false);
    navigate('/product');
  };

  const submitProductHandler = e => {
    e.preventDefault();

    if (formState.inputs.category && formState.inputs.tradeMethods) {
      const notIsValid =
        formState.inputs.tradeMethods.value === 'DELIVERY' &&
        (!formState.inputs.place || !formState.inputs.place.isValid);

      if (!notIsValid) {
        if (!formState.isValid) {
          alert('빈칸 없이 작성해주세요.');
          return;
        }
      }

      const files = formState.inputs.images.value;
      const formData = new FormData();

      files.forEach((file, index) => {
        formData.append(`image${index}`, file);
      });
      formData.append('rentalProduct', formState.inputs.rentalProduct.value);
      formData.append('category', formState.inputs.category.value);
      formData.append('rentalFee', formState.inputs.rentalFee.value);
      formData.append('tradeMethods', formState.inputs.tradeMethods.value);
      formData.append('description', formState.inputs.description.value);
      if (formState.inputs.place && formState.inputs.place.value) {
        formData.append('place', formState.inputs.place.value);
      }

      onLoading(true);
      axios
        .post(`${url}/product/register`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + auth.token,
          },
        })
        .then(() => {
          setRegisterModal(true);
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
    } else {
      alert('모든 필드를 빠짐없이 작성해주세요.');
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={registerModal}
        header="등록 완료!"
        onCancel={closeRegister}
        footer={
          <Button small width="60px" onClick={closeRegister}>
            확인
          </Button>
        }
      >
        상품이 등록되었습니다!
      </Modal>
      <FormLayout onSubmit={submitProductHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <p>상품 등록</p>
        <FormBox>
          <FormItem image>
            <p>상품 사진</p>
            <ImageUpload id="images" onInput={inputHandler} />
          </FormItem>
          <Line />
          <FormItem>
            <p>대여 상품명</p>
            <FormInput
              id="rentalProduct"
              element="input"
              width="22rem"
              height="30px"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="대여할 상품명을 입력해주세요."
              onInput={inputHandler}
            />
          </FormItem>
          <Line />
          <FormItem>
            <p>카테고리</p>
            <CategoryBox>
              {CategoryList.map(item => (
                <Radio
                  key={item.id}
                  item={item}
                  name="category"
                  checked={checkedCategory}
                  onChecked={onCheckedCategory}
                />
              ))}
            </CategoryBox>
          </FormItem>
          <Line />
          <FormItem>
            <p>대여 요금</p>
            <ItemBox>
              <FormInput
                id="rentalFee"
                element="input"
                width="18.5rem"
                height="30px"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="대여할 상품의 일일 대여 요금을 입력해주세요."
                onInput={inputHandler}
              />
              <p>원/[일]</p>
            </ItemBox>
          </FormItem>
          <Line />
          <FormItem>
            <p>거래 방법</p>
            <TradeBox checkedTrade={checkedTrade}>
              <div>
                {TradeMethod.map(item => (
                  <Radio
                    key={item.id}
                    item={item}
                    name="tradeMethods"
                    checked={checkedTrade}
                    onChecked={onCheckedTrade}
                  />
                ))}
              </div>
              {(checkedTrade === 'DIRECT' || checkedTrade === 'ALL') && (
                <PlaceBox>
                  <p>
                    거래
                    <br />
                    희망지역
                  </p>
                  <Input
                    id="place"
                    element="input"
                    width="5rem"
                    height="23px"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText={null}
                    onInput={inputHandler}
                  />
                </PlaceBox>
              )}
            </TradeBox>
          </FormItem>
          <Line />
          <FormItem>
            <p>상품 설명</p>
            <FormInput
              id="description"
              element="textarea"
              width="22rem"
              height="30px"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="대여할 상품에 대한 설명을 입력해주세요."
              onInput={inputHandler}
            />
          </FormItem>
          <Line />
        </FormBox>
        <FormBtnBox>
          <Button type="submit" width="10rem">
            등록하기
          </Button>
        </FormBtnBox>
      </FormLayout>
    </>
  );
};

export default NewProduct;
