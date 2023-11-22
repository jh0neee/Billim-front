import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles/Pages.styles';

import axios from 'axios';
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
      <S.FormLayout onSubmit={submitProductHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <p>상품 등록</p>
        <S.FormBox>
          <S.FormItem image>
            <p>상품 사진</p>
            <ImageUpload id="images" onInput={inputHandler} />
          </S.FormItem>
          <S.Line />
          <S.FormItem>
            <p>대여 상품명</p>
            <S.FormInput
              id="rentalProduct"
              element="input"
              width="22rem"
              height="30px"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="대여할 상품명을 입력해주세요."
              onInput={inputHandler}
            />
          </S.FormItem>
          <S.Line />
          <S.FormItem>
            <p>카테고리</p>
            <S.CategoryBox>
              {CategoryList.map(item => (
                <Radio
                  key={item.id}
                  item={item}
                  name="category"
                  checked={checkedCategory}
                  onChecked={onCheckedCategory}
                />
              ))}
            </S.CategoryBox>
          </S.FormItem>
          <S.Line />
          <S.FormItem>
            <p>대여 요금</p>
            <S.ItemBox>
              <S.FormInput
                id="rentalFee"
                element="input"
                width="18.5rem"
                height="30px"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="대여할 상품의 일일 대여 요금을 입력해주세요."
                onInput={inputHandler}
              />
              <p>원/[일]</p>
            </S.ItemBox>
          </S.FormItem>
          <S.Line />
          <S.FormItem>
            <p>거래 방법</p>
            <S.TradeBox checkedTrade={checkedTrade}>
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
                <S.PlaceBox>
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
                </S.PlaceBox>
              )}
            </S.TradeBox>
          </S.FormItem>
          <S.Line />
          <S.FormItem>
            <p>상품 설명</p>
            <S.FormInput
              id="description"
              element="textarea"
              width="22rem"
              height="30px"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="대여할 상품에 대한 설명을 입력해주세요."
              onInput={inputHandler}
            />
          </S.FormItem>
          <S.Line />
        </S.FormBox>
        <S.FormBtnBox>
          <Button type="submit" width="10rem">
            등록하기
          </Button>
        </S.FormBtnBox>
      </S.FormLayout>
    </>
  );
};

export default NewProduct;
