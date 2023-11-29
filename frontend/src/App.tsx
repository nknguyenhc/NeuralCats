/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import NavBar from './components/navbar/navbar';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks';
import { setMods } from './redux/mods';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch('/qna/available-mods')
      .then(res => res.json())
      .then(res => {
        dispatch(setMods(res));
      });
  }, [dispatch]);

  return (
    <div css={appCss}>
      <NavBar />
      <div css={mainCss}>
        <Outlet />
      </div>
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
