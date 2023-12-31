/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";
import CloseIcon from "../icons/close-icon";
import { useState } from "react";
import HamburgerIcon from "../icons/hamburger-icon";
import { useAppSelector } from "../../redux/hooks";

const NavBar = (): JSX.Element => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const pathname = useLocation().pathname;
  const isStaff = useAppSelector(state => state.auth.isStaff);
  const username = useAppSelector(state => state.auth.username);

  return <div css={navbarCss(isClosed)}>
    <div css={linkContainerCss}>
      <Link css={navbarItemCss(pathname === "/")} to="/">Home</Link>
      <Link css={navbarItemCss(pathname === "/upload")} to="/upload">Upload</Link>
      {
        username
        ? <Link css={navbarItemCss(pathname === "/dashboard")} to="/dashboard">Dashboard</Link>
        : <Link css={navbarItemCss(pathname === "/user/login")} to="/user/login">Login</Link>
      }
      {isStaff && <Link css={navbarItemCss(pathname === "/requests")} to="/requests">Requests</Link>}
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
  width: ${isClosed ? "0px" : "300px"};
  height: 100vh;
  padding: 50px ${isClosed ? "0px" : "70px"};
  position: sticky;
  top: 0px;
  transition: width 0.3s linear, padding 0.3s linear;
  flex-shrink: 0;
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
  ${isClosed ? "" : "display: none;"}
`;

export default NavBar;
