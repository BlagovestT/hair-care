import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
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
      "Curl and coil enhancing",
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
  const { updateAnswer } = useContext(QuizContext);

  const currentQuestion = questions[parseInt(id) - 1];
  const [selectedOption, setSelectedOption] = useState(null);

  const progress = (parseInt(id) / questions.length) * 100;

  // Handle navigation to the next question
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
    // Main container for the question page layout
    <div className="flex justify-center items-center min-h-screen">
      {/* Inner container to hold the question and options */}
      <div className="flex flex-col justify-center items-center gap-8 w-full pl-[260px]">
        <div className="w-[583px] h-[88px] text-center">
          <h2 className="font-poppins text-[40px] font-normal leading-tight">
            {currentQuestion.text}
          </h2>
        </div>

        {/* Options list */}
        <div className="flex flex-row flex-wrap gap-[14px] justify-center max-w-[985px]">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedOption(option)}
              className={`pl-[20px] pr-[40px] py-[14px] border font-roboto text-left leading-tight rounded-[8px] min-w-[180px] h-[44px] ${
                selectedOption === option
                  ? "bg-[#AADDF3] border-[#5BC1ED] text-[#EEF7FB]"
                  : "border-[#5BC1ED] text-gray-600"
              } whitespace-nowrap overflow-hidden text-ellipsis`}
            >
              {`${String.fromCharCode(97 + idx)}. ${option}`}{" "}
            </button>
          ))}
        </div>

        <div className="flex flex-row w-[244px] h-[48px] gap-6">
          <button
            onClick={handlePrevious}
            className="text-[#677487] text-[16px] underline text-lg cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-[#C3EDFF] text-[#1C2635] font-semibold text-lg w-[189px] h-[48px] rounded-[8px] shadow-md transition-opacity hover:opacity-80 cursor-pointer"
            disabled={!selectedOption}
          >
            Next question →
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex w-[260px]">
        <div className="w-[101px] h-[101px] mb-40">
          <CircularProgressbar
            value={progress}
            text={`${id}/${questions.length}`}
            styles={buildStyles({
              textSize: "20px",
              textColor: "#1C2635",
              trailColor: "#AADDF3",
              backgroundColor: "#EEF7FB",
            })}
            strokeWidth={5}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
