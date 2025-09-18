import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Target, Eye } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
}

const getIcon = (title: string) => {
  switch (title) {
    case "Average Score":
      return <TrendingUp className="w-6 h-6 text-blue-500" />;
    case "Total Students":
      return <Users className="w-6 h-6 text-green-500" />;
    case "Top Skill":
      return <Target className="w-6 h-6 text-purple-500" />;
    case "Attention Level":
      return <Eye className="w-6 h-6 text-orange-500" />;
    default:
      return <TrendingUp className="w-6 h-6 text-gray-500" />;
  }
};

const getGradient = (title: string) => {
  switch (title) {
    case "Average Score":
      return "from-blue-500 to-blue-600";
    case "Total Students":
      return "from-green-500 to-green-600";
    case "Top Skill":
      return "from-purple-500 to-purple-600";
    case "Attention Level":
      return "from-orange-500 to-orange-600";
    default:
      return "from-gray-500 to-gray-600";
  }
};

export default function StatsCard({ title, value }: StatsCardProps) {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        {getIcon(title)}
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold bg-gradient-to-r ${getGradient(title)} bg-clip-text text-transparent`}>
          {value}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {title === "Average Score" && "out of 100"}
          {title === "Total Students" && "enrolled"}
          {title === "Top Skill" && "most common"}
          {title === "Attention Level" && "average score"}
        </p>
      </CardContent>
    </Card>
  );
}
