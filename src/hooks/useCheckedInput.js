import { useState } from "react";

export const useCheckedInput = (initialValue, inputHandler) => {
  const [checkedValue, setCheckedValue] = useState(initialValue);

  const onChecked = (e) => {
    setCheckedValue(e.target.value);
    inputHandler(e.target.name, e.target.value, true);
  };

  return [checkedValue, onChecked];
};
