const VALIDATOR_TYPE_REQUIRE = "REQUIRE"; // 필수
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH"; // 최소길이
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH"; // 최대길이
const VALIDATOR_TYPE_MIN = "MIN"; // 최솟값
const VALIDATOR_TYPE_MAX = "MAX"; // 최댓값
const VALIDATOR_TYPE_MATCH_PASSWORD = "MATCH_PASSWORD";
const VALIDATOR_TYPE_PASSWORD = "PASSWORD";
const VALIDATOR_TYPE_NAME = "NAME";

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_MATCH_PASSWORD = (val) => ({
  type: VALIDATOR_TYPE_MATCH_PASSWORD,
  val: val,
});
export const VALIDATOR_PASSWORD = (val) => ({
  type: VALIDATOR_TYPE_PASSWORD,
  val: val,
});
export const VALIDATOR_NAME = (val) => ({
  type: VALIDATOR_TYPE_NAME,
  val: val,
});

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MATCH_PASSWORD) {
      isValid = isValid && value === validators[0].val.value;
    }
    if (validator.type === VALIDATOR_TYPE_PASSWORD) {
      const check = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
      isValid = isValid && check.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_NAME) {
      const check = /^[가-힣]{0,}$/;
      isValid = isValid && check.test(value);
    }
  }
  return isValid;
};
