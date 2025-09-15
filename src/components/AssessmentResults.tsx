import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  Users, 
  TrendingUp, 
  Target, 
  Award, 
  Download,
  RefreshCw,
  Share2
} from "lucide-react";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

interface AssessmentResultsProps {
  responses: Record<string, any>;
  onRestart: () => void;
}

const AssessmentResults = ({ responses, onRestart }: AssessmentResultsProps) => {
  // Calculate scores based on responses
  const calculateScores = () => {
    const sections = {
      communication: 0,
      collaboration: 0,
      contextual: 0,
      coach: 0
    };

    const counts = {
      communication: 0,
      collaboration: 0,
      contextual: 0,
      coach: 0
    };

    Object.values(responses).forEach((response: any) => {
      let score = 0;
      if (response.type === "likert") {
        score = (response.response / 5) * 100;
      } else {
        score = response.score || 50;
      }

      if (response.section.includes("Communication")) {
        sections.communication += score;
        counts.communication++;
      } else if (response.section.includes("Collaboration")) {
        sections.collaboration += score;
        counts.collaboration++;
      }
    });

    // Calculate averages
    const finalScores = {
      communication: counts.communication > 0 ? Math.round(sections.communication / counts.communication) : 75,
      collaboration: counts.collaboration > 0 ? Math.round(sections.collaboration / counts.collaboration) : 72,
      contextual: 78, // Simulated
      coach: 76, // Simulated
      overall: 0
    };

    finalScores.overall = Math.round((finalScores.communication + finalScores.collaboration + finalScores.contextual + finalScores.coach) / 4);

    return finalScores;
  };

  const scores = calculateScores();

  // COACH Framework radar data
  const radarData = [
    { subject: 'Clarity', score: scores.communication, fullMark: 100 },
    { subject: 'Openness', score: 82, fullMark: 100 },
    { subject: 'Alignment', score: scores.collaboration, fullMark: 100 },
    { subject: 'Conflict Nav', score: scores.overall, fullMark: 100 },
    { subject: 'Harmony', score: 79, fullMark: 100 }
  ];

  // Context scores bar data
  const contextData = [
    { context: '1-on-1', score: 85 },
    { context: 'Group', score: scores.collaboration },
    { context: 'Conflict', score: scores.overall },
    { context: 'Digital', score: 68 }
  ];

  const getStyleLabel = () => {
    if (scores.overall >= 80) return "Diplomatic Challenger";
    if (scores.overall >= 70) return "Empathic Moderator";
    if (scores.overall >= 60) return "Assertive Analyst";
    return "Developing Navigator";
  };

  const getRecommendationType = () => {
    if (scores.overall >= 80) return "Lead Confidently";
    if (scores.overall >= 70) return "Grow Confidently";
    return "Develop Systematically";
  };

  return (
    <div className="min-h-screen bg-assessment-bg">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Award className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Assessment Complete</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Your Conflict Navigation Style Profile
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg">Your Style</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{getStyleLabel()}</div>
              <Badge variant="secondary" className="px-3 py-1">
                Conflict Navigation Style
              </Badge>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg">Overall CQ Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{scores.overall}</div>
              <div className="text-sm text-muted-foreground">Collaboration Quotient</div>
              <Progress value={scores.overall} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg">Development Focus</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold text-secondary mb-2">{getRecommendationType()}</div>
              <Badge variant="outline" className="px-3 py-1">
                Recommended Path
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* COACH Framework Radar */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                COACH Framework Profile
              </CardTitle>
              <CardDescription>
                Your scores across the five core dimensions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" className="text-sm" />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]} 
                      tick={false}
                    />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Contextual Intelligence */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                Contextual Agility
              </CardTitle>
              <CardDescription>
                Your effectiveness across different settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={contextData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="context" />
                    <YAxis domain={[0, 100]} />
                    <Bar 
                      dataKey="score" 
                      fill="hsl(var(--secondary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Scores */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-accent" />
              Intelligence Breakdown
            </CardTitle>
            <CardDescription>
              Your scores across all assessment dimensions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Communication Intelligence</div>
                    <div className="text-sm text-muted-foreground">Clarity and tone management under stress</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{scores.communication}</div>
                    <Progress value={scores.communication} className="w-32" />
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Collaboration Intelligence</div>
                    <div className="text-sm text-muted-foreground">Team dynamics and conflict mediation</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-secondary">{scores.collaboration}</div>
                    <Progress value={scores.collaboration} className="w-32" />
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Contextual Social Intelligence</div>
                    <div className="text-sm text-muted-foreground">Adaptability across different environments</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">{scores.contextual}</div>
                    <Progress value={scores.contextual} className="w-32" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Growth Recommendations */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Personalized Growth Plan
            </CardTitle>
            <CardDescription>
              Recommended development areas and next steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-success-light rounded-lg p-4">
                <h4 className="font-semibold text-success mb-2">Top Strength</h4>
                <p className="text-success/80">
                  You maintain tone and calm well during conflict, creating psychological safety for others to express their views.
                </p>
              </div>

              <div className="bg-warning-light rounded-lg p-4">
                <h4 className="font-semibold text-warning mb-2">Growth Opportunity</h4>
                <p className="text-warning/80">
                  Practice initiating resolution earlier and phrasing tension as shared goals: "We both want X—how do we get there?"
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Best-fit Team Roles</h4>
                  <div className="space-y-2">
                    <Badge variant="outline">Cross-functional Lead</Badge>
                    <Badge variant="outline">Project Mediator</Badge>
                    <Badge variant="outline">Client-facing Role</Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Development Activities</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Practice tension de-escalation scripts</li>
                    <li>• Role-play heated team meetings</li>
                    <li>• Maintain conflict resolution journal</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="assessment" size="lg" className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Download Report
          </Button>
          <Button variant="outline" size="lg" className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Results
          </Button>
          <Button variant="ghost" size="lg" onClick={onRestart} className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Retake Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;