/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, useCallback, useState } from "react";
import Button from "../button/button";
import TextInput from "../input/text-input";
import FilesInput from "../input/files-input";
import { postFormData } from "../../fetch/fetch";

const Upload = (): JSX.Element => {
  const [moduleName, setModuleName] = useState<string>('');
  const [files, setFiles] = useState<Array<File>>([]);

  const handleAddFile = useCallback((e: ChangeEvent) => {
    if ((e.target as HTMLInputElement).files) {
      setFiles(files => [
        ...files,
        ...Array.from((e.target as HTMLInputElement).files!),
      ]);
    }
  }, []);

  const handleDeleteFile = useCallback((fileToDelete: File) => () => {
    setFiles(files => files.filter(file => file !== fileToDelete));
  }, []);

  const handleUpload = useCallback(() => {
    postFormData('/request', {
      files: files,
      module: moduleName,
    }).then(res => console.log(res));
  }, [files, moduleName]);

  return <div css={uploadCss}>
    <div css={titleCss}>Upload a module material</div>
    <div css={mainCss}>
      <div css={inputGroupCss}>
        <div css={inputCss}>
          <div>Module code and name:</div>
          <TextInput onChange={(e) => setModuleName((e.target as HTMLInputElement).value)} />
        </div>
        <div css={inputCss}>
          <div>Module materials</div>
          <FilesInput onChange={handleAddFile} />
        </div>
      </div>
      <table css={tableCss}>
        <tr>
          <th css={numberHeaderCss}>Number</th>
          <th css={filenameHeaderCss}>File name</th>
          <th css={actionHeaderCss}>Action</th>
        </tr>
        {files?.map((file, fileIndex) => (
          <tr key={fileIndex}>
            <td>{fileIndex + 1}</td>
            <td>
              <a target="_blank" rel="noreferrer" css={fileLinkCss} href={URL.createObjectURL(file)}>{file.name}</a>
            </td>
            <td>
              <div css={deleteCss} onClick={handleDeleteFile(file)}>Delete</div>
            </td>
          </tr>
        ))}
      </table>
      <div css={submitButtonCss}>
        <Button text="Submit Request" onClick={handleUpload} />
      </div>
    </div>
  </div>;
};

const uploadCss = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 50px 100px;
  align-items: center;
`;

const titleCss = css`
  font-weight: 500;
  font-size: 36px;
  text-align: center;
`;

const mainCss = css`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: fit-content;
  min-width: 650px;
`;

const inputGroupCss = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const inputCss = css`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const tableCss = css`
  border: 1px black solid;
  border-collapse: collapse;

  th, td {
    border: 1px black solid;
    padding: 5px;
  }
`;

const numberHeaderCss = css`
  width: 20%;
`;

const filenameHeaderCss = css`
  width: 60%;
`;

const actionHeaderCss = css`
  width: 20%;
`;

const fileLinkCss = css`
  text-decoration: underline !important;
`;

const deleteCss = css`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const submitButtonCss = css`
  align-self: flex-end;
`;

export default Upload;
