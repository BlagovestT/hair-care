import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/startBg.png";

const StartPage = () => {
  return (
    <div className="w-full h-screen">
      <div
        className="w-full h-[526px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative h-full flex flex-col items-center justify-center text-center">
          <h1 className="font-poppins text-[48px] font-normal text-white leading-tight">
            Build a self care routine <br /> suitable for you
          </h1>

          <p className="font-roboto text-[16px] text-gray-200 mb-5 mt-4 leading-tight">
            Take our test to get a personalised self care <br /> routine based
            on your needs.
          </p>

          <Link to="/question/1">
            <button className="bg-[#C3EDFF] text-black py-[10px] px-[40px] rounded-lg shadow-lg w-[174px] h-[47px] hover:bg-opacity-80 transition hover:ease-in-out duration-300">
              Start the quiz
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
