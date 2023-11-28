/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const CloseIcon = (): JSX.Element => {
  return <svg css={svgCss}>
    <line css={lineCss} x1="9" x2="27" y1="9" y2="27" />
    <line css={lineCss} x1="9" x2="27" y1="27" y2="9" />
  </svg>
};

const svgCss = css`
  height: 36px;
  width: 36px;
  border: 1px transparent solid;
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

export default CloseIcon;
