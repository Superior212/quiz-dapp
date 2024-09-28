import { useState } from "react";
import useQuiz from "@/hooks/useQuiz";
import Question from "./Question";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Result from "./ Result";

export default function Quiz() {
  // Custom hook to fetch quiz questions
  const { questions, loading, error, fetchQuizQuestions } = useQuiz(10);

  // State to keep track of the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // State to store user's answers
  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: string | undefined;
  }>({});

  // State to determine if results should be shown
  const [showResult, setShowResult] = useState(false);

  // Handler for when a user selects an answer
  const handleAnswer = (answer: string) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: answer,
    });
  };

  // Handler to move to the next question or show results if it's the last question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  // Handler to move to the previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Handler to restart the quiz
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResult(false);
    fetchQuizQuestions();
  };

  // Check if the current question has been answered
  const isCurrentQuestionAnswered =
    userAnswers[currentQuestionIndex] !== undefined;

  // Display loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2 text-lg">Loading questions...</span>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-red-500">
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">
              There was an error loading the quiz. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Display results when quiz is finished
  if (showResult) {
    return (
      <Result
        questions={questions}
        userAnswers={Object.values(userAnswers).filter(
          (answer): answer is string => answer !== undefined
        )}
        onRestart={handleRestart}
      />
    );
  }

  // Main quiz interface
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Question component */}
          <Question
            data={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={userAnswers[currentQuestionIndex] || ""}
            onAnswerSelect={handleAnswer}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* Previous button */}
          <Button
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          {/* Next/Finish button */}
          <Button onClick={nextQuestion} disabled={!isCurrentQuestionAnswered}>
            {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
