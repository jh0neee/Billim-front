/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import axios from 'axios';
import theme from '../../styles/theme';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import ErrorModal from '../../util/ErrorModal';
import ImageUpload from '../UI/ImageUpload';
import EditPassword from './EditPassword';
import CancelMember from './CancelMember';
import usePostalCode from '../../hooks/usePostalCode';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { FormBtnBox } from '../../pages/NewProduct';
import { useCheckNickname } from '../../hooks/useCheckedNickname';
import { ToastContainer } from 'react-toastify';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import { useLoadingError } from '../../hooks/useLoadingError';
import { useAddressSplitter } from '../../hooks/useAddressSplitter';
import { useTokenRefresher } from '../../hooks/useTokenRefresher';
import { SaleHeader as EditHeader, EnrollButton } from './SalesManagement';

const EditMemberLayout = styled.form`
  margin: 0 auto 3rem;
`;

const EditMemberBox = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 0.9fr 0.5fr;
  align-items: center;
  margin-bottom: ${props => (props.mainInput ? '0' : '2rem')};
  margin-top: ${props => (props.subInput ? '1rem' : '2rem')};

  > p:last-child {
    font-size: 0.7rem;
  }

  > span {
    font-size: 0.8rem;
  }

  ${props =>
    props.password &&
    css`
      grid-template-columns: 1fr 0.35fr;
    `}

  ${props =>
    props.address &&
    css`
      justify-items: end;
      grid-template-columns: ${props =>
        props.subInput ? '1.1fr 0.3fr' : '0.36fr 1fr'};
      margin: ${props =>
        props.subInput ? '0px 0.35rem 2rem 0' : '0px 0.35rem 0 0'};

      > * {
        &:first-child {
          grid-area: ${props => (props.subInput ? '1' : '1 / 2 / 2 / 3')};
          margin: ${props => (props.subInput ? '0.5rem' : '0')};
          display: ${props => (props.subInput ? 'flex' : 'null')};
          justify-content: ${props => (props.subInput ? 'flex-end' : 'null')};
        }
      }
    `}

  > * {
    &:first-child {
      margin-left: 0.5rem;
      font-weight: 600;
    }
  }

  @media ${theme.tablet} {
    grid-template-columns: 0.45fr 1fr 0.5fr;

    ${props =>
      props.password &&
      css`
        grid-template-columns: 2.9fr 1fr;
      `}

    ${props =>
      props.address &&
      css`
        grid-template-columns: ${props =>
          props.subInput ? '0.85fr 0.3fr' : '0.4fr 1.31fr'};
      `}
  }

  @media ${theme.mobile} {
    grid-template-columns: 0.55fr 0.8fr 0.44fr;
    margin: ${props => (props.mainInput ? '1rem 0 0' : '1rem 0')};

    ${props =>
      props.password &&
      css`
        grid-template-columns: 1fr 0.33fr;
      `}

    ${props =>
      props.address &&
      css`
        margin: 0;
        justify-items: end;
        grid-template-columns: ${props => (props.subInput ? '1fr 0.4fr' : '0')};
        margin: ${props => (props.subInput ? '0 0 1rem 0' : '0 0 0 0.2rem')};
      `}
  }
`;

const ExtraButton = styled(Button)`
  margin: 0;
  width: 80px;
  height: 27px;
  font-size: 10px;
  font-weight: 400;
  justify-self: center;

  @media ${theme.mobile} {
    width: 60px;
    justify-self: flex-end;
  }
`;

const KakaoButton = styled(Button)`
  width: 35px;
  height: 35px;
  border-radius: 2rem;
  color: black;
  background-color: #fee500;
  font-weight: 600;
  justify-self: center;

  @media ${theme.mobile} {
    margin: 0 0 0 1.5rem;
  }
`;

const ExtraInput = styled(Input)`
  margin: 0;

  > input {
    width: 100%;
  }
