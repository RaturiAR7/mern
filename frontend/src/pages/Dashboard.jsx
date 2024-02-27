import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import axios from "axios";

function Dashboard({ user }) {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      // Fetch goals when the user is available
      const token = localStorage.getItem("token");
      getGoals(token);
    }
  }, [user]); // Include user as a dependency to re-run effect when user changes

  const getGoals = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get("/api/goals/", config);
      setGoals(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };
  console.log(goals);

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className='content'>
        {loading ? (
          <h1>Loading...</h1>
        ) : goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h1>You haveGoals</h1>
        )}
      </section>
    </>
  );
}

export default Dashboard;
