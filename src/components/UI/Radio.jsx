import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

const StyledInput = styled.input`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 1rem;
  height: 1rem;
  margin: 0 0.5rem -1.5px 1rem;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${({ disabled }) => (disabled ? '#ced4da' : '#fcd34d')};
  }

  @media ${theme.mobile},
    ${theme.tablet},
    (min-width: 769px) and (max-width: 1097px) {
    margin: 0.5rem 0.5rem -1.5px 1rem;
  }
`;

const Radio = ({ item, name, checked, onChecked, disabled }) => {
  return (
    <>
      <StyledInput
        type="radio"
        id={`radio-${item.name}`}
        name={name}
        value={item.name}
        checked={checked === item.name}
        onChange={onChecked}
        disabled={disabled}
      />
      <label htmlFor={`radio-${item.name}`}>{item.name}</label>
    </>
  );
};

export default Radio;
