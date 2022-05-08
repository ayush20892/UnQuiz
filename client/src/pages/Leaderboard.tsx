import React, { useEffect } from "react";
import LeaderboardList from "../components/leaderboardList/leaderboardList";
import { useQuiz } from "../context/quizContext";

export default function Leaderboard() {
  const { quizDispatch } = useQuiz();
  useEffect(() => {
    quizDispatch({ type: "RESET" });
  }, []);
  return <LeaderboardList />;
}
