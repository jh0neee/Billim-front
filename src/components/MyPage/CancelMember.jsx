import React, { useState } from 'react';
import styled from 'styled-components';

import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { useForm } from '../../hooks/useForm';
import { PasswordBox } from './EditPassword';
import {
  VALIDATOR_MATCH_PASSWORD,
  VALIDATOR_PASSWORD,
} from '../../util/validators';

const ModalLayout = styled(Modal)`
  > form {
    > div {
      padding: 0.5rem;
    }
  }
`;

const CancelTitle = styled.p`
  font-weight: 700;
  font-size: 1rem;
  text-decoration: underline;
  margin-bottom: 0.5rem;

  > span {
    font-size: 1.1rem;
  }
`;

const CancelContent = styled.p`
  line-height: 1.3;
  font-size: 0.8rem;
`;

const CancelConfirm = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const CancelConfirmLabel = styled.label`
  font-size: 0.7rem;
`;

const CancelMember = ({ showModal, closeModal }) => {
  const [checkCancel, setCheckCancel] = useState(false);
  const [showContents, setShowContents] = useState(true);
  const [formState, inputHandler] = useForm({}, false);

  const handleToggleCheck = () => {
    setCheckCancel(!checkCancel);
  };

  const handleCloseModal = () => {
    closeModal();
    setShowContents(true);
    setCheckCancel(false);
  };

  const closePasswordModal = () => {
    if (!formState.isValid) {
      alert('영문, 숫자, 특수문자를 조합하여 8~16자로 입력해야 합니다.');
      return;
    }

    setShowContents(false);
    console.log('비밀번호 일치');
  };

  const closeCancelModal = () => {
    if (!checkCancel) {
      alert('유의사항에 동의해야만 탈퇴가 가능합니다.');
      return;
    }
    closeModal();
    setShowContents(true);
    setCheckCancel(false);
    console.log('탈퇴 완료');
  };

  return (
    <ModalLayout
      show={showModal}
      header="회원 탈퇴"
      onCancel={handleCloseModal}
      footer={
        <>
          {showContents ? (
            <>
              <Button small width="60px" onClick={closePasswordModal}>
                확인
              </Button>
              <Button small sub width="60px" onClick={handleCloseModal}>
                취소
              </Button>
            </>
          ) : (
            <>
              <Button small width="60px" onClick={closeCancelModal}>
                탈퇴
              </Button>
              <Button small sub width="60px" onClick={handleCloseModal}>
                취소
              </Button>
            </>
          )}
        </>
      }
    >
      {showContents ? (
        <>
          <PasswordBox>
            <p>현재 비밀번호</p>
            <div>
              <Input
                element="input"
                type="password"
                id="password"
                height="30px"
                width="12rem"
                validators={[VALIDATOR_PASSWORD()]}
                errorText={null}
                onInput={inputHandler}
              />
            </div>
          </PasswordBox>
          <PasswordBox subPw>
            <p>비밀번호 확인</p>
            <Input
              element="input"
              type="password"
              id="confirmPassword"
              height="30px"
              width="12rem"
              validators={[VALIDATOR_MATCH_PASSWORD(formState.inputs.password)]}
              errorText="비밀번호가 일치하지 않습니다"
              onInput={inputHandler}
            />
          </PasswordBox>
        </>
      ) : (
        <>
          <CancelTitle>
            정말로 <span>탈퇴</span>하시겠습니까?
          </CancelTitle>
          <CancelContent>
            탈퇴하시면 이용 중인 Billim 서비스가 종료되며, <br /> 모든 데이터는
            복구가 불가합니다. <br /> 타인 글의 리뷰 제외 모든 정보가
            삭제됩니다.
            <br /> 이 점 유의하시어 신중하게 탈퇴를 고려해주세요.
          </CancelContent>
          <CancelConfirm>
            <input
              type="checkbox"
              id="agree_check"
              checked={checkCancel}
              onChange={handleToggleCheck}
            />
            <CancelConfirmLabel htmlFor="agree_check">
              유의사항을 확인하였으며 동의합니다.
            </CancelConfirmLabel>
          </CancelConfirm>
        </>
      )}
    </ModalLayout>
  );
};

export default CancelMember;