`;

const MainInput = styled(Input)`
  max-width: auto;
  width: 100%;

  > input {
    width: ${props => (props.subInput ? '64.5%' : '100%')};

    @media ${theme.laptop} {
      width: ${props => (props.subInput ? '63.7%' : '100%')};
    }
    @media ${theme.tablet} {
      width: ${props => (props.subInput ? '66%' : '100%')};
    }
    @media ${theme.mobile} {
      width: ${props => (props.subInput ? '95%' : '100%')};
    }
  }
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

  const [updateModal, setUpdateModal] = useState(false);
  const closeUpdate = () => {
    setUpdateModal(false);
    window.location.reload();
  };

  const [cancelModal, setCancelModal] = useState(false);
  const closeCancel = () => {
    setCancelModal(false);
  };

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
            profileImageUrl: {
              value: responseData.profileImageUrl,
              isValid: true,
            },
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

  const checkForChanges = combinedAddress => {
    for (const inputKey in formState.inputs) {
      if (
        inputKey === 'address' &&
        combinedAddress !== loadedMember[inputKey]
      ) {
        return true;
      } else if (
        !['address', 'address_detail', 'address_legal', 'postcode'].includes(
          inputKey,
        ) &&
        formState.inputs[inputKey].value !== loadedMember[inputKey]
      ) {
        return true;
      }
    }
    return false;
  };

  const EditSubmitHandler = e => {
    e.preventDefault();

    const { address, address_detail, address_legal } = formState.inputs;
    const combinedAddress = `${address.value} ${address_detail.value} ${address_legal.value}`;
    const formData = new FormData();

    const file = formState.inputs.profileImageUrl.value;

    if (typeof file === 'object') {
      const updateFile = formState.inputs.profileImageUrl.value[0];
      formData.append('newProfileImage', updateFile);
    }

    formData.append('nickname', formState.inputs.nickname.value);
    formData.append('address', combinedAddress);

    const hasChanges = checkForChanges(combinedAddress);

    if (!hasChanges) {
      alert('수정할 정보가 없습니다.');
      return;
    }

    if (isCheckNickname) {
      onLoading(true);
      axios
        .put(`${url}/member/info`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + auth.token,
          },
          params: {
            memberId: auth.memberId,
          },
        })
        .then(() => {
          setUpdateModal(true);
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
        show={updateModal}
        header="수정 완료!"
        onCancel={closeUpdate}
        footer={
          <Button small width="60px" onClick={closeUpdate}>
            확인
          </Button>
        }
      >
        성공적으로 수정되었습니다!
      </Modal>
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
      <CancelMember showModal={cancelModal} closeModal={closeCancel} />
      <EditPassword
        url={url}
        auth={auth}
        setPasswordChanged={setPasswordChanged}
        showModal={editPasswordModal}
        closeModal={closeEditPasswordModal}
      />
      <EditHeader>
        <p>회원정보수정</p>
        <EnrollButton type="button" onClick={() => setCancelModal(true)}>
          회원 탈퇴
        </EnrollButton>
      </EditHeader>
      <hr />
      {!isLoading && loadedMember && (
        <EditMemberLayout onSubmit={EditSubmitHandler}>
          <ImageUpload
            id="profileImageUrl"
            onInput={inputHandler}
            size="50px"
            src={loadedMember.profileImageUrl}
          />
          <hr />
          <EditMemberBox>
            <p>닉네임</p>
            <MainInput
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
          <EditMemberBox password>
            <p>비밀번호 변경</p>
            {passwordChanged && <span>비밀번호가 변경되었습니다.</span>}
            {!passwordChanged && (
              <ExtraButton
                password
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
            <MainInput
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
            <ExtraButton type="button" sub onClick={postCodeOpenHandler}>
              주소 변경
            </ExtraButton>
          </EditMemberBox>
          <EditMemberBox address>
            <MainInput
              midInput
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
            <MainInput
              subInput
              element="input"
              type="text"
              id="address_detail"
              height="30px"
              width="17.5rem"
              placeholder="상세주소"
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
            <EditMemberBox password>
                <p>소셜연동</p>
                <KakaoButton type="button" kakao>
                    K
                </KakaoButton>
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
