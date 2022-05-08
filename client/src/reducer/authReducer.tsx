import { AuthActionType, AuthInitialStateType } from "../utils/types";

export function authReducer(
  state: AuthInitialStateType,
  action: AuthActionType
): AuthInitialStateType {
  switch (action.type) {
    case "CREATE_SESSION": {
      localStorage.setItem(
        "session",
        JSON.stringify({ userId: action.payload._id })
      );
      return {
        ...state,
        userId: action.payload._id,
        userName: action.payload.name,
        score: action.payload.score,
      };
    }

    case "START_SESSION": {
      return {
        ...state,
        userId: action.payload._id,
        userName: action.payload.name,
        score: action.payload.score,
      };
    }

    case "END_SESSION": {
      localStorage.setItem("session", JSON.stringify({ userId: null }));
      return {
        ...state,
        userId: "",
        userName: "",
        score: 0,
      };
    }

    case "UPDATE_SCORE":
      return { ...state, score: action.payload };

    default:
      return state;
  }
}

export const authInitialState: AuthInitialStateType = {
  userId: "",
  userName: "",
  score: 0,
};
