/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { fetchData } from './fetch/fetch';

function App() {
  const [data, setData] = useState<any>('');

  useEffect(() => {
    fetchData('/qna', {
      mod: "CS2030S",
    }).then(res => setData(res));
  }, []);

  return (
    <div className="App" css={sampleCss}>
      Hello, world! Data from backend: 
      {JSON.stringify(data)}
    </div>
  );
}

const sampleCss = css`
  color: red;
`;

export default App;
