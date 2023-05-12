import React from "react";
import styled, { css } from "styled-components";

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

const Input = (props) => {
  const element =
    props.element === "input" ? (
      <StyledInput
        id={props.id}
        type={props.type}
        bar={props.bar}
        width={props.width}
        height={props.height}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        required
      />
    ) : (
      <StyledTextArea
        id={props.id}
        rows={props.rows || 3}
        bar={props.bar}
        width={props.width}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        required
      />
    );

  return (
    <InputBox className={props.className}>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      {element}
      <p>{props.errorText}</p>
    </InputBox>
  );
};

export default Input;
