/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const DropdownIcon = (): JSX.Element => {
  return <svg css={svgCss}>
    <line css={lineCss} x1="2" x2="10" y1="2" y2="10" />
    <line css={lineCss} x1="10" x2="18" y1="10" y2="2" />
  </svg>;
};

const svgCss = css`
  height: 12px;
  width: 20px;
`;

const lineCss = css`
  stroke: black;
  stroke-width: 2px;
  stroke-linecap: round;
`;

export default DropdownIcon;
