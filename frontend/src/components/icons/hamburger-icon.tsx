/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const HamburgerIcon = (): JSX.Element => {
  return <svg css={svgCss}>
    <line css={lineCss} x1="9" x2="27" y1="10" y2="10" />
    <line css={lineCss} x1="9" x2="27" y1="18" y2="18" />
    <line css={lineCss} x1="9" x2="27" y1="26" y2="26" />
  </svg>;
};

const svgCss = css`
  height: 36px;
  width: 36px;
  border: 1px #595959 solid;
  border-radius: 6px;

  &:hover {
    cursor: pointer;
    border: 1px black solid;
  }
`;

const lineCss = css`
  stroke: black;
  stroke-width: 2px;
  stroke-linecap: round;
`;

export default HamburgerIcon;
