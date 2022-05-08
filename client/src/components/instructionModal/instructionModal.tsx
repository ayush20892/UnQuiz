import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/quizContext";
import "./instructionModal.css";

export default function InstructionModal() {
  const { quizState, quizDispatch } = useQuiz();
  const navigate = useNavigate();
  return (
    <div
      className="modal-page"
      onClick={() => quizDispatch({ type: "HIDE_INSTRUCTION_MODAL" })}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          Instructions
          <span
            onClick={() => quizDispatch({ type: "HIDE_INSTRUCTION_MODAL" })}
          >
            <AiOutlineClose />
          </span>
        </div>
        <div className="instruction-list">
          <h4>
            Total Time: <span>1 Mins</span>
          </h4>
          <h4>
            Total Questions: <span>5</span>
          </h4>
          <h4>
            Poistive Points: <span>3 Points</span>
          </h4>
          <h4>
            Negative Points: <span>1 Point</span>
          </h4>
          <h4>
            Total Points: <span>12 Points</span>
          </h4>
          <h4>
            Difficulty: <span>Easy</span>
          </h4>
        </div>
        <button
          onClick={() => {
            quizDispatch({ type: "HIDE_INSTRUCTION_MODAL" });
            navigate(quizState.quizToPlay);
          }}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
