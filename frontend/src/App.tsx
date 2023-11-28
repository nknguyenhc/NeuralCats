/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import NavBar from './components/navbar/navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App" css={appCss}>
      <NavBar />
      <Outlet />
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
`;

export default App;
