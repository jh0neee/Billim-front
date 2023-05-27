import React from "react";
import { useParams } from "react-router-dom";

import Button from "../../components/UI/Button";
import Radio from "../../components/UI/Radio";
import { useForm } from "../../hooks/useForm";
import { useCheckedInput } from "../../hooks/useCheckedInput";
import { VALIDATOR_REQUIRE } from "../../util/validators";
import { CategoryList, TradeMethod, productItems } from "../../data";
import {
  FormLayout,
  FormBox,
  ItemBox,
  FormItem,
  FormInput,
  FormBtnBox,
} from "../NewProduct";

const UpdateProduct = () => {
  const productId = useParams().productId;
  const identifiedProduct = productItems.find((item) => item.id === productId);
  const initialCategory = identifiedProduct ? identifiedProduct.category : "";
  const initialTradeMethod = identifiedProduct ? identifiedProduct.trade : "";
  const [formState, inputHandler] = useForm(
    {
      rental_product: {
        value: identifiedProduct.name,
        isValid: true,
      },
      category: {
        value: identifiedProduct.category,
        isValid: true,
      },
      rental_fee: {
        value: identifiedProduct.amount,
        isValid: true,
      },
      trade_method: {
        value: identifiedProduct.trade,
        isValid: true,
      },
      description: {
        value: identifiedProduct.description,
        isValid: true,
      },
    },
    true
  );

  const [checkedCategory, onCheckedCategory] = useCheckedInput(
    initialCategory,
    inputHandler
  );

  const [checkedTrade, onCheckedTrade] = useCheckedInput(
    initialTradeMethod,
    inputHandler
  );

  const updateSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedProduct) {
    return <h1>상품을 찾을 수 없어요</h1>;
  }

  return (
    <>
      <FormLayout onSubmit={updateSubmitHandler}>
        <p>상품 등록</p>
        <FormBox>
          <FormItem>
            <p>대여 상품명</p>
            <FormInput
              id='rental_product'
              element='input'
              width='22rem'
              height='30px'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='대여할 상품명을 입력해주세요.'
              initialValue={formState.inputs.rental_product.value}
              initialValid={formState.inputs.rental_product.isValid}
              onInput={inputHandler}
            />
          </FormItem>
          <hr width='80%' />
          <FormItem>
            <p>카테고리</p>
            <div>
              {CategoryList.map((item) => (
                <Radio
                  key={item.id}
                  item={item}
                  name='category'
                  checked={checkedCategory}
                  onChecked={onCheckedCategory}
                />
              ))}
            </div>
          </FormItem>
          <hr width='80%' />
          <FormItem>
            <p>대여 요금</p>
            <ItemBox>
              <FormInput
                id='rental_fee'
                element='input'
                width='18.5rem'
                height='30px'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='대여할 상품의 일일 대여 요금을 입력해주세요.'
                initialValue={formState.inputs.rental_fee.value}
                initialValid={formState.inputs.rental_fee.isValid}
                onInput={inputHandler}
              />
              <p>원/[일]</p>
            </ItemBox>
          </FormItem>
          <hr width='80%' />
          <FormItem>
            <p>거래 방법</p>
            <div>
              {TradeMethod.map((item) => (
                <Radio
                  key={item.id}
                  item={item}
                  name='trade'
                  checked={checkedTrade}
                  onChecked={onCheckedTrade}
                />
              ))}
            </div>
          </FormItem>
          <hr width='80%' />
          <FormItem>
            <p>상품 설명</p>
            <FormInput
              id='description'
              element='textarea'
              width='22rem'
              height='30px'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='대여할 상품에 대한 설명을 입력해주세요.'
              initialValue={formState.inputs.description.value}
              initialValid={formState.inputs.description.isValid}
              onInput={inputHandler}
            />
          </FormItem>
          <hr width='80%' />
        </FormBox>
        <FormBtnBox>
          <Button type='submit' disabled={!formState.isValid} width='10rem'>
            수정하기
          </Button>
        </FormBtnBox>
      </FormLayout>
    </>
  );
};

export default UpdateProduct;
