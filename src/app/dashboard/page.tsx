"use client";

import { useEffect, useState } from "react";
import StatsCard from "@/app/components/StatsCard";
import FilterDropdown from "../components/FilterDropdown";
import StudentTable from "../components/StudentTable";
import { Student } from "../type";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [classFilter, setClassFilter] = useState("All");
  const [skillFilter, setSkillFilter] = useState("All");

  useEffect(() => {
    // Dummy data for demonstration
    const dummyStudents: Student[] = [
      {
        class: "A",
        top_skill: "comprehension",
        score: "85",
        comprehension: "90",
        focus: "75",
        retention: "80",
        attention: "85",
        month: "January"
      },
      {
        class: "A",
        top_skill: "focus",
        score: "78",
        comprehension: "70",
        focus: "95",
        retention: "75",
        attention: "80",
        month: "January"
      },
      {
        class: "B",
        top_skill: "retention",
        score: "92",
        comprehension: "85",
        focus: "80",
        retention: "95",
        attention: "90",
        month: "February"
      },
      {
        class: "B",
        top_skill: "comprehension",
        score: "88",
        comprehension: "92",
        focus: "85",
        retention: "82",
        attention: "88",
        month: "February"
      },
      {
        class: "C",
        top_skill: "attention",
        score: "76",
        comprehension: "75",
        focus: "70",
        retention: "78",
        attention: "95",
        month: "March"
      },
      {
        class: "C",
        top_skill: "focus",
        score: "81",
        comprehension: "80",
        focus: "88",
        retention: "75",
        attention: "82",
        month: "March"
      },
      {
        class: "D",
        top_skill: "retention",
        score: "89",
        comprehension: "87",
        focus: "82",
        retention: "92",
        attention: "85",
        month: "April"
      },
      {
        class: "D",
        top_skill: "comprehension",
        score: "84",
        comprehension: "89",
        focus: "78",
        retention: "85",
        attention: "83",
        month: "April"
      },
      {
        class: "A",
        top_skill: "attention",
        score: "79",
        comprehension: "76",
        focus: "82",
        retention: "77",
        attention: "88",
        month: "May"
      },
      {
        class: "B",
        top_skill: "focus",
        score: "86",
        comprehension: "84",
        focus: "90",
        retention: "83",
        attention: "87",
        month: "May"
      },
      {
        class: "C",
        top_skill: "comprehension",
        score: "91",
        comprehension: "94",
        focus: "87",
        retention: "89",
        attention: "91",
        month: "June"
      },
      {
        class: "D",
        top_skill: "attention",
        score: "77",
        comprehension: "74",
        focus: "79",
        retention: "76",
        attention: "90",
        month: "June"
      }
    ];
    setStudents(dummyStudents);
  }, []);

  const filteredStudents = students.filter(
    (s) =>
      (classFilter === "All" || s.class === classFilter) &&
      (skillFilter === "All" || s.top_skill === skillFilter)
  );

  const avgScore =
    filteredStudents.reduce((sum, s) => sum + Number(s.score), 0) /
    (filteredStudents.length || 1);

  const topSkill =
    filteredStudents
      .map((s) => s.top_skill)
      .sort(
        (a, b) =>
          filteredStudents.filter((x) => x.top_skill === b).length -
          filteredStudents.filter((x) => x.top_skill === a).length
      )[0] || "";

  const skillsBarData = ["comprehension", "focus", "retention"].map((skill) => ({
    skill,
    avg:
      filteredStudents.reduce((sum, s) => sum + Number(s[skill as keyof Student]), 0) /
      (filteredStudents.length || 1),
  }));

  const attentionScatterData = filteredStudents.map((s) => ({
    x: Number(s.attention),
    y: Number(s.score),
  }));

  const radarData =
    filteredStudents.length > 0
      ? [
          { skill: "Comprehension", value: Number(filteredStudents[0].comprehension) },
          { skill: "Focus", value: Number(filteredStudents[0].focus) },
          { skill: "Retention", value: Number(filteredStudents[0].retention) },
        ]
      : [];

  const lineData = filteredStudents.map((s) => ({
    month: s.month,
    score: Number(s.score),
  }));

  const classes = Array.from(new Set(students.map((s) => s.class)));
  const skills = Array.from(new Set(students.map((s) => s.top_skill)));

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Student Performance Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Monitor and analyze student learning metrics</p>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-end">
            <FilterDropdown
              label="Class"
              options={["All", ...classes]}
              value={classFilter}
              onChange={setClassFilter}
            />
            <FilterDropdown
              label="Skill"
              options={["All", ...skills]}
              value={skillFilter}
              onChange={setSkillFilter}
            />
            <div className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-700">{filteredStudents.length}</span> of <span className="font-semibold text-gray-700">{students.length}</span> students
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Average Score" value={avgScore.toFixed(2)} />
          <StatsCard title="Total Students" value={filteredStudents.length.toString()} />
          <StatsCard title="Top Skill" value={topSkill} />
          <StatsCard
            title="Attention Level"
            value={(
              filteredStudents.reduce((sum, s) => sum + Number(s.attention), 0) /
              (filteredStudents.length || 1)
            ).toFixed(2)}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-cyan-100/30 rounded-full -translate-y-16 translate-x-16"></div>
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2 relative z-10">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              Skills vs Avg Score
            </h2>
            <div className="w-full h-[280px] sm:h-[320px] lg:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillsBarData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis
                    dataKey="skill"
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                    label={{ value: 'Average Score', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280' } }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                    labelStyle={{ color: '#374151', fontWeight: '600' }}
                    formatter={(value) => [`${Number(value).toFixed(1)}`, 'Average Score']}
                  />
                  <Bar
                    dataKey="avg"
                    fill="url(#barGradient)"
                    radius={[6, 6, 0, 0]}
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="rect"
                    formatter={(value: string) => <span style={{ color: '#6b7280', fontSize: '14px' }}>{value}</span>}
                  />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9}/>
                      <stop offset="50%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.9}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-100/30 to-pink-100/30 rounded-full -translate-y-16 translate-x-16"></div>
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2 relative z-10">
              <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"></div>
              Attention vs Performance
            </h2>
            <div className="w-full h-[280px] sm:h-[320px] lg:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={attentionScatterData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Attention"
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                    label={{ value: 'Attention Level', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#6b7280' } }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Score"
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                    label={{ value: 'Performance Score', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280' } }}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3", stroke: '#f43f5e', strokeWidth: 1 }}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                    formatter={(value, name) => [value, name === 'x' ? 'Attention' : 'Score']}
                  />
                  <Scatter
                    dataKey="y"
                    fill="url(#scatterGradient)"
                    shape="circle"
                    animationBegin={300}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="circle"
                    formatter={(value: string) => <span style={{ color: '#6b7280', fontSize: '14px' }}>{value}</span>}
                  />
                  <defs>
                    <radialGradient id="scatterGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.8}/>
                      <stop offset="70%" stopColor="#ec4899" stopOpacity={0.6}/>
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.4}/>
                    </radialGradient>
                  </defs>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full -translate-y-16 translate-x-16"></div>
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2 relative z-10">
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
              Student Profile
            </h2>
            <div className="w-full h-[280px] sm:h-[320px] lg:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <PolarGrid gridType="polygon" stroke="#e5e7eb" strokeWidth={1} />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 500 }}
                  />
                  <PolarRadiusAxis
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    tickCount={5}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  />
                  <Radar
                    name="Profile"
                    dataKey="value"
                    stroke="#6366f1"
                    fill="url(#radarGradient)"
                    fillOpacity={0.4}
                    strokeWidth={3}
                    dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                    animationBegin={600}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="rect"
                    formatter={(value: string) => <span style={{ color: '#6b7280', fontSize: '14px' }}>{value}</span>}
                  />
                  <defs>
                    <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.5}/>
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0.1}/>
                    </radialGradient>
                  </defs>
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100/30 to-teal-100/30 rounded-full -translate-y-16 translate-x-16"></div>
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2 relative z-10">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
              Performance Over Time
            </h2>
            <div className="w-full h-[280px] sm:h-[320px] lg:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                    label={{ value: 'Score', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280' } }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                    labelStyle={{ color: '#374151', fontWeight: '600' }}
                    formatter={(value) => [`${value}`, 'Score']}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="url(#lineGradient)"
                    strokeWidth={4}
                    dot={{ fill: '#10b981', strokeWidth: 3, r: 6, stroke: '#fff' }}
                    activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 3, fill: '#fff' }}
                    animationBegin={900}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="line"
                    formatter={(value: string) => <span style={{ color: '#6b7280', fontSize: '14px' }}>{value}</span>}
                  />
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="50%" stopColor="#14b8a6" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Student Details
          </h2>
          <StudentTable students={filteredStudents} />
        </div>
      </div>
    </main>
  );
}
