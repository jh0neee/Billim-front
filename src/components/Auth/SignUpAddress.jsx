import React from 'react';

import Input from '../../components/UI/Input';
import Button from '../UI/Button';
import usePostalCode from '../../hooks/usePostalCode';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import { SignUpItem, SignUpLabel } from './SignUpItem';

const SignUpAddress = props => {
  const { onInput } = props;
  const [postCode, address, legal, postCodeOpenHandler] =
    usePostalCode(onInput);

  return (
    <>
      <SignUpItem>
        <SignUpLabel>주소</SignUpLabel>
        <Input
          element="input"
          id="postcode"
          type="text"
          width="17.5rem"
          placeholder="우편번호"
          validators={[VALIDATOR_REQUIRE()]}
          value={postCode}
          errorText={null}
          onInput={onInput}
          disabled={true}
        />
        <Button sub small width="120px" onClick={postCodeOpenHandler}>
          우편번호 찾기
        </Button>
      </SignUpItem>
      <SignUpItem lyt>
        <Input
          element="input"
          type="text"
          id="address"
          width="17.5rem"
          placeholder="도로명주소"
          value={address}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="주소를 입력해주세요"
          onInput={onInput}
          disabled={true}
        />
      </SignUpItem>
      <SignUpItem lyt>
        <Input
          element="input"
          type="text"
          id="address_detail"
          width="17.5rem"
          placeholder="상세주소 입력해주세요"
          validators={[VALIDATOR_REQUIRE()]}
          errorText={null}
          onInput={onInput}
        />
        <Input
          element="input"
          type="text"
          id="address_legal"
          width="8.5rem"
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
