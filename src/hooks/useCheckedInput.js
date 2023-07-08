import { useEffect, useState } from 'react';

export const useCheckedInput = (initialValue, inputHandler, id) => {
  const [checkedValue, setCheckedValue] = useState();

  useEffect(() => {
    setCheckedValue(initialValue);
  }, [initialValue]);

  const onChecked = e => {
    const selectedValue = e.target.value;

    setCheckedValue(selectedValue);

    if (id.includes('update') && selectedValue === 'DELIVERY') {
      inputHandler('tradeArea', null, true);
      return;
    }

    if (id.includes('register') && selectedValue === 'ALL') {
      inputHandler(e.target.name, 'DIRECT, DELIVERY', true);
      return;
    }

    inputHandler(e.target.name, selectedValue, true);
  };

  return [checkedValue, onChecked];
};
