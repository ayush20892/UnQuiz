import React from "react";
import "./header.css";
import { useLocation, useNavigate } from "react-router-dom";
import icon64 from "../../icon/Utility-UI-64.png";
import { HiUserCircle } from "react-icons/hi";
import { MdLeaderboard } from "react-icons/md";
import { useAuth } from "../../context/authContext";

function Header() {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header>
      <div className="navbar">
        <div className="brand">
          <img src={icon64} alt="brand-logo" onClick={() => navigate("/")} />
          <div className="brand-name" onClick={() => navigate("/")}>
            UNQUIZ
          </div>
        </div>

        <div className="nav-icon">
          <span onClick={() => navigate("/leaderboard")}>
            <MdLeaderboard className="icon" /> <label>Leaderboard</label>
          </span>
          <span onClick={() => navigate("/user")}>
            <HiUserCircle className="icon" />
            {authState.userId !== "" ? (
              <label>{authState.userName}</label>
            ) : (
              <label>Login</label>
            )}
          </span>
        </div>
      </div>
      <hr />
      {authState.userId !== "" ? (
        <div className="user-details">
          <h3>Welcome, {authState.userName}</h3>
          <h3>Score: {authState.score}</h3>
        </div>
      ) : (
        <></>
      )}
      {authState.userId === "" && pathname === "/" && (
        <h3 className="quiz-heading">Quizzes</h3>
      )}
    </header>
  );
}

export default Header;
