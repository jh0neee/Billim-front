import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import DetailView from '../../components/Product/DetailView';
import ErrorModal from '../../util/ErrorModal';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { useLoadingError } from '../../hooks/useLoadingError';

const ProductDetail = () => {
  const url = process.env.REACT_APP_URL;
  const productId = useParams().productId;
  const [loadedContents, setLoadedConntents] = useState();
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();

  useEffect(() => {
    onLoading(true);
    axios
      .get(`${url}/product/detail/${productId}`)
      .then(response => {
        const responseData = response.data;
        setLoadedConntents(responseData);
        onLoading(false);
      })
      .catch(err => {
        errorHandler(err);
      });
  }, [productId]);

  const productDeleteHandler = deletedProductId => {
    setLoadedConntents(prev => {
      prev.filter(product => product.productId !== deletedProductId);
    });
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedContents && (
        <DetailView
          items={loadedContents}
          onDeleteProduct={productDeleteHandler}
        />
      )}
    </>
  );
};

export default ProductDetail;
