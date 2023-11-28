/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useAppSelector } from "../../redux/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import Dropdown, { DropdownItemType } from "../dropdown/dropdown";
import { useSearchParams } from "react-router-dom";

const Qna = (): JSX.Element => {
  const mods = useAppSelector(state => state.mods.mods);
  const [modSelected, setModSelected] = useState<string | undefined>();
  const modDropdownItems: Array<DropdownItemType> = useMemo(() => mods.map(mod => ({
    text: mod.fullname,
    data: mod.code,
  })), [mods]);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<any>();

  const handleClick = useCallback((mod: string) => {
    setModSelected(mod);
    setSearchParams({ mod });
  }, [setSearchParams]);

  const handleGet = useCallback(() => {
    if (modSelected === undefined) {
      setIsError(true);
      return;
    }
    setIsError(false);

    fetch(`/qna?mod=${modSelected}`)
      .then(res => res.json())
      .then(res => setData(res));
  }, [modSelected]);

  useEffect(() => {
    if (searchParams.get('mod') && mods.map(mod => mod.code).includes(searchParams.get('mod')!)) {
      handleClick(searchParams.get('mod')!);
    }
  }, [searchParams, mods, handleClick]);

  const initialItem = () => searchParams.get('mod');

  return <div css={qnaCss}>
    <div css={titleCss}>Get your practice quiz!</div>
    <div css={mainCss}>
      <div css={selectorCss}>
        <div css={moduleSelectorCss}>
          <div>Module:</div>
          <Dropdown
            items={modDropdownItems}
            onSelect={handleClick}
            initialItem={initialItem}
          />
        </div>
        <div css={getQuizButtonCss} onClick={handleGet}>Get quiz!</div>
      </div>
      {isError && <div css={errorCss}>Please select a module!</div>}
      <div>{JSON.stringify(data)}</div>
    </div>
  </div>;
};

const qnaCss = css`
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  gap: 30px;
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
  align-items: center;
`;

const selectorCss = css`
  display: flex;
  flex-direction: row;
  gap: 100px;
  align-items: center;
`;

const moduleSelectorCss = css`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

const getQuizButtonCss = css`
  padding: 8px;
  border: 1px #c933ff solid;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    border: 1px #8f02c2 solid;
  }
`;

const errorCss = css`
  font-size: 16px;
  color: red;
`;

export default Qna;
