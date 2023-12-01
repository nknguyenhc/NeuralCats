/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";

type FileType = {
  display: string,
  data: string,
}

type RequestType = {
  id: string,
  module: string,
  files: Array<FileType>,
}

const Requests = (): JSX.Element => {
  const [requests, setRequests] = useState<Array<RequestType>>([]);
  const isStaff = useAppSelector(state => state.auth.isStaff);

  useEffect(() => {
    if (!isStaff) {
      return;
    }

    fetch('/request/')
      .then(res => res.json())
      .then(res => {
        setRequests(res.requests.map((req: any) => ({
          id: req.id,
          module: req.module,
          files: req.files.map((file: any) => ({
            display: file.original,
            data: `${file.modified}_${file.original}`,
          }))
        })))
      })
  }, [isStaff]);

  if (!isStaff) {
    return <div css={requestCss}>Not authorised</div>;
  }

  return <div css={requestCss}>
    <div css={titleCss}>Module Requests</div>
    <table css={tableCss}>
      <thead>
        <tr>
          <th css={numberHeaderCss}>Number</th>
          <th css={moduleHeaderCss}>Module</th>
          <th css={fileHeaderCss}>Files</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request, requestIndex) => (
          <tr key={request.id}>
            <td css={centerCellCss}>{requestIndex + 1}</td>
            <td css={centerCellCss}>{request.module}</td>
            <td>
              <div css={fileListCss}>
                {request.files.map((file) => (
                  <a css={fileLinkCss} href={`request/${request.id}/${file.data}`} target="_blank" rel="noreferrer" key={file.data}>
                    {file.display}
                  </a>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>;
};

const requestCss = css`
  padding: 100px 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`;

const titleCss = css`
  font-weight: 500;
  font-size: 36px;
`;

const tableCss = css`
  min-width: 700px;
  border: 1px black solid;
  border-collapse: collapse;

  th, td {
    border: 1px black solid;
    padding: 5px;
  }
`;

const numberHeaderCss = css`
  width: 10%;
`;

const moduleHeaderCss = css`
  width: 10%;
`;

const fileHeaderCss = css`
  width: 80%;
`;

const centerCellCss = css`
  text-align: center;
`;

const fileListCss = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const fileLinkCss = css`
  text-decoration: underline !important;
  width: fit-content;
`;

export default Requests;
