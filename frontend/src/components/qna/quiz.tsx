/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useCallback, useState } from "react";
import Button from "../button/button";

interface Question {
  question: string;
  options: string[];
}

export interface QuizData {
  questions: Question[];
  answers: string[];
}

const Quiz = ({ quizData }: {
    quizData: QuizData,
}): JSX.Element => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<Array<string | undefined>>(Array(quizData.questions.length).fill(''));
  const [showResult, setShowResult] = useState<Array<boolean>>(Array(quizData.questions.length).fill(false));

  const handleOptionSelect = useCallback((option: string) => {
    if (!showResult[currentQuestion]) {
      setSelectedOptions(options => {
        const res = [...options];
        res[currentQuestion] = option;
        return res;
      });
    }
  }, [showResult, currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }, [currentQuestion, quizData]);

  const handlePrev = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }, [currentQuestion]);

  const handleFirst = useCallback(() => {
    setCurrentQuestion(0);
  }, []);

  const handleLast = useCallback(() => {
    setCurrentQuestion(quizData.questions.length - 1);
  }, [quizData]);

  const handleCheck = useCallback(() => {
    setShowResult(arr => {
      const res = [...arr];
      res[currentQuestion] = true;
      return res;
    });
  }, [currentQuestion]);

  const handleCheckAll = useCallback(() => {
    setShowResult(arr => arr.map(() => true));
  }, []);

  const handleReset = useCallback(() => {
    setShowResult(arr => arr.map(() => false));
  }, []);

  const isHighlighting = useCallback((index: number): boolean => {
    return showResult[currentQuestion] && quizData.answers[currentQuestion].charCodeAt(0) - 'a'.charCodeAt(0) === index;
  }, [showResult, quizData, currentQuestion])

  return (
    <div css={quizCss}>
      <div css={questionLabelCss}>Question {currentQuestion + 1}</div>
      <div>{quizData.questions[currentQuestion].question.split(' ').slice(1).join(' ')}</div>

      <div css={optionsCss}>
        {quizData.questions[currentQuestion].options.map((option, index) => (
          <label css={[optionCss, optionHighlightCss(isHighlighting(index))]} key={index}>
            <input
              type="radio"
              value={option}
              checked={selectedOptions[currentQuestion] === option}
              onChange={() => handleOptionSelect(option)}
            />
            <span>
              <div />
            </span>
            {option}
          </label>
        ))}
      </div>

      <div css={buttonsCss}>
        <div css={navButtonsCss}>
          <Button text="<<" onClick={handleFirst} />
          <Button text="<" onClick={handlePrev} />
          <Button text=">" onClick={handleNext} />
          <Button text=">>" onClick={handleLast} />
        </div>
        <div css={checkAnsButtonsCss}>
          <Button text="Check" onClick={handleCheck} />
          <Button text="Check all" onClick={handleCheckAll} />
          <Button text="Reset" onClick={handleReset} />
        </div>
      </div>
    </div>
  );
};

const quizCss = css`
  width: 80%;
  background: #f0f0f0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const questionLabelCss = css`
  font-size: 28px;
  font-weight: 500;
`;

const optionsCss = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const optionCss = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  padding: 3px 3px 3px 13px;
  cursor: pointer;

  input {
    display: none;
  }
  
  span {
    background-color: #c3c3c3;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;

    div {
      display: none;
      height: 12px;
      width: 12px;
      border-radius: 50%;
    }
  }

  &:hover span {
    background-color: #959595;
  }

  input:checked ~ span {
    background-color: #959595;

    div {
      display: block;
      background-color: #0642ff;
    }
  }
`;

const optionHighlightCss = (isHighlighting: boolean) => css`
  ${isHighlighting ? "background-color: #64eb64;" : ""}
`;

const buttonsCss = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const navButtonsCss = css`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const checkAnsButtonsCss = css`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

export default Quiz;
