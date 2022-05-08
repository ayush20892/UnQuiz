import { Option, Question } from "./types";

export function QuizScore(
  currentScore: number,
  question: Question,
  selectedOption: Option
): number {
  return selectedOption.isRight
    ? currentScore + question.points
    : currentScore - question.negativePoints;
}
