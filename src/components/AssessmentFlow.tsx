import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  type: "scenario" | "likert" | "multiple-choice" | "perception-check";
  section: string;
  question: string;
  options?: {
    id: string;
    text: string;
    score: number;
  }[];
  scale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
  context?: string;
}

interface AssessmentFlowProps {
  onComplete: (responses: Record<string, any>) => void;
  onBack: () => void;
}

const sampleQuestions: Question[] = [
  {
    id: "comm-1",
    type: "scenario",
    section: "Communication Intelligence",
    question: "A teammate says in a tense tone: 'I don't think you delivered what the project needed.' What do you instinctively say?",
    options: [
      { id: "a", text: "That's your opinion, not a fact.", score: 30 },
      { id: "b", text: "Help me understand what you felt was missing.", score: 90 },
      { id: "c", text: "I disagree—I did what we discussed.", score: 50 },
      { id: "d", text: "Fine. You can do it next time.", score: 20 }
    ]
  },
  {
    id: "comm-2",
    type: "likert",
    section: "Communication Intelligence",
    question: "In tense conversations, I can stay calm and maintain clarity under pressure",
    scale: {
      min: 1,
      max: 5,
      minLabel: "Strongly Disagree",
      maxLabel: "Strongly Agree"
    }
  },
  {
    id: "comm-3",
    type: "perception-check",
    section: "Communication Intelligence",
    question: "Which tone is most likely to de-escalate a conflict?",
    options: [
      { id: "a", text: "Assertive but respectful", score: 100 },
      { id: "b", text: "Loud and fast-paced", score: 20 },
      { id: "c", text: "Monotone and cold", score: 30 },
      { id: "d", text: "Sarcastic and dismissive", score: 10 }
    ]
  },
  {
    id: "collab-1",
    type: "scenario",
    section: "Collaboration Intelligence",
    question: "You're in a team meeting. Two people are arguing. You disagree with both. What do you do?",
    options: [
      { id: "a", text: "Let them argue—it's not your issue.", score: 25 },
      { id: "b", text: "Interject to redirect the energy and clarify goals.", score: 85 },
      { id: "c", text: "Quietly take notes to speak to one person later.", score: 70 },
      { id: "d", text: "Pick a side to move the conversation along.", score: 40 }
    ]
  },
  {
    id: "collab-2",
    type: "likert",
    section: "Collaboration Intelligence",
    question: "I help teams move through disagreement without taking sides",
    scale: {
      min: 1,
      max: 5,
      minLabel: "Strongly Disagree",
      maxLabel: "Strongly Agree"
    }
  }
];

const AssessmentFlow = ({ onComplete, onBack }: AssessmentFlowProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);

  const currentQ = sampleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;
  const isLastQuestion = currentQuestion === sampleQuestions.length - 1;

  const handleResponse = (value: string | number) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newResponses = {
      ...responses,
      [currentQ.id]: {
        questionId: currentQ.id,
        section: currentQ.section,
        type: currentQ.type,
        response: selectedOption,
        score: currentQ.options?.find(opt => opt.id === selectedOption)?.score || selectedOption
      }
    };
    setResponses(newResponses);

    if (isLastQuestion) {
      onComplete(newResponses);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      const prevResponse = responses[sampleQuestions[currentQuestion - 1].id];
      setSelectedOption(prevResponse?.response || null);
    }
  };

  const renderQuestion = () => {
    switch (currentQ.type) {
      case "scenario":
      case "perception-check":
      case "multiple-choice":
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              {currentQ.options?.map((option, index) => (
                <Button
                  key={option.id}
                  variant={selectedOption === option.id ? "assessment-selected" : "assessment-option"}
                  className="w-full"
                  onClick={() => handleResponse(option.id)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1 text-left">{option.text}</span>
                    {selectedOption === option.id && (
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        );

      case "likert":
        return (
          <div className="space-y-6">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{currentQ.scale?.minLabel}</span>
              <span>{currentQ.scale?.maxLabel}</span>
            </div>
            <div className="flex justify-between gap-2">
              {Array.from({ length: 5 }, (_, i) => i + 1).map((value) => (
                <Button
                  key={value}
                  variant={selectedOption === value ? "assessment-selected" : "assessment-option"}
                  className="flex-1 aspect-square"
                  onClick={() => handleResponse(value)}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg font-bold">{value}</span>
                    {selectedOption === value && (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-assessment-bg">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Overview
            </Button>
            <Badge variant="secondary" className="px-3 py-1">
              Question {currentQuestion + 1} of {sampleQuestions.length}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground">Assessment Progress</span>
              <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-assessment assessment-slide-in">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="outline" className="px-3 py-1">
                {currentQ.section}
              </Badge>
              <Badge 
                variant="secondary" 
                className={cn(
                  "px-3 py-1",
                  currentQ.type === "scenario" && "bg-primary/10 text-primary",
                  currentQ.type === "likert" && "bg-secondary/10 text-secondary",
                  currentQ.type === "perception-check" && "bg-accent/10 text-accent"
                )}
              >
                {currentQ.type === "scenario" && "Scenario"}
                {currentQ.type === "likert" && "Scale Rating"}
                {currentQ.type === "perception-check" && "Knowledge Check"}
                {currentQ.type === "multiple-choice" && "Multiple Choice"}
              </Badge>
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {currentQ.question}
            </CardTitle>
            {currentQ.context && (
              <CardDescription className="text-base leading-relaxed">
                {currentQ.context}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {renderQuestion()}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              <Button
                variant="assessment"
                onClick={handleNext}
                disabled={selectedOption === null}
                className="flex items-center gap-2 min-w-[120px]"
              >
                {isLastQuestion ? "Complete Assessment" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentFlow;