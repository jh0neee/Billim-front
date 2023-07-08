import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import Button from '../../components/UI/Button';
import Radio from '../../components/UI/Radio';
import Input from '../../components/UI/Input';
import { useForm } from '../../hooks/useForm';
import { useCheckedInput } from '../../hooks/useCheckedInput';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import { CategoryList, TradeMethod } from '../../data';
import {
  FormLayout,
  FormBox,
  ItemBox,
  FormItem,
  FormInput,
  FormBtnBox,
  PlaceBox,
  TradeBox,
} from '../NewProduct';

const UpdateProduct = () => {
  const url = process.env.REACT_APP_URL;
  const productId = useParams().productId;
  const [loadedProduct, setLoadedProduct] = useState();
  const [initialCategory, setInitialCategory] = useState('');
  const [initialTradeMethod, setInitialTradeMethod] = useState('');
  const [formState, inputHandler, setFormData] = useForm({}, true);

  useEffect(() => {
    axios.get(`${url}/product/detail/${productId}`).then(response => {
      const prdt = response.data;
      setLoadedProduct(prdt);
      setFormData(
        {
          rentalProduct: {
            value: prdt.productName,
            isValid: true,
          },
          category: {
            value: prdt.category,
            isValid: true,
          },
          rentalFee: {
            value: prdt.price,
            isValid: true,
          },
          tradeMethod: {
            value:
              prdt.tradeMethods.length === 2 ? 'ALL' : prdt.tradeMethods[0],
            isValid: true,
          },
          place: {
            value: prdt.place,
            isValid: true,
          },
          description: {
            value: prdt.detail,
            isValid: true,
          },
        },
        true,
      );

      setInitialCategory(prdt.category);
      setInitialTradeMethod(
        prdt.tradeMethods.length === 2 ? 'ALL' : prdt.tradeMethods[0],
      );
    });
  }, [productId, setFormData, url]);

  const [checkedCategory, onCheckedCategory] = useCheckedInput(
    initialCategory,
    inputHandler,
    'updateCategory',
  );

  const [checkedTrade, onCheckedTrade] = useCheckedInput(
    initialTradeMethod,
    inputHandler,
    'updateTrade',
  );

  useEffect(() => {
    if (checkedTrade === 'DELIVERY') {
      inputHandler('place', '', true);
    }
  }, [checkedTrade, inputHandler]);

  const updateSubmitHandler = e => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  if (!loadedProduct) {
    return (
      <FormLayout>
        <p>상품을 찾을 수 없어요!</p>
      </FormLayout>
    );
  }

  return (
    <>
      <FormLayout onSubmit={updateSubmitHandler}>
        <p>상품 등록</p>
        <FormBox>
          <FormItem>
            <p>대여 상품명</p>
            <FormInput
              id="rentalProduct"
              element="input"
              width="22rem"
              height="30px"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="대여할 상품명을 입력해주세요."
              initialValue={formState.inputs.rentalProduct.value}
              initialValid={formState.inputs.rentalProduct.isValid}
              onInput={inputHandler}
            />
          </FormItem>
          <hr width="80%" />
          <FormItem>
            <p>카테고리</p>
            <div>
              {CategoryList.map(item => (
                <Radio
                  key={item.id}
                  item={item}
                  name="category"
                  checked={checkedCategory}
                  onChecked={onCheckedCategory}
                />
              ))}
            </div>
          </FormItem>
          <hr width="80%" />
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
                initialValue={formState.inputs.rentalFee.value}
                initialValid={formState.inputs.rentalFee.isValid}
                onInput={inputHandler}
              />
              <p>원/[일]</p>
            </ItemBox>
          </FormItem>
          <hr width="80%" />
          <FormItem>
            <p>거래 방법</p>
            <TradeBox>
              {TradeMethod.map(item => (
                <Radio
                  key={item.id}
                  item={item}
                  name="tradeMethod"
                  checked={checkedTrade}
                  onChecked={onCheckedTrade}
                />
              ))}
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
                    initialValue={formState.inputs.place.value}
                    initialValid={formState.inputs.place.isValid}
                    onInput={inputHandler}
                  />
                </PlaceBox>
              )}
            </TradeBox>
          </FormItem>
          <hr width="80%" />
          <FormItem>
            <p>상품 설명</p>
            <FormInput
              id="description"
              element="textarea"
              width="22rem"
              height="30px"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="대여할 상품에 대한 설명을 입력해주세요."
              initialValue={formState.inputs.description.value}
              initialValid={formState.inputs.description.isValid}
              onInput={inputHandler}
            />
          </FormItem>
          <hr width="80%" />
        </FormBox>
        <FormBtnBox>
          <Button type="submit" disabled={!formState.isValid} width="10rem">
            수정하기
          </Button>
        </FormBtnBox>
      </FormLayout>
    </>
  );
};

export default UpdateProduct;
