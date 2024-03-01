import { useState, useContext } from "react";
import axios from "axios";
import { GoalContext } from "../Context/Goals";
import { createGoal } from "../Utils";

function GoalForm() {
  const [text, setText] = useState("");
  const goalState = useContext(GoalContext);
  const { goals, setGoals } = goalState;

  ///// Get User's Goals
  const onSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      createGoal({ text: text }, token, setGoals);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Goal</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
