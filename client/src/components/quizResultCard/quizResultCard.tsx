import "./quizResultCard.css";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useQuiz } from "../../context/quizContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { updateUserScore } from "../../utils/networkCalls";

export function QuizResultCard() {
  const { quizState, quizDispatch } = useQuiz();
  const { authState, authDispatch } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    quizDispatch({ type: "RIGHT_WRONG" });
    quizDispatch({ type: "CLEAR_OPTIONS" });
  }, [quizDispatch]);

  useEffect(() => {
    if (quizState.quizToPlay === "") navigate("/");
    const newUserScore = authState.score + quizState.currentQuizScore;
    authDispatch({ type: "UPDATE_SCORE", payload: newUserScore });
    (async () => {
      await updateUserScore(newUserScore);
    })();
  }, []);

  return (
    <div className="quizResult">
      <div className="score">
        Quiz Score: <span>{quizState.currentQuizScore}</span>
      </div>
      <div className="right-wrong">
        <div className="correctly-answered answered-box">
          <AiOutlineCheck style={{ fill: "green" }} />{" "}
          <span>{quizState.userAnswer.right}</span>
          Correct
        </div>
        <div className="wrongly-answered answered-box">
          <AiOutlineClose style={{ fill: "red" }} />
          <span>{quizState.userAnswer.wrong}</span> Wrong
        </div>
      </div>
      <Link to="/">Home</Link>
    </div>
  );
}
