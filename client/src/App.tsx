import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "./context/authContext";
import { Loader } from "./components/loader/loader";
import Header from "./components/header/header";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import QuizQuestion from "./pages/QuizQuestion";
import QuizResult from "./pages/QuizResult";
import { PrivateRoute } from "./utils/privateRoute";
import User from "./pages/User";
import loadInitialData from "./utils/loadInitialData";
import { useQuiz } from "./context/quizContext";
import InstructionModal from "./components/instructionModal/instructionModal";
import UpdateUser from "./pages/UserUpdate";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { authDispatch, networkLoader } = useAuth();
  const { quizState, quizDispatch } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    loadInitialData({
      quizDispatch,
      authDispatch,
      navigate,
      setIsLoading,
    });
  }, []);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="loader">
          <Loader />
        </div>
      </>
    );
  }

  return (
    <>
      {networkLoader && (
        <div className="network-loader">
          <Loader />
        </div>
      )}
      <Header />
      {quizState.instructionModal && <InstructionModal />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/leaderboard" element={<Leaderboard />} />

          <Route
            path="/quiz/:quizName/:questionNumber"
            element={
              // <PrivateRoute>
              <QuizQuestion />
              // </PrivateRoute>
            }
          />
          <Route
            path="/quiz/:quizName/end"
            element={
              // <PrivateRoute>
              <QuizResult />
              // </PrivateRoute>
            }
          />

          <Route
            path="/user"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />

          <Route path="/user/:action" element={<User />} />
          <Route path="/user/update/:updateType" element={<UpdateUser />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
