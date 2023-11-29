/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Button = ({ text, onClick }: {
  text: string,
  onClick: () => void,
}): JSX.Element => {
  return <div css={buttonCss} onClick={onClick}>{text}</div>
}

const buttonCss = css`
  padding: 8px;
  border: 1px #c933ff solid;
  border-radius: 10px;
  cursor: pointer;
  width: fit-content;

  &:hover {
    border: 1px #8f02c2 solid;
  }
`;

export default Button;
