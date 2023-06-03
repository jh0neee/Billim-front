import React from 'react';
import styled from 'styled-components';

const CardLayout = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  margin: 0;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 10px;
  position: relative;
  overflow: hidden;
`;

const Card = props => {
  return (
    <CardLayout
      className={props.className}
      width={props.width}
      height={props.height}
    >
      {props.children}
    </CardLayout>
  );
};

export default Card;
