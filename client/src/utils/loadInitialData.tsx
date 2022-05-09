import { NavigateFunction } from "react-router-dom";
// import { toast } from "react-toastify";
import { userDashboard } from "./networkCalls";
import { getAllQuizzes } from "./networkCalls";
import { AuthActionType } from "./types";

type loadInitialDataProp = {
  quizDispatch: Function;
  authDispatch: (action: AuthActionType) => void;
  navigate: NavigateFunction;
  setIsLoading: Function;
};

export default async function loadInitialData({
  quizDispatch,
  authDispatch,
  navigate,
  setIsLoading,
}: loadInitialDataProp) {
  const session: { userId: string } = JSON.parse(
    localStorage.getItem("session")!
  );
  const data = await getAllQuizzes();
  if (data.success) quizDispatch({ type: "LOAD_QUIZ", payload: data.quiz });

  if (session?.userId) {
    const userData = await userDashboard();

    if (userData!.success === false) {
      authDispatch({ type: "END_SESSION" });
      navigate("/user/login", { replace: true });
    } else authDispatch({ type: "START_SESSION", payload: userData!.user });
  }
  setIsLoading(false);
}
