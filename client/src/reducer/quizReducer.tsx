import { QuizInitialState, QuizAction } from "..//utils/types";
import { Option } from "../utils/types";
import { QuizScore } from "../utils/quizScore";

export function quizReducer(
  state: QuizInitialState,
  action: QuizAction
): QuizInitialState {
  switch (action.type) {
    case "RESET":
      return {
        ...state,
        currentQuizScore: 0,
        optionSelected: [],
        userAnswer: { right: 0, wrong: 0, notAnswered: 0 },
      };
    case "CURRENT_QUIZ_SCORE":
      return {
        ...state,
        currentQuizScore: QuizScore(
          state.currentQuizScore,
          action.payload.question,
          action.payload.option
        ),
      };
    case "SELECTED_OPTION":
      const newOptionsSelected = [...state.optionSelected];
      newOptionsSelected[action.payload.questionNumber] = action.payload.option;
      return {
        ...state,
        optionSelected: newOptionsSelected,
      };
    case "CLEAR_OPTIONS":
      return { ...state, optionSelected: [] };
    case "RIGHT_WRONG":
      let right = 0;
      let wrong = 0;
      let notAnswered = 0;
      state.optionSelected.forEach((ele: Option) => {
        if (ele.value === "notAnswered") notAnswered += 1;
        else if (ele.isRight === true) right += 1;
        else wrong += 1;
      });
      return {
        ...state,
        userAnswer: {
          right,
          wrong,
          notAnswered,
        },
      };
    case "SHOW_ANSWER":
      return { ...state, showAnswer: action.payload };

    case "SET_TIMER":
      return { ...state, timer: action.payload };

    case "LOAD_QUIZ":
      return { ...state, quizzes: action.payload };

    case "SHOW_INSTRUCTION_MODAL":
      return { ...state, instructionModal: true };

    case "HIDE_INSTRUCTION_MODAL":
      return { ...state, instructionModal: false };

    case "QUIZ_TO_PLAY":
      return { ...state, quizToPlay: action.payload };

    default:
      return { ...state };
  }
}

export const quizInitialState: QuizInitialState = {
  quizzes: [],
  currentQuizScore: 0,
  optionSelected: JSON.parse(localStorage.getItem("optionSelected")!) || [],
  userAnswer: {
    right: 0,
    wrong: 0,
    notAnswered: 0,
  },
  showAnswer: false,
  timer: 10,
  instructionModal: false,
  quizToPlay: "",
};
