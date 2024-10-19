import { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [answers, setAnswers] = useState({
    hairType: "",
    washFrequency: "",
    benefits: "",
    troubles: "",
    hairColor: "",
  });

  const updateAnswer = (question, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: answer,
    }));
  };

  return (
    <QuizContext.Provider value={{ answers, updateAnswer }}>
      {children}
    </QuizContext.Provider>
  );
};
