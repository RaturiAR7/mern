import axios from "axios";
import { useState, useContext } from "react";
import { GoalContext } from "../Context/Goals";
import { deleteGoal, updateGoal } from "../Utils";

function GoalItem({ goal }) {
  const [updateData, setUpdateData] = useState("");
  const goalState = useContext(GoalContext);
  const { goals, setGoals } = goalState;

  const submitHandler = (e) => {
    e.preventDefault();
    updateGoal(updateData, e.target.id, setGoals);
    setUpdateData("");
  };
  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
      <button onClick={() => deleteGoal(goal._id, setGoals)} className='close'>
        X
      </button>
      <form>
        <input
          type='text'
          value={updateData}
          onChange={(e) => setUpdateData(e.target.value)}
        />
        <button id={goal._id} onClick={submitHandler}>
          Update
        </button>
      </form>
    </div>
  );
}

export default GoalItem;
