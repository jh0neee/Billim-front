import { useState } from 'react';

export const useCheckedInput = (initialValue, inputHandler) => {
  const [checkedValue, setCheckedValue] = useState(initialValue);

  const onChecked = e => {
    const selectedValue = e.target.value;

    if (selectedValue === 'DELIVERY') {
      inputHandler('tradeArea', null, true);
    }

    setCheckedValue(selectedValue);
    inputHandler(e.target.name, selectedValue, true);
  };

  return [checkedValue, onChecked];
};
