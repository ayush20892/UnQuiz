import "./quizQuestionCard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuiz } from "../../context/quizContext";
import { increaseQuestionNumber, buttonColor } from "../../utils/quizUtil";
import { Question, Quiz } from "../../utils/types";

export function QuizQuestionCard({
  quizName,
  questionNumber,
}: {
  quizName: string;
  questionNumber: number;
}) {
  const [currentOptionSelected, setCurrentOptionSelected] = useState("");
  const [optionLocked, setOptionLocked] = useState(false);
  const { quizState, quizDispatch } = useQuiz();
  const navigate = useNavigate();
  const quizData: Question[] = quizState.quizzes.find(
    (singleQuiz: Quiz) => singleQuiz.quizName === quizName
  )!.questions;
  const currentquestion = quizData[questionNumber];

  useEffect(() => {
    setOptionLocked(false);
    quizDispatch({ type: "SHOW_ANSWER", payload: false });
    if (questionNumber < 5) quizDispatch({ type: "SET_TIMER", payload: 10 });
  }, [questionNumber, quizDispatch]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (quizState.timer > 0) {
      if (!optionLocked)
        timeout = setTimeout(
          () =>
            quizDispatch({ type: "SET_TIMER", payload: quizState.timer - 1 }),
          1000
        );
    } else {
      navigate(`/quiz/${quizName}/${increaseQuestionNumber(questionNumber)}`);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [
    quizState.timer,
    navigate,
    questionNumber,
    quizName,
    quizDispatch,
    optionLocked,
  ]);

  return (
    <div className="quiz-question-card">
      <div className="quiz-timer"> {quizState.timer} </div>
      <h2 className="question">
        Q{currentquestion.questionNumber}&gt; {currentquestion.question}
      </h2>
      <div className="options">
        {currentquestion.options.map((option) => {
          return (
            <button
              key={option.value}
              style={
                option.isRight === true ||
                option.value === currentOptionSelected
                  ? buttonColor(quizState.showAnswer, option)
                  : {}
              }
              onClick={() => {
                if (!optionLocked) {
                  setOptionLocked(true);
                  setCurrentOptionSelected(option.value);
                  quizDispatch({ type: "SHOW_ANSWER", payload: true });
                  quizDispatch({
                    type: "SELECTED_OPTION",
                    payload: { option, questionNumber },
                  });
                  quizDispatch({
                    type: "CURRENT_QUIZ_SCORE",
                    payload: { question: currentquestion, option: option },
                  });
                }
              }}
            >
              {option.value}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => {
          if (!optionLocked) {
            quizDispatch({
              type: "SELECTED_OPTION",
              payload: {
                questionNumber,
                option: { value: "notAnswered", isRight: false },
              },
            });
          }
          navigate(
            `/quiz/${quizName}/${increaseQuestionNumber(questionNumber)}`
          );
        }}
      >
        Next
      </button>
      <div className="restart">
        <button
          onClick={() => {
            quizDispatch({ type: "RESET" });
            quizDispatch({ type: "SHOW_ANSWER", payload: false });
            navigate(`/quiz/${quizName}/${0}`);
          }}
        >
          Restart Quiz
        </button>

        <button
          onClick={() => {
            quizDispatch({ type: "RESET" });
            navigate(`/`);
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
}
