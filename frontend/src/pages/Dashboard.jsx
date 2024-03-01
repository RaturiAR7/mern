import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import { GoalContext } from "../Context/Goals";
import { getGoals } from "../Utils";

function Dashboard({ user }) {
  const navigate = useNavigate();
  const goalState = useContext(GoalContext);
  const { goals, setGoals } = goalState;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      // Fetch goals when the user is available
      const token = localStorage.getItem("token");
      getGoals(token, setGoals);
    }
  }, [user]); // Include user as a dependency to re-run effect when user changes

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm setGoals={setGoals} goals={goals} />
      <section className='content'>
        {goals && goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h1>You have no Goals</h1>
        )}
      </section>
    </>
  );
}
export default Dashboard;
