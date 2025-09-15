import { useState } from "react";
import AssessmentLanding from "@/components/AssessmentLanding";
import AssessmentFlow from "@/components/AssessmentFlow";
import AssessmentResults from "@/components/AssessmentResults";

type AppState = "landing" | "assessment" | "results";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("landing");
  const [assessmentData, setAssessmentData] = useState<Record<string, any>>({});

  const handleStartAssessment = () => {
    setCurrentState("assessment");
  };

  const handleAssessmentComplete = (responses: Record<string, any>) => {
    setAssessmentData(responses);
    setCurrentState("results");
  };

  const handleBackToLanding = () => {
    setCurrentState("landing");
  };

  const handleRestart = () => {
    setAssessmentData({});
    setCurrentState("landing");
  };

  if (currentState === "landing") {
    return <AssessmentLanding onStartAssessment={handleStartAssessment} />;
  }

  if (currentState === "assessment") {
    return (
      <AssessmentFlow 
        onComplete={handleAssessmentComplete}
        onBack={handleBackToLanding}
      />
    );
  }

  if (currentState === "results") {
    return (
      <AssessmentResults 
        responses={assessmentData}
        onRestart={handleRestart}
      />
    );
  }

  return null;
};

export default Index;
