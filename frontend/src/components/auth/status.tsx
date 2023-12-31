/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import humanIcon from './human-icon.png';
import { useCallback, useState } from "react";
import Modal from "../modal/modal";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth";
import LoadingIcon from "../loader/loading-icon";

const Status = (): JSX.Element => {
  const username = useAppSelector(state => state.auth.username);
  const isStaff = useAppSelector(state => state.auth.isStaff);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    if (!username) {
      navigate("/user/login");
    } else {
      setIsModalOpen(true);
    }
  }, [username, navigate]);

  const handleLogout = useCallback(() => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);
    fetch('/user/logout')
      .then(res => res.json())
      .then(res => {
        if (res.message === 'success') {
          dispatch(logout());
          setIsLoggingOut(false);
          setIsModalOpen(false);
        }
      })
  }, [dispatch, isLoggingOut]);

  return <>
    <div css={statusCss} onClick={handleClick}>
      <div css={humanIconCss}>
        <img src={humanIcon} alt="" />
      </div>
      <div>
        {username ? `Welcome, ${username}` : "Not logged in"}
      </div>
    </div>
    <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
      <div css={modalCss}>
        <div css={modalStatusCss}>
          <div css={humanIconCss}>
            <img src={humanIcon} alt="" />
          </div>
          <div>{isStaff ? "Staff" : "Member"}</div>
        </div>
        <div css={logoutLinkCss} onClick={handleLogout}>
          Logout
          {isLoggingOut && <LoadingIcon />}
        </div>
      </div>
    </Modal>
  </>;
};

const statusCss = css`
  position: fixed;
  top: 0px;
  right: 0px;
  border: black solid;
  border-width: 0px 0px 2px 2px;
  border-bottom-left-radius: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 15px;
  cursor: pointer;
`;

const humanIconCss = css`
  height: 30px;
  width: 30px;

  img {
    max-height: 100%;
    max-width: 100%;
  }
`;

const modalCss = css`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 200px;
`;

const modalStatusCss = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
`;

const logoutLinkCss = css`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

export default Status;
