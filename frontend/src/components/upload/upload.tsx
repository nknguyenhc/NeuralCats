/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Upload = (): JSX.Element => {
  return <div css={uploadCss}>
    Upload
  </div>;
};

const uploadCss = css`
  flex-grow: 1;
`;

export default Upload;
