import React, { useState } from "react";
import styled from "styled-components";

import Input from "../components/UI/Input";
import Radio from "../components/UI/Radio";
import Button from "../components/UI/Button";

const CategoryList = [
  { id: 1, value: "생활용품" },
  { id: 2, value: "의류잡화" },
  { id: 3, value: "운동용품" },
  { id: 4, value: "전자기기" },
];

const TradeMethod = [
  { id: 1, value: "직거래" },
  { id: 2, value: "택배" },
];

const FormLayout = styled.form`
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

const FormBox = styled.div`
  margin: 3rem 0px 0px;
`;

const FormItem = styled.div`
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

const ItemBox = styled.div`
  display: flex;
  align-items: center;

  > p {
    margin-left: 0.5rem;
  }
`;

const FormInput = styled(Input)`
  margin-left: 1rem;
`;

const FormBtnBox = styled.div`
  margin: 1rem 0px 2rem;
  display: flex;
  justify-content: center;
  font-weight: 600;
`;

const NewProduct = () => {
  const [checkedCategory, setCheckedCategory] = useState("");
  const [checkedTrade, setCheckedTrade] = useState("");

  const onCheckedCategory = (e) => {
    setCheckedCategory(e.target.value);
  };

  const onCheckedTrade = (e) => {
    setCheckedTrade(e.target.value);
  };

  return (
    <>
      <FormLayout>
        <p>상품 등록</p>
        <FormBox>
          <FormItem>
            <p>대여 상품명</p>
            <FormInput element='input' width='22rem' height='30px' />
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
              <FormInput element='input' width='18.5rem' height='30px' />
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
            <FormInput element='textarea' width='22rem' height='30px' />
          </FormItem>
          <hr width='80%' />
        </FormBox>
      </FormLayout>
      <FormBtnBox>
        <Button type='submit' width='10rem'>
          등록하기
        </Button>
      </FormBtnBox>
    </>
  );
};

export default NewProduct;
