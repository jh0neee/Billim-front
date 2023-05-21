import React, { useState } from "react";
import styled from "styled-components";

import Button from "../UI/Button";
import Input from "../UI/Input";
import { VALIDATOR_REQUIRE } from "../../util/validators";
import { useForm } from "../../hooks/useForm";
import { review } from "../../data";

const ReviewLayout = styled.div`
  background-color: #ededed;
  margin: 1rem 0;
  padding: 1rem;
`;

const ReviewItemList = styled.div`
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const TopList = styled.div`
  display: flex;
  align-items: flex-start;
`;

const BottomList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  > p {
    margin-bottom: 5rem;
    font-size: 0.7rem;
  }
`;

const ReviewItemTextBox = styled.div`
  margin: 0.5rem 0 0 1.5rem;
  font-size: 0.8rem;

  > * {
    &:nth-child(-n + 2) {
      font-size: 0.9rem;
      font-weight: 500;
      padding: 0.2rem 0;
    }

    &:last-child {
      padding-top: 2rem;
    }
  }

  > div {
    display: flex;
    align-items: center;
  }
`;

const WritedReview = styled.div`
  margin: 1rem;

  > div {
    width: 100%;
    padding: 1rem;
    background-color: white;

    &:last-child {
      margin-top: 1rem;
      font-size: 0.8rem;
    }
  }
`;

const ReviewInputBox = styled.form`
  display: flex;
  flex-direction: column;

  > button {
    align-self: center;
  }
`;

const ExtraButton = styled(Button)`
  margin: 0;
  width: 60px;
  height: 27px;
  font-size: 10px;
  font-weight: 400;
`;

const Review = () => {
  const [isOpenReview, setIsOpenReview] = useState("");
  const [formState, inputHandler] = useForm({}, false);

  const toggleReview = (id) => {
    setIsOpenReview((prev) => (prev !== id ? id : false));
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <>
      <p>구매 후기</p>
      {review.map((item) => (
        <ReviewLayout key={item.id}>
          <ReviewItemList>
            <TopList>
              <img
                src='https://via.placeholder.com/100x120'
                alt='상품예시이미지'
              />
              <ReviewItemTextBox>
                <p>{item.name}</p>
                <p>\ {item.amount.toLocaleString("ko-KR")}</p>
                <p>{item.username}</p>
              </ReviewItemTextBox>
            </TopList>
            <BottomList>
              <p>주문일시 : {item.date}</p>
              {!item.isReview && (
                <ExtraButton onClick={() => toggleReview(item.id)}>
                  후기작성
                </ExtraButton>
              )}
            </BottomList>
          </ReviewItemList>
          {!item.isReview && isOpenReview === item.id && (
            <WritedReview review>
              <p> ➤ 후기 작성하기</p>
              <ReviewInputBox onSubmit={reviewSubmitHandler}>
                <Input
                  element='textarea'
                  id='review'
                  width='100%'
                  rows='5'
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText={null}
                  onInput={inputHandler}
                />
                <ExtraButton type='submit' disabled={!formState.isValid}>
                  확인
                </ExtraButton>
              </ReviewInputBox>
            </WritedReview>
          )}
          {item.isReview && (
            <WritedReview>
              <p>내가 작성한 후기</p>
              <div>{item.review}</div>
            </WritedReview>
          )}
        </ReviewLayout>
      ))}
    </>
  );
};

export default Review;
