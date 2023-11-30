/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import CloseIcon from "../icons/close-icon";

const Modal = ({ children, isOpen, closeModal }: PropsWithChildren<{
  isOpen: boolean,
  closeModal: () => void,
}>): JSX.Element => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [windowDimensions, setWindowDimensions] = useState<{
    height: number,
    width: number,
  }>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    const rect = windowRef.current!.getBoundingClientRect();
    setWindowDimensions({
      height: rect.bottom - rect.top,
      width: rect.right - rect.left,
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      windowRef.current!.animate([
        {
          transform: 'scale(0)',
        },
        {
          transform: 'scale(1)',
        },
      ], {
        duration: 300,
      });
    }
  }, [isOpen, windowDimensions]);

  return <div css={modalCss(isOpen)}>
    <div css={modalWindowCss} ref={windowRef}>
      {children}
      <div css={closeIconCss} onClick={closeModal}>
        <CloseIcon />
      </div>
    </div>
  </div>;
};

const modalCss = (isOpen: boolean) => css`
  background-color: rgba(100, 100, 100, 0.6);
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  ${isOpen ? "" : "display: none;"}
`;

const modalWindowCss = css`
  background-color: white;
  padding: 40px;
  border-radius: 15px;
  position: relative;
`;

const closeIconCss = css`
  position: absolute;
  right: 5px;
  top: 5px;
`;

export default Modal;
