import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import Button from '../../components/UI/Button';
import Radio from '../../components/UI/Radio';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import ErrorModal from '../../util/ErrorModal';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import UpdateImageUpload from '../../components/UI/UpdateImageUpload';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { useCheckedInput } from '../../hooks/useCheckedInput';
import { useLoadingError } from '../../hooks/useLoadingError';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import { useTokenRefresher } from '../../hooks/useTokenRefresher';
import { CategoryList, TradeMethod } from '../../data';
import {
  FormLayout,
  FormBox,
  ItemBox,
  FormItem,
  FormInput,
  FormBtnBox,
  PlaceBox,
  TradeBox,
  CategoryBox,
  Line,
} from '../NewProduct';

const UpdateProduct = () => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const navigate = useNavigate();
  const productId = useParams().productId;
  const [loadedProduct, setLoadedProduct] = useState();
  const [updateModal, setUpdateModal] = useState(false);
  const [initialCategory, setInitialCategory] = useState('');
  const [initialTradeMethod, setInitialTradeMethod] = useState('');
  const [deleteImages, setDeleteImages] = useState([]);
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();
  const { tokenErrorHandler } = useTokenRefresher(auth);
  const [formState, inputHandler, setFormData] = useForm({}, true);

  const closeUpdate = () => {
    setUpdateModal(false);
    navigate(`/${productId}/detail`);
  };

  useEffect(() => {
    onLoading(true);
    axios
      .get(`${url}/product/update/${productId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then(response => {
        const responseData = response.data;
        setLoadedProduct(responseData);
        setFormData(
          {
            imageUrls: {
              value: responseData.imageUrls,
              isValid: true,
            },
            category: {
              value: responseData.category,
              isValid: true,
            },
            rentalProduct: {
              value: responseData.rentalProduct,
              isValid: true,
            },
            rentalFee: {
              value: responseData.rentalFee,
              isValid: true,
            },
            tradeMethods: {
              value:
                responseData.tradeMethods.length === 2
                  ? 'ALL'
                  : responseData.tradeMethods[0],
              isValid: true,
            },
            place: {
              value: responseData.place,
              isValid: true,
            },
            description: {
              value: responseData.description,
              isValid: true,
            },
          },
          true,
        );

        setInitialCategory(responseData.category);
        setInitialTradeMethod(
          responseData.tradeMethods.length === 2
            ? 'ALL'
            : responseData.tradeMethods[0],
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
  }, [productId, setFormData, auth.token]);

  const [checkedTrade, onCheckedTrade] = useCheckedInput(
    initialTradeMethod,
    inputHandler,
    'updateTrade',
  );

  useEffect(() => {
    if (checkedTrade === 'DELIVERY') {
      inputHandler('place', '', true);
    }
  }, [checkedTrade, inputHandler]);

  const updateSubmitHandler = e => {
    e.preventDefault();

    if (!formState.isValid) {
      alert('빈칸 없이 작성해주세요.');
      return;
    }

    const formData = new FormData();

    if (formState.inputs.images) {
      const files = formState.inputs.images.value;
      files.forEach((file, index) => {
        formData.append(`image${index}`, file);
      });
    }
    formData.append('deleteImages', deleteImages);
    formData.append('productId', productId);
    formData.append('rentalProduct', formState.inputs.rentalProduct.value);
    formData.append('category', initialCategory);
    formData.append('rentalFee', formState.inputs.rentalFee.value);
    formData.append(
      'tradeMethods',
      formState.inputs.tradeMethods.value === 'ALL'
        ? 'DIRECT, DELIVERY'
        : formState.inputs.tradeMethods.value,
    );
    formData.append('description', formState.inputs.description.value);
    if (formState.inputs.place && formState.inputs.place.value) {
      formData.append('place', formState.inputs.place.value);
    }

    onLoading(true);
    axios
      .put(`${url}/product/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + auth.token,
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
  };

  if (!loadedProduct) {
    return (
      <FormLayout>
        <p>상품을 찾을 수 없어요!</p>
      </FormLayout>
    );
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
      <FormLayout onSubmit={updateSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <p>상품 등록</p>
        <FormBox>
          <FormItem image>
            <p>상품 사진</p>
            <UpdateImageUpload
              id="images"
              imageUrls={formState.inputs.imageUrls.value}
              setDeleteImages={setDeleteImages}
              onInput={inputHandler}
            />
          </FormItem>
          <Line />
          <FormItem>
            <p>대여 상품명</p>
            <FormInput
              id="rentalProduct"
              element="input"
              width="22rem"
              height="30px"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="대여할 상품명을 입력해주세요."
              initialValue={loadedProduct.rentalProduct}
              initialValid={true}
              onInput={inputHandler}
            />
          </FormItem>
          <Line />
          <FormItem>
            <p>카테고리</p>
            <CategoryBox>
              {CategoryList.map(item => (
                <Radio
                  key={item.id}
                  item={item}
                  name="category"
                  checked={initialCategory}
                  disabled={true}
                />
              ))}
            </CategoryBox>
          </FormItem>
          <Line />
          <FormItem>
            <p>대여 요금</p>
            <ItemBox>
              <FormInput
                id="rentalFee"
                element="input"
                width="18.5rem"
                height="30px"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="대여할 상품의 일일 대여 요금을 입력해주세요."
                initialValue={loadedProduct.rentalFee}
                initialValid={true}
                onInput={inputHandler}
              />
              <p>원/[일]</p>
            </ItemBox>
          </FormItem>
          <Line />
          <FormItem>
            <p>거래 방법</p>
            <TradeBox checkedTrade={checkedTrade}>
              <div>
                {TradeMethod.map(item => (
                  <Radio
                    key={item.id}
                    item={item}
                    name="tradeMethods"
                    checked={checkedTrade}
                    onChecked={onCheckedTrade}
                  />
                ))}
              </div>
              {(checkedTrade === 'DIRECT' || checkedTrade === 'ALL') && (
                <PlaceBox>
                  <p>
                    거래
                    <br />
                    희망지역
                  </p>
                  <Input
                    id="place"
                    element="input"
                    width="5rem"
                    height="23px"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText={null}
                    initialValue={loadedProduct.place}
                    initialValid={true}
                    onInput={inputHandler}
                  />
                </PlaceBox>
              )}
            </TradeBox>
          </FormItem>
          <Line />
          <FormItem>
            <p>상품 설명</p>
            <FormInput
              id="description"
              element="textarea"
              width="22rem"
              height="30px"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="대여할 상품에 대한 설명을 입력해주세요."
              initialValue={loadedProduct.description}
              initialValid={true}
              onInput={inputHandler}
            />
          </FormItem>
          <Line />
        </FormBox>
        <FormBtnBox>
          <Button type="submit" disabled={!formState.isValid} width="10rem">
            수정하기
          </Button>
        </FormBtnBox>
      </FormLayout>
    </>
  );
};

export default UpdateProduct;
