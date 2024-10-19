import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { QuizContext } from "../context/QuizContext";

const questions = [
  {
    id: 1,
    questionKey: "hairType",
    text: "What's your hair type or texture?",
    options: ["Straight", "Curly", "Wavy", "Fine"],
  },
  {
    id: 2,
    questionKey: "washFrequency",
    text: "How often do you wash your hair?",
    options: [
      "Daily",
      "Every other day",
      "Twice a week",
      "Once a week",
      "Once every two weeks",
    ],
  },
  {
    id: 3,
    questionKey: "benefits",
    text: "What benefit do you look for in your hair products?",
    options: [
      "Anti-breakage",
      "Hydration",
      "Soothing dry scalp",
      "Repairs the appearance of damaged hair",
      "Volume",
      "Curl and coil enhancing.",
    ],
  },
  {
    id: 4,
    questionKey: "troubles",
    text: "Is there anything troubling you about your hair?",
    options: ["Breakage", "Frizz", "Scalp dryness", "Damage", "Tangling"],
  },
  {
    id: 5,
    questionKey: "hairColor",
    text: "What is your natural hair color(s) today?",
    options: ["Black", "Brown", "Blonde", "Red/Orange", "Silver/Grey"],
  },
];

const QuestionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentQuestion = questions[parseInt(id) - 1];
  const { updateAnswer } = useContext(QuizContext);
  const [selectedOption, setSelectedOption] = useState(null);

  const progress = (parseInt(id) / questions.length) * 100;

  const handleNext = () => {
    if (selectedOption) {
      updateAnswer(currentQuestion.questionKey, selectedOption);
    }
    if (parseInt(id) < questions.length) {
      navigate(`/question/${parseInt(id) + 1}`);
    } else {
      navigate("/results");
    }
  };

  const handlePrevious = () => {
    if (parseInt(id) > 1) {
      navigate(`/question/${parseInt(id) - 1}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div style={{ width: 100, marginBottom: "20px" }}>
        <CircularProgressbar
          value={progress}
          text={`${id}/${questions.length}`}
        />
      </div>

      <h2>{currentQuestion.text}</h2>

      <div className="options">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedOption(option)}
            className="btn-option"
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex justify-between w-full mt-4">
        <button
          onClick={handlePrevious}
          disabled={parseInt(id) === 1}
          className="bg-gray-500 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;
