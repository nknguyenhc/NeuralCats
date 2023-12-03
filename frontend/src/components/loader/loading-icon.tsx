/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const LoadingIcon = (): JSX.Element => {
  return <div css={loaderCss} />
};

const loaderCss = css`
  border: 8px #ededed solid;
  border-top: 8px #576aff solid;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingIcon;
