export type Option = {
  value: string;
  isRight: boolean;
};

export type Question = {
  questionNumber: number;
  question: string;
  points: number;
  negativePoints: number;
  options: Option[];
};

export type Quiz = {
  quizName: string;
  quizImage: string;
  questions: Question[];
};

export type userType = {
  _id: string;
  name: string;
  email: string;
  role: string;
  score: number;
};

export type AuthInitialStateType = {
  userId: string | null;
  userName: string;
  score: number;
};

export type AuthActionType =
  | { type: "CREATE_SESSION"; payload: userType }
  | { type: "START_SESSION"; payload: userType }
  | { type: "END_SESSION" }
  | { type: "UPDATE_SCORE"; payload: number };

export type AuthContextType = {
  authState: AuthInitialStateType;
  authDispatch: (action: AuthActionType) => void;
  networkLoader: Boolean;
  setNetworkLoader: Function;
};

export type Children = { children: React.ReactElement };

export type QuizInitialState = {
  quizzes: Quiz[];
  currentQuizScore: number;
  optionSelected: Option[];
  userAnswer: {
    right: number;
    wrong: number;
    notAnswered: number;
  };
  showAnswer: boolean;
  timer: number;
  instructionModal: boolean;
  quizToPlay: string;
};

export type QuizAction =
  | { type: "RESET" }
  | {
      type: "CURRENT_QUIZ_SCORE";
      payload: { question: Question; option: Option };
    }
  | {
      type: "SELECTED_OPTION";
      payload: {
        option: Option;
        questionNumber: number;
      };
    }
  | { type: "CLEAR_OPTIONS" }
  | { type: "RIGHT_WRONG" }
  | { type: "SHOW_ANSWER"; payload: boolean }
  | { type: "SET_TIMER"; payload: number }
  | { type: "LOAD_QUIZ"; payload: [] }
  | { type: "SHOW_INSTRUCTION_MODAL" }
  | { type: "HIDE_INSTRUCTION_MODAL" }
  | { type: "QUIZ_TO_PLAY"; payload: string };

export type QuizContextType = {
  quizState: QuizInitialState;
  quizDispatch: (action: QuizAction) => void;
};
