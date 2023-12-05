/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const NotFound = (): JSX.Element => {
  return <div css={notFoundCss}>
    <img src={process.env.PUBLIC_URL + "/favicon.ico"} alt="" />
    <div css={notFoundTextCss}>Not found!</div>
  </div>;
};

const notFoundCss = css`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const notFoundTextCss = css`
  font-size: 30px;
  font-weight: 500;
`;

export default NotFound;
