import React from "react";
import ReactDOM from "react-dom";

import './Modal.styles.scss';

const Backdrop = (props) => {
    return <div className={'backdrop'} onClick={props.onClose}/>;
  };
  
  const ModalOverlay = (props) => {
    return (
      <div className={'modal'}>
        <div className={'content'}>{props.children}</div>
      </div>
    );
  };
  
  const portalElement = document.getElementById('modal');
  
  const Modal = (props) => {
    return (
      <>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
        {ReactDOM.createPortal(
          <ModalOverlay>{props.children}</ModalOverlay>,
          portalElement
        )}
      </>
    );
  };

export default Modal;