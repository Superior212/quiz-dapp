import { Route, Routes } from "react-router-dom";
import CoverPage from "./pages/CoverPage";
import QuizPage from "./pages/Quiz";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <CoverPage onStart={() => {}} totalQuestions={10} timeLimit={60} />
          }
        />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </div>
  );
};

export default App;
