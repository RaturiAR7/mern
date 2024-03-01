import { createContext, useState } from "react";

export const GoalContext = createContext(null);

export const GoalProvider = (props) => {
  const [goals, setGoals] = useState(null);
  return (
    <GoalContext.Provider value={{ goals, setGoals }}>
      {props.children}
    </GoalContext.Provider>
  );
};
