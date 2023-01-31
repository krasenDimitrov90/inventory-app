import React from "react";
import ReactDOM from "react-dom";

import './Modal.styles.scss';

const Backdrop = (props) => {
    return <div className={'backdrop'} onClick={props.onClose}/>;
  };
  
  const ModalOverlay = (props) => {

    const classes = `modal ${props.classes ? props.classes : ''}`;

    return (
      <div className={classes}>
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
          <ModalOverlay classes={props.classes} >{props.children}</ModalOverlay>,
          portalElement
        )}
      </>
    );
  };

export default Modal;