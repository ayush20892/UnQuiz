import React, { useEffect } from "react";
import { QuizCard } from "../components/quizCard/quizCard";
import { useQuiz } from "../context/quizContext";

function Home() {
  const { quizState, quizDispatch } = useQuiz();
  useEffect(() => {
    quizDispatch({ type: "RESET" });
  }, []);
  return (
    <>
      <QuizCard quizzes={quizState.quizzes} />
    </>
  );
}

export default Home;
