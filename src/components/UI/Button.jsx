import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const defaultButton = css`
  width: ${(props) => props.width || "300px"};
  height: ${(props) => (props.small ? "33px" : "45px")};
  outline: 0;
  border: 0;
  padding: 0.1rem 0.25rem;
  margin: 0.5rem 0px;
  font-size: ${(props) => (props.small ? "13px" : "17px")};
  font-weight: 500;
  border-radius: 5px;

  background: ${(props) =>
    props.sub ? props.theme.subButton : props.theme.mainButton};
  color: ${(props) => (props.sub ? props.theme.fontColor : "white")};

  &:hover {
    background: ${(props) =>
      props.sub ? props.theme.subHover : props.theme.mainHover};
  }
`;

const LinkButton = styled(Link)`
  ${defaultButton}
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "SCDream";
`;

const StyledButton = styled.button`
  ${defaultButton}
`;

const Button = (props) => {
  if (props.to) {
    return (
      <LinkButton to={props.to} width={props.width} sub={props.sub}>
        {props.children}
      </LinkButton>
    );
  }

  return (
    <StyledButton
      sub={props.sub}
      small={props.small}
      width={props.width}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}>
      {props.children}
    </StyledButton>
  );
};

export default Button;
