import React, { useState } from "react";
import styled from "styled-components";

import { FaCaretDown } from "react-icons/fa";

const DropDownBox = styled.div`
  position: relative;
  left: -1rem;
  width: 150px;
  user-select: none;
`;

const SelectButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  background: #fff;
  border: 1px solid rgba(224, 226, 231, 0.75);
  border-radius: 0.3rem;
  font-size: 15px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
`;

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  top: 110%;
  left: 0;
  z-index: 1;
  padding: 10px;
  background: #fff;
  box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
  font-weight: 500;
`;

const DropDownOption = styled.div`
  padding: 10px;
  cursor: pointer;
  transition: all 0.4s;

  &:hover{
    background: #f4f4f4;
  }
`;

const Dropdown = ({ className, options, selectedOpt, setSelectedOpt}) => {
  const [isActive, setIsActive] = useState(false);

  const handleDropDown = () => {
    setIsActive(!isActive);
  };

  return (
    <DropDownBox className={className}>
      <SelectButtonBox onClick={handleDropDown}>
        {selectedOpt === "" ? "선택하세요" : selectedOpt}
        <FaCaretDown/>
      </SelectButtonBox>
      {isActive && (
        <DropDown>
          {options.map((option) => (
            <DropDownOption
              key={option.id}
              onClick={() => {
                setSelectedOpt(option.item);
                setIsActive(false);
              }}>
              {option.item}
            </DropDownOption>
          ))}
        </DropDown>
      )}
    </DropDownBox>
  );
};

export default Dropdown;
