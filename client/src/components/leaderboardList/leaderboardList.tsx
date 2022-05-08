import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { getAllUsers } from "../../utils/networkCalls";
import "./leaderboardList.css";

type User = {
  userName: string;
  score: number;
};

function LeaderboardList() {
  const [users, setUser] = useState<User[]>([]);
  const { authState } = useAuth();
  useEffect(() => {
    (async () => {
      const data = await getAllUsers();
      if (data.success) {
        const newusers = [...data.Users];
        const rankedUsers: User[] = newusers.sort(function (a: User, b: User) {
          return b.score - a.score;
        });
        setUser(rankedUsers);
      }
    })();
  }, []);

  return (
    <div className="leaderboard-list">
      <h2>Leaderboard</h2>
      <table>
        <tbody>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
          {users.map((user, index) => {
            return (
              <tr
                key={index}
                className={`${
                  authState.userName === user.userName ? "user-tr" : ""
                } `}
              >
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardList;
