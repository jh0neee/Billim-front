import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import axios from 'axios';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import ErrorModal from '../../util/ErrorModal';
import ImageUpload from '../UI/ImageUpload';
import usePostalCode from '../../hooks/usePostalCode';
import LoadingSpinner from '../UI/LoadingSpinner';
import EditPassword from './EditPassword';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { FormBtnBox } from '../../pages/NewProduct';
import { useCheckNickname } from '../../hooks/useCheckedNickname';
import { ToastContainer } from 'react-toastify';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import { useLoadingError } from '../../hooks/useLoadingError';
import { useAddressSplitter } from '../../hooks/useAddressSplitter';
import { useTokenRefresher } from '../../hooks/useTokenRefresher';

const EditMemberLayout = styled.form`
  margin: 0 0 3rem;
`;

const EditMemberBox = styled.div`
  display: grid;
  grid-template-columns: 0.45fr 0.5fr 0.8fr;
  align-items: center;
  margin: 2rem 0;
  margin-bottom: ${props => (props.mainInput ? '0' : '2rem')};
  margin-top: ${props => (props.subInput ? '1rem' : '2rem')};

  > p:last-child {
    font-size: 0.7rem;
  }

  > span {
    font-size: 0.8rem;
  }

  ${props =>
    props.address &&
    css`
      justify-items: end;
      grid-template-columns: 1.15fr 0.45fr;
      margin: 0;
      margin-bottom: ${props => (props.subInput ? '2rem' : '0')};
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
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();
  const { tokenErrorHandler } = useTokenRefresher(auth);
  const [isCheckNickname, setIsCheckNickname] = useState(true);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [loadedMember, setLoadedMember] = useState();
  const [formState, inputHandler, setFormData] = useForm({}, false);
  const [postCode, address, legal, postCodeOpenHandler] =
    usePostalCode(inputHandler);

  const [checkNickname] = useCheckNickname(
    formState.inputs.nickname,
    setIsCheckNickname,
  );

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  const [editPasswordModal, setEditPasswordModal] = useState(false);
  const closeEditPasswordModal = () => setEditPasswordModal(false);

  useEffect(() => {
    onLoading(true);
    axios
      .get(`${url}/member/info`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          memberId: auth.memberId,
        },
      })
      .then(response => {
        const responseData = response.data;
        setLoadedMember(responseData);

        const { road, legal, detail } = useAddressSplitter(
          responseData.address,
        );

        setFormData(
          {
            nickname: {
              value: responseData.nickname,
              isValid: true,
            },
            address: {
              value: road,
              isValid: true,
            },
            address_detail: {
              value: detail,
              isValid: true,
            },
            address_legal: {
              value: legal,
              isValid: true,
            },
          },
          true,
        );
        onLoading(false);
      })
      .catch(err => {
        if (
          err.response.status === 401 &&
          err.response.data.code !== 'INVALID_EMAIL_PASSWORD'
        ) {
          tokenErrorHandler(err);
          onLoading(false);
        } else {
          errorHandler(err);
        }
      });
  }, [setFormData, auth.token]);

  const EditSubmitHandler = e => {
    e.preventDefault();

    if (isCheckNickname) {
      console.log(formState.inputs);
    } else {
      setShowModal(true);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showModal}
        header="중복 확인"
        onCancel={closeModal}
        footer={
          <Button small width="60px" onClick={closeModal}>
            확인
          </Button>
        }
      >
        닉네임 중복 체크를 먼저 해 주세요
      </Modal>
      <EditPassword
        url={url}
        auth={auth}
        setPasswordChanged={setPasswordChanged}
        showModal={editPasswordModal}
        closeModal={closeEditPasswordModal}
      />
      <p>회원정보수정</p>
      <hr />
      {!isLoading && loadedMember && (
        <EditMemberLayout onSubmit={EditSubmitHandler}>
          <ImageUpload id="profile" onInput={inputHandler} size="50px" />
          <hr />
          <EditMemberBox>
            <p>닉네임</p>
            <Input
              element="input"
              id="nickname"
              height="30px"
              width="10rem"
              setIsCheckNickname={setIsCheckNickname}
              validators={[VALIDATOR_REQUIRE()]}
              initialValue={formState.inputs.nickname.value}
              initialValid={formState.inputs.nickname.isValid}
              onInput={inputHandler}
            />
            <ExtraButton type="button" sub onClick={checkNickname}>
              중복 확인
            </ExtraButton>
            <ToastContainer
              position="top-center"
              limit={1}
              autoClose={3000}
              closeButton={false}
              closeOnClick
            />
          </EditMemberBox>
          <hr />
          <EditMemberBox>
            <p>비밀번호 변경</p>
            {passwordChanged && <span>비밀번호가 변경되었습니다.</span>}
            {!passwordChanged && (
              <ExtraButton
                type="button"
                sub
                onClick={() => setEditPasswordModal(true)}
              >
                재설정하기
              </ExtraButton>
            )}
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
      )}
    </>
  );
};

export default EditMember;
