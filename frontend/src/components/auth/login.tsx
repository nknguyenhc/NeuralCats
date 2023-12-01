/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TextInput from "../input/text-input";
import { useCallback, useState } from "react";
import Button from "../button/button";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../fetch/fetch";
import LoadingIcon from "../loader/loading-icon";
import Modal from "../modal/modal";

const Login = (): JSX.Element => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = useCallback(() => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    postData('/user/login', {
      username: username,
      password: password,
    }).then(res => {
      setIsLoading(false);
      setIsError(res.message !== 'success');
      setIsModalOpen(true);
    });
  }, [username, password, isLoading]);

  const closeModal = useCallback(() => {
    if (isError) {
      setIsModalOpen(false);
    } else {
      navigate("/");
    }
  }, [isError, navigate]);

  return <div css={loginBackgroundCss}>
    <div css={loginCss}>
      <div css={titleCss}>Login</div>
      <div css={mainCss}>
        <div css={sectionCss}>
          <div>Username</div>
          <TextInput
            value={username}
            onChange={e => setUsername((e.target as HTMLInputElement).value)}
            type="text"
          />
        </div>
        <div css={sectionCss}>
          <div>Password</div>
          <TextInput
            value={password}
            onChange={e => setPassword((e.target as HTMLInputElement).value)}
            type="password"
          />
        </div>
        <div css={buttonCss}>
          <Button text="Login" onClick={handleSubmit} />
          {isLoading && <LoadingIcon />}
        </div>
      </div>
      <div css={createAccountCss}>New to NeuralCats? <Link to="/user/register">Create a new account</Link>!</div>
    </div>
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      {isError ? "Wrong username or password!" : "Login successful!"}
    </Modal>
  </div>;
};

const loginBackgroundCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const loginCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 70px;
`;

const titleCss = css`
  font-size: 40px;
  font-weight: 600;
`;

const mainCss = css`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const sectionCss = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const buttonCss = css`
  align-self: flex-end;
  display: flex;
  flex-direction: row-reverse;
  gap: 15px;
  height: 50px;
  align-items: center;
`;

const createAccountCss = css`
  a {
    text-decoration: underline;
  }
`;

export default Login;
