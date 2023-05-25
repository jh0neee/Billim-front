import React, { useEffect, useReducer } from "react";
import styled, { css } from "styled-components";

import { inputReducer, initialState } from "../../store/reducer/inputReducer";

const defaultInput = css`
  width: ${(props) => props.width || "100%"};
  border: 1px solid ${(props) => props.theme.borderColor};
  outline: 0;
  font-size: 0.85rem;
  font-weight: 400;
  border-radius: 5px;
`;

const InputBox = styled.div`
  position: relative;
  margin: 8px 0;
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
`;

const StyledInput = styled.input`
  ${defaultInput}
  height: ${(props) => props.height || "43px"};
  padding: 1.6px 12.8px;

  ${(props) =>
    props.bar &&
    css`
      height: 30px;
      background: transparent;
      margin-top: 0.5rem;
      padding: 0 0.2rem;
      border: 0;
      border-radius: 0;
      border-bottom: 1.5px solid #ccc;
      font-size: 14px;
    `}
`;

const StyledTextArea = styled.textarea`
  ${defaultInput}
  padding: 8px 12.8px;
  resize: none;
`;

const ErrorText = styled.p`
  padding-top: 8px;
  padding-left: 6px;
  font-size: 0.5rem;
  color: red;

  ${(props) =>
    props.null &&
    css`
      display: none;
    `}
`;

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const { id, onInput, setReset, reset } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      val: e.target.value,
      validators: props.validators,
    });

    if (typeof setReset === "function") {
      setReset(false);
    }
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  useEffect(() => {
    if (reset) {
      dispatch({
        type: "RESET",
      });
    }
  }, [reset]);

  const element =
    props.element === "input" ? (
      <StyledInput
        id={props.id}
        type={props.type}
        bar={props.bar}
        width={props.width}
        height={props.height}
        value={props.value || inputState.value}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        disabled={props.disabled}
        required
      />
    ) : (
      <StyledTextArea
        id={props.id}
        rows={props.rows || 3}
        bar={props.bar}
        width={props.width}
        value={inputState.value}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        required
      />
    );

  return (
    <InputBox className={props.className}>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <ErrorText null={props.errorText === null}>{props.errorText}</ErrorText>
      )}
    </InputBox>
  );
};

export default Input;
