import ReactDOM from "react-dom";
import "../pages/Modal.css";

function Backdrop(props) {
  return <div className="Backdrop" onClick={props.onClick}></div>;
}

function ModalOverlay(props) {
  return <div className="ModalOverlay">{props.children}</div>;
}

const portalElement = document.getElementById("overlay");

function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay> 
            {props.children}
        </ModalOverlay>,
        portalElement)}
    </>
  );
}

export default Modal;
