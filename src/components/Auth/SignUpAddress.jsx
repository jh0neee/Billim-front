import React, { useState } from "react";

import Input from "../../components/UI/Input";
import Button from "../UI/Button";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { VALIDATOR_REQUIRE } from "../../util/validators";
import { SignUpItem, SignUpLabel } from "./SignUpItem";

const SignUpAddress = (props) => {
  const { onInput } = props;
  const [postCode, setPostCode] = useState("");
  const [address, setAddress] = useState("");
  const [legal, setlegal] = useState("");

  const scriptUrl =
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data) => {
    let address = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
    }

    setAddress(address);
    setPostCode(data.zonecode);
    setlegal(`(${extraAddress})`);

    onInput("address", address, true);
    onInput("address_legal", extraAddress, true);
  };

  const postCodeOpenHandler = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <>
      <SignUpItem>
        <SignUpLabel>주소</SignUpLabel>
        <Input
          element='input'
          id='postcode'
          type='text'
          width='17.5rem'
          placeholder='우편번호'
          validators={[VALIDATOR_REQUIRE()]}
          value={postCode}
          errorText={null}
          onInput={onInput}
          disabled={true}
        />
        <Button sub small width='120px' onClick={postCodeOpenHandler}>
          우편번호 찾기
        </Button>
      </SignUpItem>
      <SignUpItem lyt>
        <Input
          element='input'
          type='text'
          id='address'
          width='17.5rem'
          placeholder='도로명주소'
          value={address}
          validators={[VALIDATOR_REQUIRE()]}
          errorText='주소를 입력해주세요'
          onInput={onInput}
          disabled={true}
        />
      </SignUpItem>
      <SignUpItem lyt>
        <Input
          element='input'
          type='text'
          id='address_detail'
          width='17.5rem'
          placeholder='상세주소 입력해주세요'
          validators={[VALIDATOR_REQUIRE()]}
          errorText={null}
          onInput={onInput}
        />
        <Input
          element='input'
          type='text'
          id='address_legal'
          width='8.5rem'
          placeholder='(법정동)'
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
