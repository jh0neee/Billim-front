import React from 'react';

import usePostalCode from '../../hooks/usePostalCode';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import {
  SignUpItem,
  SignUpLabel,
  SignUpInput,
  SignUpButton,
} from './SignUpItem';

const SignUpAddress = props => {
  const { onInput } = props;
  const [postCode, address, legal, postCodeOpenHandler] =
    usePostalCode(onInput);

  return (
    <>
      <SignUpItem>
        <SignUpLabel>주소</SignUpLabel>
        <SignUpInput
          element="input"
          id="postcode"
          type="text"
          wth="17.5rem"
          placeholder="우편번호"
          validators={[VALIDATOR_REQUIRE()]}
          value={postCode}
          errorText={null}
          onInput={onInput}
          disabled={true}
        />
        <SignUpButton type="button" sub small onClick={postCodeOpenHandler}>
          우편번호 찾기
        </SignUpButton>
      </SignUpItem>
      <SignUpItem lyt>
        <SignUpInput
          element="input"
          type="text"
          id="address"
          wth="17.5rem"
          placeholder="도로명주소"
          value={address}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="주소를 입력해주세요"
          onInput={onInput}
          disabled={true}
        />
      </SignUpItem>
      <SignUpItem lyt>
        <SignUpInput
          element="input"
          type="text"
          id="address_detail"
          wth="17.5rem"
          placeholder="상세주소 입력해주세요"
          validators={[VALIDATOR_REQUIRE()]}
          errorText={null}
          onInput={onInput}
        />
        <SignUpInput
          extra
          element="input"
          type="text"
          id="address_legal"
          wth="8.5rem"
          placeholder="(법정동)"
          validators={[VALIDATOR_REQUIRE()]}
          errorText={null}
          value={legal}
          onInput={onInput}
          disabled={true}
        />
      </SignUpItem>
    </>
  );
};

export default SignUpAddress;
