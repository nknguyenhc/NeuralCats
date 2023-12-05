/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import LoadingIcon from "../loader/loading-icon";

type QuizInfo = {
  id: string,
  mod: string,
  difficulty: string,
}

const Dashboard = (): JSX.Element => {
  const username = useAppSelector(state => state.auth.username);
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Array<QuizInfo>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!username) {
      navigate("user/login");
      return;
    }

    fetch("/qna/user-quizzes")
      .then(res => res.json())
      .then(res => {
        setQuizzes(res.quizzes);
        setIsLoading(false);
      });
  }, [username, navigate]);

  return <div css={dashboardCss}>
    <div css={titleCss}>Your quizzes</div>
    <table css={tableCss}>
      <thead>
        <tr>
          <th>Number</th>
          <th>Quiz</th>
        </tr>
      </thead>
      <tbody>
        {quizzes.map((quiz, quizIndex) => (
          <tr>
            <td>{quizIndex + 1}</td>
            <td>
              <Link to={`/?mod=${quiz.mod}&difficulty=${quiz.difficulty}&id=${quiz.id}`}>{quiz.mod} ({quiz.difficulty})</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {isLoading && <LoadingIcon />}
  </div>;
};

const dashboardCss = css`
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
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
    text-align: center;
  }

  a {
    text-decoration: underline;
  }
`;

export default Dashboard;
