"use client";

import { QuizQuestion } from "@/lib/questions";

type Props = {
  question: QuizQuestion;
  selected?: string;
  onSelect: (label: string) => void;
};

const OPTION_EMOJI: Record<string, string> = {
  A: "🧊",
  B: "😏",
  C: "😅",
  D: "😳",
  E: "💀",
  F: "🚨",
};

export default function QuestionCard({ question, selected, onSelect }: Props) {
  return (
    <div className="bg-white rounded-3xl card-shadow p-6 sm:p-8 w-full flex flex-col">
      <div className="flex items-center min-h-[72px] mb-6">
        <h2 className="font-display text-xl sm:text-2xl text-bucin-deepred font-semibold leading-snug w-full">
          {question.question}
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {question.options.map((opt) => {
          const isSelected = selected === opt.label;
          const emoji = OPTION_EMOJI[opt.label] ?? opt.label;
          return (
            <button
              key={opt.label}
              onClick={() => onSelect(opt.label)}
              className={`group flex items-center gap-3 text-left rounded-2xl px-4 py-3.5 border-2 transition-all duration-150 min-h-[56px] active:scale-[0.98] ${
                isSelected
                  ? "border-bucin-pink bg-bucin-cream animate-bounce-select"
                  : "border-gray-100 bg-white hover:border-bucin-pink/40 hover:bg-bucin-cream/50"
              }`}
              style={isSelected ? {
                boxShadow: "0 0 0 3px rgba(255,61,127,0.15), 0 4px 12px rgba(255,61,127,0.12)"
              } : {}}
            >
              <span
                className={`font-display flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-base font-bold transition-all ${
                  isSelected
                    ? "bg-bucin-pink text-white scale-110 shadow-md"
                    : "bg-gray-100 text-gray-500 group-hover:bg-bucin-pink/15 group-hover:text-bucin-deepred"
                }`}
              >
                {isSelected ? "✓" : emoji}
              </span>
              <span
                className={`text-[15px] leading-snug flex-1 ${
                  isSelected ? "text-bucin-deepred font-semibold" : "text-gray-700"
                }`}
              >
                {opt.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
