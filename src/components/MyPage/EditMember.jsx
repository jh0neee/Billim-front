import React from 'react';
import styled, { css } from 'styled-components';

import Button from '../UI/Button';
import Input from '../UI/Input';
import usePostalCode from '../../hooks/usePostalCode';
import { Profile } from '../UI/Profile';
import { useForm } from '../../hooks/useForm';
import { user } from '../../data';
import { FormBtnBox } from '../../pages/NewProduct';
import {
  VALIDATOR_MATCH_PASSWORD,
  VALIDATOR_PASSWORD,
  VALIDATOR_REQUIRE,
} from '../../util/validators';

const EditMemberLayout = styled.form`
  margin: 0 0 3rem;
`;

const EditMemberBox = styled.div`
  display: grid;
  grid-template-columns: 0.45fr 0.5fr 0.8fr;
  align-items: ${props => (props.first ? 'flex-start' : 'center')};
  margin: 2rem 0;
  margin-bottom: ${props => (props.mainInput ? '0' : '2rem')};
  margin-top: ${props => (props.subInput ? '1rem' : '2rem')};

  > p:last-child {
    font-size: 0.7rem;
  }

  ${props =>
    props.address &&
    css`
      justify-items: end;
      grid-template-columns: 1.15fr 0.45fr;
      margin: 0;
      margin-bottom: ${props => (props.subInput ? '2rem' : '0')};
    `}

  ${props =>
    props.first &&
    css`
      grid-template-columns: 0.45fr 1fr 0.3fr;
      > p,
      button {
        margin-top: 1rem;
      }

      > div {
        > p {
          font-size: 0.65rem;
          margin-top: 0.5rem;
        }
      }
    `}

  > * {
    &:first-child {
      margin-left: 0.5rem;
      font-weight: 600;
    }
  }
`;

const ExtraButton = styled(Button)`
  margin: 0;
  width: 80px;
  height: 27px;
  font-size: 10px;
  font-weight: 400;

  ${props =>
    props.kakao &&
    css`
      width: 35px;
      height: 35px;
      border-radius: 2rem;
      color: black;
      background-color: #fee500;
      font-weight: 600;
    `}
`;

const ExtraInput = styled(Input)`
  margin-right: 4.5rem;
`;

const EditMember = () => {
  const [formState, inputHandler] = useForm({
    nickname: {
      value: user[0].nickname,
      isValid: true,
    },
    postcode: {
      value: user[0].postcode,
      isValid: true,
    },
    address: {
      value: user[0].address,
      isValid: true,
    },
    address_detail: {
      value: user[0].address_detail,
      isValid: true,
    },
    address_legal: {
      value: user[0].address_legal,
      isValid: true,
    },
  });

  const [postCode, address, legal, postCodeOpenHandler] =
    usePostalCode(inputHandler);

  const EditSubmitHandler = e => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  return (
    // FIXME - 비밀번호 확인되면 정보수정페이지로 넘어가기
    <>
      <p>회원정보수정</p>
      <hr />
      <EditMemberLayout onSubmit={EditSubmitHandler}>
        <EditMemberBox first>
          <p>사진</p>
          <div>
            <Profile size="50px" />
            <p>
              회원님을 알릴 수 있는 사진을 등록해주세요. <br />
              등록된 사진은 회원님의 게시물이나 댓글에 사용됩니다.
            </p>
          </div>
          <ExtraButton sub>사진 변경</ExtraButton>
        </EditMemberBox>
        <hr />
        <EditMemberBox>
          <p>닉네임</p>
          <Input
            element="input"
            id="nickname"
            height="30px"
            width="10rem"
            validators={[VALIDATOR_REQUIRE()]}
            initialValue={formState.inputs.nickname.value}
            initialValid={formState.inputs.nickname.isValid}
            onInput={inputHandler}
          />
          <ExtraButton type="button" sub>
            중복 확인
          </ExtraButton>
        </EditMemberBox>
        <hr />
        <EditMemberBox mainInput>
          <p>신규비밀번호</p>
          <Input
            element="input"
            type="password"
            id="password"
            height="30px"
            width="10rem"
            validators={[VALIDATOR_PASSWORD()]}
            errorText="영문 대소문자, 숫자를 모두 포함하여 8~16자 입력해주세요"
            onInput={inputHandler}
          />
          <p>※영문 숫자 조합, 8~16자리</p>
        </EditMemberBox>
        <EditMemberBox subInput>
          <p>비밀번호확인</p>
          <Input
            element="input"
            type="password"
            id="confirm_password"
            height="30px"
            width="10rem"
            validators={[VALIDATOR_MATCH_PASSWORD(formState.inputs.password)]}
            errorText="비밀번호가 일치하지 않습니다"
            onInput={inputHandler}
          />
        </EditMemberBox>
        <hr />
        <EditMemberBox mainInput>
          <p>주소</p>
          <Input
            element="input"
            id="postcode"
            type="text"
            height="30px"
            width="10rem"
            placeholder="우편번호"
            validators={[VALIDATOR_REQUIRE()]}
            initialValue={formState.inputs.postcode.value}
            initialValid={formState.inputs.postcode.isValid}
            value={postCode}
            errorText={null}
            onInput={inputHandler}
            disabled={true}
          />
          <ExtraButton sub onClick={postCodeOpenHandler}>
            주소 변경
          </ExtraButton>
        </EditMemberBox>
        <EditMemberBox address>
          <Input
            element="input"
            type="text"
            id="address"
            height="30px"
            width="17.5rem"
            placeholder="도로명주소"
            validators={[VALIDATOR_REQUIRE()]}
            initialValue={formState.inputs.address.value}
            initialValid={formState.inputs.address.isValid}
            value={address}
            errorText="주소를 입력해주세요"
            onInput={inputHandler}
            disabled={true}
          />
        </EditMemberBox>
        <EditMemberBox subInput address>
          <Input
            element="input"
            type="text"
            id="address_detail"
            height="30px"
            width="17.5rem"
            placeholder="변경할 상세주소를 입력해주세요"
            validators={[VALIDATOR_REQUIRE()]}
            initialValue={formState.inputs.address_detail.value}
            initialValid={formState.inputs.address_detail.isValid}
            errorText={null}
            onInput={inputHandler}
          />
          <ExtraInput
            element="input"
            type="text"
            id="address_legal"
            height="30px"
            width="5.5rem"
            placeholder="(법정동)"
            validators={[VALIDATOR_REQUIRE()]}
            initialValue={formState.inputs.address_legal.value}
            initialValid={formState.inputs.address_legal.isValid}
            errorText={null}
            value={legal}
            onInput={inputHandler}
            disabled={true}
          />
        </EditMemberBox>
        <hr />
        <EditMemberBox>
          <p>소셜연동</p>
          <ExtraButton kakao>K</ExtraButton>
        </EditMemberBox>
        <hr />
        <FormBtnBox>
          <Button type="submit" width="10rem">
            정보 수정
          </Button>
        </FormBtnBox>
      </EditMemberLayout>
    </>
  );
};

export default EditMember;
