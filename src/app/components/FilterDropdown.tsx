"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function FilterDropdown({ label, options, value, onChange }: FilterDropdownProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <Filter className="w-4 h-4 text-blue-500" />
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[200px] h-11 bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md rounded-lg">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent className="bg-white/95 backdrop-blur-sm border-2 border-gray-200 rounded-lg shadow-xl">
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer transition-colors duration-150"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
