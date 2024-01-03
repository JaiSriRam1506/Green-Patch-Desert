import styled from "styled-components";
import { HiX } from "react-icons/hi";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

/*export default function Modal({ children, onClose }) {
  // return (
  //   <Overlay>
  //     <StyledModal>
  //       <Button onClick={onClose}>
  //         <HiX />
  //       </Button>
  //       <div>{children}</div>
  //     </StyledModal>
  //   </Overlay>
  // );
  // With Portal
  return createPortal(
    <Overlay>
      <StyledModal>
        <Button onClick={onClose}>
          <HiX />
        </Button>
        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}*/

/*1. Create Context API */

const ModalContext = createContext();

/* 2. Create Modal/Root Compound Compo and return Children, wrapping with Context APi */
export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

/* 3.Create Corresponding Modal/Compound Component */
function Open({ children, opens: opensWithModal }) {
  const { open } = useContext(ModalContext);

  /* To Clone and React Element so that we can pass extra features associated with props/state/function/event Handler */
  return cloneElement(children, { onClick: () => open(opensWithModal) });
}

/* 4.Create Another Compound comp which will be as sub Compound Comp */
function Window({ children, name }) {
  const { close, openName } = useContext(ModalContext);
  console.log(name, openName);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal>
        <Button onClick={close}>
          <HiX />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

/* 5. Assign all Sub Compound Comp to Main Compound Compo */
Modal.Open = Open;
Modal.Window = Window;
