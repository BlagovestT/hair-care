import React, { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [answers, setAnswers] = useState({});

  const updateAnswer = (questionKey, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionKey]: answer,
    }));
  };

  return (
    <QuizContext.Provider value={{ answers, updateAnswer }}>
      {children}
    </QuizContext.Provider>
  );
};
