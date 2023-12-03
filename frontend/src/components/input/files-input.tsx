/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, useRef } from "react";
import Button from "../button/button";

const FilesInput = ({ onChange }: {
  onChange: (e: ChangeEvent) => void,
}): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  return <div>
    <input css={inputCss} ref={inputRef} type="file" multiple={true} onChange={onChange} />
    <Button text="Choose Files" onClick={() => inputRef.current?.click()} />
  </div>;
};

const inputCss = css`
  display: none;
`;

export default FilesInput;
