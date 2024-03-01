import axios from "axios";
// import { useContext } from "react";
// import { GoalContext } from "./Context/Goals";

// const goalState = useContext(GoalContext);
// const { goals, setGoals } = goalState;

const deleteGoal = async (goalId, setGoals) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const API_URL = "/api/goals/";
  const response = await axios.delete(API_URL + goalId, config);
  getGoals(token, setGoals);
  return response.data;
};
const getGoals = async (token, setGoals) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get("/api/goals/", config);
    setGoals(response.data);
  } catch (error) {
    console.error("Error fetching goals:", error);
  }
};

const createGoal = async (goalData, token, setGoals) => {
  const API_URL = "/api/goals/";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, goalData, config);
  getGoals(token, setGoals);
  return response.data;
};

const updateGoal = async (data, goalId, setGoals) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const API_URL = `/api/goals/`;
  const response = await axios.put(API_URL + goalId, { text: data }, config);
  getGoals(token, setGoals);
};

export { getGoals, createGoal, updateGoal, deleteGoal };
