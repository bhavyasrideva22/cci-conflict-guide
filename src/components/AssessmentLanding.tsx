import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, Brain, TrendingUp, ArrowRight } from "lucide-react";

interface AssessmentLandingProps {
  onStartAssessment: () => void;
}

const AssessmentLanding = ({ onStartAssessment }: AssessmentLandingProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            CCI Assessment Suite
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
            Conflict Navigation Style
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            A Deep-Dive Module of the Collaboration & Communication Intelligence Suite
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Introduction */}
          <div className="space-y-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white shadow-assessment">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Brain className="h-8 w-8 text-accent-light" />
                  Why This Assessment Matters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-white/90 leading-relaxed">
                <p>
                  In any professional or personal group dynamic, conflict is inevitable—but how we respond to it makes all the difference. Whether you're facing a difficult teammate, navigating interpersonal tension, or disagreeing with leadership, your ability to navigate conflict productively is a core indicator of your Collaboration & Communication Intelligence.
                </p>
                <p>
                  This assessment explores your Conflict Navigation Style—how you perceive tension, manage emotional triggers, respond under pressure, and seek resolution. It goes beyond surface-level behavior to uncover the balance you strike between clarity, empathy, assertiveness, and adaptability.
                </p>
              </CardContent>
            </Card>

            {/* What You'll Discover */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white shadow-assessment">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <TrendingUp className="h-6 w-6 text-accent-light" />
                  What You'll Discover
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span>Your unique conflict navigation style and behavioral patterns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span>Strengths and potential risks in your conflict approach</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span>How others experience your conflict communication style</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span>Personalized development roadmap and growth strategies</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Assessment Details */}
          <div className="space-y-8">
            {/* Assessment Overview */}
            <Card className="bg-white shadow-card border-0">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-primary mb-2">Assessment Overview</CardTitle>
                <CardDescription className="text-lg">
                  Comprehensive evaluation across multiple contexts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-card rounded-lg">
                    <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">15-20</div>
                    <div className="text-sm text-muted-foreground">Minutes</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-card rounded-lg">
                    <Users className="h-8 w-8 text-secondary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-secondary">5</div>
                    <div className="text-sm text-muted-foreground">Sections</div>
                  </div>
                </div>

                {/* Assessment Sections */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Assessment Includes:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Communication Intelligence (Conflict Focus)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span>Collaboration Intelligence Assessment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Contextual Social Intelligence Layer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>COACH Framework Profile</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span>Personalized Growth Plan</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={onStartAssessment}
                  className="w-full h-14 text-lg font-semibold bg-gradient-primary hover:shadow-button transition-all duration-300 transform hover:scale-105"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Begin Assessment
                  <ArrowRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </Button>
              </CardContent>
            </Card>

            {/* Professional Note */}
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Professional Assessment:</strong> This assessment is designed for professionals, team leaders, and individuals seeking to enhance their conflict navigation capabilities in collaborative environments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentLanding;