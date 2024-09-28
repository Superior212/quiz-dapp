import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { HelpCircle } from "lucide-react";

// Define the props for the Question component
interface QuestionProps {
  data: {
    question: string;
    options: string[];
  };
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string;
  onAnswerSelect: (answer: string) => void;
}

export default function Question({
  data,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
}: QuestionProps) {
  const { question, options } = data;

  // Handler for when an option is selected
  const handleOptionChange = (value: string) => {
    onAnswerSelect(value);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {/* Display current question number */}
          <span className="text-2xl font-bold">Question {questionNumber}</span>
          {/* Display progress (e.g., "3 of 10") */}
          <span className="text-sm text-muted-foreground">
            {questionNumber} of {totalQuestions}
          </span>
        </CardTitle>
        {/* Progress bar showing overall quiz progress */}
        <Progress
          value={(questionNumber / totalQuestions) * 100}
          className="w-full"
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Display the question text */}
          <div className="text-lg font-medium leading-none flex items-start">
            <HelpCircle className="mr-2 h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <span dangerouslySetInnerHTML={{ __html: question }} />
          </div>
          {/* Radio group for answer options */}
          <RadioGroup
            value={selectedAnswer}
            onValueChange={handleOptionChange}
            className="space-y-3">
            {options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-muted">
                {/* Radio button for the option */}
                <RadioGroupItem value={option} id={`option-${index}`} />
                {/* Label for the option */}
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-grow cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <span dangerouslySetInnerHTML={{ __html: option }} />
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
