import { useState } from 'react';

export const useCheckedInput = (initialValue, inputHandler) => {
  const [checkedValue, setCheckedValue] = useState(initialValue);

  const onChecked = e => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'category') {
      setCheckedValue(value);
      inputHandler(name, value, true);
    } else {
      let updateValue;

      if (value === '둘 다 가능') {
        updateValue = ['직거래', '택배'];
      } else {
        updateValue = [value];
      }

      setCheckedValue({ [value]: updateValue });
      inputHandler(name, updateValue, true);
    }
  };

  return [checkedValue, onChecked];
};
