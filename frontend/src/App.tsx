/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import NavBar from './components/navbar/navbar';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks';
import { setMods } from './redux/mods';
import { postData } from './fetch/fetch';
import Status from './components/auth/status';
import { load, login } from './redux/auth';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch('/qna/available-mods')
      .then(res => res.json())
      .then(res => {
        dispatch(setMods(res));
      });
    postData('/user/refresh', {})
      .then(res => {
        if (res.message === 'success') {
          dispatch(login({
            username: res.username,
            isStaff: res.staff,
          }));
        }
        dispatch(load());
      });
  }, [dispatch]);

  return (
    <div css={appCss}>
      <NavBar />
      <div css={mainCss}>
        <Outlet />
      </div>
      <Status />
    </div>
  );
}

const appCss = css`
  display: flex;
  flex-direction: row;

  a {
    text-decoration: none;
    color: black;

    &:visited {
      color: black;
    }
  }

  input {
    font-size: 20px;
  }
`;

const mainCss = css`
  flex-grow: 1;
`;

export default App;
