import { Student } from "../type";
import { Badge } from "@/components/ui/badge";

interface StudentTableProps {
  students: Student[];
}

const getSkillColor = (skill: string) => {
  switch (skill) {
    case "comprehension":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "focus":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "retention":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    case "attention":
      return "bg-orange-100 text-orange-800 hover:bg-orange-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const getClassColor = (className: string) => {
  switch (className) {
    case "A":
      return "bg-emerald-100 text-emerald-800";
    case "B":
      return "bg-blue-100 text-blue-800";
    case "C":
      return "bg-yellow-100 text-yellow-800";
    case "D":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getScoreColor = (score: string) => {
  const numScore = Number(score);
  if (numScore >= 90) return "text-green-600 font-semibold";
  if (numScore >= 80) return "text-blue-600 font-semibold";
  if (numScore >= 70) return "text-yellow-600 font-semibold";
  return "text-red-600 font-semibold";
};

export default function StudentTable({ students }: StudentTableProps) {
  if (students.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">No students found</div>
        <div className="text-gray-500 text-sm mt-2">Try adjusting your filters</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Class
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Top Skill
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Score
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Comprehension
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Focus
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Retention
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Attention
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Month
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge className={getClassColor(student.class)}>
                  Class {student.class}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge className={getSkillColor(student.top_skill)}>
                  {student.top_skill}
                </Badge>
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-lg ${getScoreColor(student.score)}`}>
                {student.score}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="flex items-center">
                  <div className="w-12 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${student.comprehension}%` }}
                    ></div>
                  </div>
                  {student.comprehension}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="flex items-center">
                  <div className="w-12 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${student.focus}%` }}
                    ></div>
                  </div>
                  {student.focus}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="flex items-center">
                  <div className="w-12 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${student.retention}%` }}
                    ></div>
                  </div>
                  {student.retention}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="flex items-center">
                  <div className="w-12 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${student.attention}%` }}
                    ></div>
                  </div>
                  {student.attention}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {student.month}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
