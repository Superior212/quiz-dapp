import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, Trophy, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CoverPageProps {
  onStart: () => void;
  totalQuestions: number;
  timeLimit: number;
}

export default function CoverPage({
  totalQuestions,
  timeLimit,
}: CoverPageProps) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              QuizMaster
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-lg text-gray-600">
            Test your knowledge and challenge yourself!
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Brain className="h-8 w-8 text-purple-500 mb-2" />
              <span className="text-sm font-medium">Multiple Topics</span>
            </div>
            <div className="flex flex-col items-center">
              <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
              <span className="text-sm font-medium">
                {totalQuestions} Questions
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 text-blue-500 mb-2" />
              <span className="text-sm font-medium">{timeLimit} Minutes</span>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-semibold mb-2">How to Play:</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
              <li>Read each question carefully</li>
              <li>Select the best answer from the options provided</li>
              <li>Click 'Next' to move to the next question</li>
              <li>Complete all questions before the time runs out</li>
              <li>View your results at the end of the quiz</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate("/quiz")} className="w-full">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
