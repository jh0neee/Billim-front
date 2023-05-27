import React, { useState } from "react";
import styled from "styled-components";

import Input from "../components/UI/Input";
import Radio from "../components/UI/Radio";
import Button from "../components/UI/Button";
import { useForm } from "../hooks/useForm";
import { VALIDATOR_REQUIRE } from "../util/validators";
import { CategoryList, TradeMethod } from "../data";

export const FormLayout = styled.form`
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
`;

export const ItemBox = styled.div`
  display: flex;
  align-items: center;

  > p {
    margin-left: 0.5rem;
  }
`;

export const FormInput = styled(Input)`
  margin-left: 1rem;
`;

export const FormBtnBox = styled.div`
  margin: 1rem 0px 2rem;
  display: flex;
  justify-content: center;
  font-weight: 600;
`;

const NewProduct = () => {
  const [checkedCategory, setCheckedCategory] = useState("");
  const [checkedTrade, setCheckedTrade] = useState("");
  const [formState, inputHandler] = useForm({}, false);

  const onCheckedCategory = (e) => {
    setCheckedCategory(e.target.value);
    inputHandler("category", e.target.value, true);
  };

  const onCheckedTrade = (e) => {
    setCheckedTrade(e.target.value);
    inputHandler("trade_method", e.target.value, true);
  };

  const submitProductHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <>
      <FormLayout onSubmit={submitProductHandler}>
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
              onInput={inputHandler}
            />
          </FormItem>
          <hr width='80%' />
        </FormBox>
        <FormBtnBox>
          <Button type='submit' width='10rem'>
            등록하기
          </Button>
        </FormBtnBox>
      </FormLayout>
    </>
  );
};

export default NewProduct;
