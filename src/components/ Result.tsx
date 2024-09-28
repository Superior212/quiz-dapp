import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";

// Define the structure of a question
interface Question {
  question: string;
  correctAnswer: string;
}

// Define the props for the Result component
interface ResultProps {
  questions: Question[];
  userAnswers: string[];
  onRestart: () => void;
}

export default function Result({
  questions,
  userAnswers,
  onRestart,
}: ResultProps) {
  // Calculate the score by comparing user answers with correct answers
  const score = questions.reduce((acc, question, index) => {
    return userAnswers[index] === question.correctAnswer ? acc + 1 : acc;
  }, 0);

  // Calculate the percentage score
  const percentage = (score / questions.length) * 100;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Quiz Completed!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Display the overall score and percentage */}
        <div className="text-center">
          <p className="text-4xl font-bold mb-2">
            {score} / {questions.length}
          </p>
          <Progress value={percentage} className="w-full h-4" />
          <p className="mt-2 text-muted-foreground">
            You scored {percentage.toFixed(1)}%
          </p>
        </div>

        {/* Accordion to display each question and answer */}
        <Accordion type="single" collapsible className="w-full">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <AccordionItem value={`question-${index}`} key={index}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center space-x-2">
                    {/* Display check or cross icon based on correctness */}
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span>Question {index + 1}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  {/* Display the question */}
                  <div className="flex items-start space-x-2">
                    <HelpCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p
                      dangerouslySetInnerHTML={{ __html: question.question }}
                    />
                  </div>
                  {/* Display user's answer and correct answer */}
                  <div className="pl-7 space-y-1">
                    <p className="text-sm">
                      Your answer:
                      <span
                        className={
                          isCorrect
                            ? "text-green-500 font-medium"
                            : "text-red-500 font-medium"
                        }>
                        {" "}
                        {userAnswer || "No answer"}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p className="text-sm">
                        Correct answer:
                        <span className="text-green-500 font-medium">
                          {" "}
                          {question.correctAnswer}
                        </span>
                      </p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        <div className="text-center">
          <Button onClick={onRestart} className="mt-4">
            Restart Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
