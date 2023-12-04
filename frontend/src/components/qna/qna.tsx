/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useAppSelector } from "../../redux/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import Dropdown, { DropdownItemType } from "../dropdown/dropdown";
import { useSearchParams } from "react-router-dom";
import Button from "../button/button";
import LoadingIcon from "../loader/loading-icon";
import downloadIcon from "./download-icon.png";

const Qna = (): JSX.Element => {
  const mods = useAppSelector(state => state.mods.mods);
  const [modSelected, setModSelected] = useState<string | undefined>();
  const modDropdownItems: Array<DropdownItemType> = useMemo(() => mods.map(mod => ({
    text: mod.fullname,
    data: mod.code,
  })), [mods]);
  const [isModError, setIsModError] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [pdfLinks, setPdfLinks] = useState<{
    question: string,
    answer: string,
  } | undefined>(undefined);
  const difficultyLevelItems: Array<DropdownItemType> = useMemo(() => [
    {
      text: "Easy",
      data: "easy",
    },
    {
      text: "Medium",
      data: "medium",
    },
    {
      text: "Hard",
      data: "hard",
    },
  ], []);
  const [difficultySelected, setDifficultySelected] = useState<string | undefined>();
  const [isDifficultyError, setIsDifficultyError] = useState<boolean>(false);

  const handleModClick = useCallback((mod: string) => {
    setModSelected(mod);
    setSearchParams(params => ({ ...Object.fromEntries(params.entries()), mod }));
  }, [setSearchParams]);

  const handleDifficultyClick = useCallback((difficulty: string) => {
    setDifficultySelected(difficulty);
    setSearchParams(params => ({ ...Object.fromEntries(params.entries()), difficulty }));
  }, [setSearchParams]);

  const handleGet = useCallback(() => {
    let isError = false;
    if (modSelected === undefined) {
      setIsModError(true);
      isError = true;
    } else {
      setIsModError(false);
    }
    if (difficultySelected === undefined) {
      setIsDifficultyError(true);
      isError = true;
    } else {
      setIsDifficultyError(false);
    }
    if (isError) {
      return;
    }

    // Try to avoid multiple call
    if (isLoading) {
      return;
    }

    
    setIsLoading(true);
    setData(undefined);
    setPdfLinks(undefined);
    fetch(`/qna/?mod=${modSelected}&difficulty=${difficultySelected}`)
      .then(res => res.json())
      .then(res => {
        setData(res);
        setPdfLinks({
          question: `/qna/quiz/${res.qid}`,
          answer: `/qna/quiz/${res.aid}`,
        });
        setIsLoading(false);
      });
  }, [modSelected, difficultySelected, isLoading]);

  const initialModItem = () => searchParams.get('mod');

  const initialDifficultyItem = () => searchParams.get('difficulty');

  useEffect(() => {
    initialModItem() && handleModClick(initialModItem()!);
    initialDifficultyItem() && handleDifficultyClick(initialDifficultyItem()!);
  }, []);

  return <div css={qnaCss}>
    <div css={titleCss}>Get your practice quiz!</div>
    <div css={mainCss}>
      <div css={selectorCss}>
        <div css={moduleSelectorCss}>
          <div>Module:</div>
          <Dropdown
            items={modDropdownItems}
            onSelect={handleModClick}
            initialItem={initialModItem}
          />
        </div>
        <div css={moduleSelectorCss}>
          <div>Difficulty level:</div>
          <Dropdown
            items={difficultyLevelItems}
            onSelect={handleDifficultyClick}
            initialItem={initialDifficultyItem}
          />
        </div>
      </div>
      <Button text="Get quiz!" onClick={handleGet} />
      <div css={errorDivCss}>
        {isModError && <div css={errorCss}>Please select a module!</div>}
        {isDifficultyError && <div css={errorCss}>Please select a difficulty level!</div>}
      </div>
      {isLoading && <LoadingIcon />}
      {pdfLinks && <div css={pdfLinksCss}>
        <a href={pdfLinks.question} target="_blank" rel="noreferrer" css={pdfLinkCss}>
          <div>Questions</div>
          <img src={downloadIcon} alt="download" />
        </a>
        <a href={pdfLinks.answer} target="_blank" rel="noreferrer" css={pdfLinkCss}>
          <div>Answers</div>
          <img src={downloadIcon} alt="download" />
        </a>
      </div>}
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
  flex-direction: column;
  gap: 20px;
`;

const moduleSelectorCss = css`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

const errorDivCss = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const errorCss = css`
  font-size: 16px;
  color: red;
`;

const pdfLinksCss = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const pdfLinkCss = css`
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }

  img {
    max-height: 25px;
    max-width: 25px;
  }
`;

export default Qna;
