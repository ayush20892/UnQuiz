import "./quizCard.css";
import { Quiz } from "../../utils/types";
import { useQuiz } from "../../context/quizContext";

export function QuizCard({ quizzes }: { quizzes: Quiz[] }) {
  const { quizDispatch } = useQuiz();
  const startQuiz = 0;
  return (
    <div className="quiz-list">
      {quizzes.map(({ quizName, quizImage }: Quiz) => {
        return (
          <div className="quiz-card" key={quizName}>
            <img src={quizImage!} alt={quizName} />
            <h3>{quizName}</h3>
            <button
              onClick={() => {
                quizDispatch({ type: "SHOW_INSTRUCTION_MODAL" });
                quizDispatch({
                  type: "QUIZ_TO_PLAY",
                  payload: `/quiz/${quizName}/${startQuiz}`,
                });
              }}
            >
              Start Quiz
            </button>
          </div>
        );
      })}
    </div>
  );
}
