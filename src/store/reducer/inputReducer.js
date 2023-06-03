import { validate } from '../../util/validators';

export const inputReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INITIAL':
      return {
        ...state,
        value: action.initialValue || '',
        isValid: action.initialValid || false,
        isTouched: false,
      };

    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };

    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };

    case 'RESET':
      return { value: '', isValid: false, isTouched: false };

    default:
      return state;
  }
};
