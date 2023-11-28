/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";
import CloseIcon from "../icons/close-icon";
import { useState } from "react";
import HamburgerIcon from "../icons/hamburger-icon";

const NavBar = (): JSX.Element => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const pathname = useLocation().pathname;

  return <div css={navbarCss(isClosed)}>
    <div css={linkContainerCss}>
      <Link css={navbarItemCss(pathname === "/")} to="/">Home</Link>
      <Link css={navbarItemCss(pathname === "/upload")} to="/upload">Upload</Link>
      <div css={closeIconCss} onClick={() => setIsClosed(true)}>
        <CloseIcon />
      </div>
    </div>
    <div css={openIconCss(isClosed)} onClick={() => setIsClosed(false)}>
      <HamburgerIcon />
    </div>
  </div>;
};

const navbarCss = (isClosed: boolean) => css`
  background-color: #f772e8;
  box-sizing: border-box;
  width: ${isClosed ? "0px" : "300px"};
  height: 100vh;
  padding: 50px ${isClosed ? "0px" : "70px"};
  position: relative;
  transition: width 0.3s linear, padding 0.3s linear;
`;

const linkContainerCss = css`
  display: flex;
  flex-direction: column;
  gap: 25px;
  overflow: hidden;
`;

const navbarItemCss = (isHighlighting: boolean) => css`
  font-size: 24px;
  ${isHighlighting ? "font-weight: 600;" : ""}

  &:hover {
    text-decoration: underline;
  }
`;

const closeIconCss = css`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const openIconCss = (isClosed: boolean) => css`
  position: absolute;
  top: 10px;
  left: 10px;
  ${isClosed ? "" : "z-index: -1;"}
`;

export default NavBar;
