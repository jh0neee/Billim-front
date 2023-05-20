import { validate } from "../../util/validators";

export const initialState = {
  value: "",
  isValid: false,
  isTouched: false,
};

export const inputReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};
 