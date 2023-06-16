import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import BackDrop from './BackDrop';
import { CSSTransition } from 'react-transition-group';
import theme from '../../styles/theme';

const ModalLayout = styled.div`
  z-index: 100;
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 100vh;
  width: 25rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  font-family: 'SCDream';
  padding: 1rem 1.3rem;

  @media ${theme.desktop} {
    width: 25%;
    max-width: 1440px;
  }
  @media ${theme.mobile}, ${theme.tablet}, ${theme.laptop} {
    max-width: 400px;
    width: 90%;
  }
  @media (min-height: 100vh) {
    top: 50%;
  }
`;

const ModalHeader = styled.header`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 1rem 0;
`;

const ModalBox = styled.div`
  font-size: 0.94rem;
  padding: 1.6rem 0.5rem;
  line-height: 1.4rem;
`;

const ModalFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  > * {
    margin-left: 0.5rem;
  }
`;

const ModalOverlay = props => {
  const content = (
    <ModalLayout className={props.className}>
      <ModalHeader>{props.header}</ModalHeader>
      <form
        onSubmit={props.onSubmit ? props.onSubmit : e => e.preventDefault()}
      >
        <ModalBox>{props.children}</ModalBox>
        <ModalFooter>{props.footer}</ModalFooter>
      </form>
    </ModalLayout>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal'));
};

const Modal = props => {
  return (
    <>
      {props.show && <BackDrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
