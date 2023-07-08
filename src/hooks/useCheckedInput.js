import { useState } from 'react';

export const useCheckedInput = (initialValue, inputHandler) => {
  const [checkedValue, setCheckedValue] = useState();

  const onChecked = e => {
    const selectedValue = e.target.value;

    setCheckedValue(selectedValue);

    if (selectedValue === 'ALL') {
      inputHandler(e.target.name, 'DIRECT, DELIVERY', true);
      return;
    }

    inputHandler(e.target.name, selectedValue, true);
  };

  return [checkedValue, onChecked];
};
