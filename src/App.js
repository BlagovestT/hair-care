import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import QuestionPage from "./pages/QuestionPage";
import ResultsPage from "./pages/ResultsPage";
import { QuizProvider } from "./context/QuizContext";

const App = () => {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/question/:id" element={<QuestionPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
};

export default App;
