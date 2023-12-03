/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useCallback, useState } from "react";
import TextInput from "../input/text-input";
import Button from "../button/button";
import LoadingIcon from "../loader/loading-icon";
import { useNavigate } from "react-router-dom";
import { postData } from "../../fetch/fetch";
import Modal from "../modal/modal";
import { useAppDispatch } from "../../redux/hooks";
import { login } from "../../redux/auth";

const Register = (): JSX.Element => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<{
    username: boolean,
    password: boolean,
    confirmPassword: boolean,
  }>({
    username: false,
    password: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  
  const handleSubmit = useCallback(() => {
    if (isLoading) {
      return;
    }

    let error = false;
    if (username === '') {
      setError(error => ({
        ...error,
        username: true,
      }));
      error = true;
    } else {
      setError(error => ({
        ...error,
        username: false,
      }));
    }
    if (password === '') {
      setError(error => ({
        ...error,
        password: true,
      }));
      error = true;
    } else {
      setError(error => ({
        ...error,
        password: false,
      }));
    }
    if (confirmPassword !== password) {
      setError(error => ({
        ...error,
        confirmPassword: true,
      }));
      error = true;
    } else {
      setError(error => ({
        ...error,
        confirmPassword: false,
      }));
    }

    if (error) {
      return;
    }

    setIsLoading(true);
    postData('/user/register', {
      username: username,
      password: password,
    }).then(res => {
      setIsLoading(false);
      setIsError(res.message !== 'success');
      setIsModalOpen(true);
      if (res.message === 'success') {
        dispatch(login({
          username: username,
          isStaff: false,
        }));
      }
    });
  }, [username, password, confirmPassword, isLoading, dispatch]);

  const closeModal = useCallback(() => {
    if (isError) {
      setIsModalOpen(false);
    } else {
      navigate("/");
    }
  }, [isError, navigate]);

  return <div css={registerBackgroundCss}>
    <div css={registerCss}>
      <div css={titleCss}>Register</div>
      <div css={mainCss}>
        <div css={sectionCss}>
          <div>Username</div>
          <TextInput
            value={username}
            onChange={e => setUsername((e.target as HTMLInputElement).value)}
            type="text"
          />
          {error.username && <div css={errorCss}>Username cannot be blank!</div>}
        </div>
        <div css={sectionCss}>
          <div>Password</div>
          <TextInput
            value={password}
            onChange={e => setPassword((e.target as HTMLInputElement).value)}
            type="password"
          />
          {error.password && <div css={errorCss}>Password cannot be blank!</div>}
        </div>
        <div css={sectionCss}>
          <div>Confirm Password</div>
          <TextInput
            value={confirmPassword}
            onChange={e => setConfirmPassword((e.target as HTMLInputElement).value)}
            type="password"
          />
          {error.confirmPassword && <div css={errorCss}>Password and confirm password must match!</div>}
        </div>
        <div css={buttonCss}>
          <Button text="Register" onClick={handleSubmit} />
          {isLoading && <LoadingIcon />}
        </div>
      </div>
    </div>
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      {isError ? "Username is already taken!" : "Account successfully created!"}
    </Modal>
  </div>;
};

const registerBackgroundCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const registerCss = css`
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

const errorCss = css`
  font-size: 16px;
  color: red;
`;

const buttonCss = css`
  align-self: flex-end;
  display: flex;
  flex-direction: row-reverse;
  gap: 15px;
  height: 50px;
  align-items: center;
`;

export default Register;
