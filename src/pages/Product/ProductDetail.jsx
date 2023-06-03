import React from 'react';
import { useParams } from 'react-router-dom';

import DetailView from '../../components/Product/DetailView';
import { productItems } from '../../data';

const ProductDetail = () => {
  const itemName = useParams().itemName;
  const loadedContents = productItems.filter(item => item.name === itemName);

  return <DetailView items={loadedContents} />;
};

export default ProductDetail;
