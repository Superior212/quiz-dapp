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
  const { questions, loading, error } = useQuiz(10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: string | undefined;
  }>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: string) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: answer,
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1)
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    else setShowResult(true);
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0)
      setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2 text-lg">Loading questions...</span>
      </div>
    );
  }

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

  if (showResult) {
    return (
      <Result
        questions={questions}
        userAnswers={Object.values(userAnswers).filter(
          (answer): answer is string => answer !== undefined
        )}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <Question
            data={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={userAnswers[currentQuestionIndex] || ""}
            onAnswerSelect={handleAnswer}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={nextQuestion}>
            {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
