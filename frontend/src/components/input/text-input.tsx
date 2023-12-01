/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent } from "react";

const TextInput = ({ value, onChange, type }: {
  value: string,
  onChange: (e: ChangeEvent) => void,
  type: "text" | "password"
}): JSX.Element => {
  return <input css={inputCss} type={type} value={value} onChange={onChange} />
};

const inputCss = css`
  height: 40px;
  padding: 5px 8px;
  border: 1px black solid;
  border-radius: 5px;
  width: 400px;
`;

export default TextInput;
