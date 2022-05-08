import React from "react";
import { useParams } from "react-router-dom";
import { QuizQuestionCard } from "../components/quizQuestionCard/quizQuestionCard";

function QuizQuestion() {
  const { quizName, questionNumber } = useParams();
  return <QuizQuestionCard quizName={quizName!} questionNumber={+questionNumber!} />; 
}

export default QuizQuestion;
