import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

const SideDrawerLayout = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  height: 100vh;
  width: 20%;
  background: white;
`;

const SideDrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames='slide-left'
      mountOnEnter
      unmountOnExit>
      <SideDrawerLayout onClick={props.onClick}>
        {props.children}
      </SideDrawerLayout>
    </CSSTransition>
  );
  
  return ReactDOM.createPortal(content, document.getElementById("drawer"));
};

export default SideDrawer;
