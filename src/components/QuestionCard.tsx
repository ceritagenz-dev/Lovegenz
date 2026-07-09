"use client";

import { QuizQuestion } from "@/lib/questions";

type Props = {
  question: QuizQuestion;
  selected?: string;
  onSelect: (label: string) => void;
};

const OPTION_EMOJI: Record<string, string> = {
  A: "🧊", B: "😏", C: "😅", D: "😳", E: "💀",
};

export default function QuestionCard({ question, selected, onSelect }: Props) {
  return (
    <div className="love-card p-6 sm:p-8 w-full">
      <div className="flex items-start min-h-[80px] mb-6">
        <h2 className="font-display text-xl sm:text-2xl font-bold leading-snug w-full"
          style={{ color: "#8B0045" }}>
          {question.question}
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {question.options.map((opt) => {
          const isSel = selected === opt.label;
          const emoji = OPTION_EMOJI[opt.label] ?? opt.label;
          return (
            <button
              key={opt.label}
              onClick={() => onSelect(opt.label)}
              className={`flex items-center gap-3.5 text-left rounded-2xl px-4 py-4 border-2 transition-all duration-150 min-h-[62px] ${
                isSel
                  ? "option-selected animate-bounce-select"
                  : "border-gray-100 bg-white hover:border-pink-200 hover:bg-pink-50/60 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97]"
              }`}
            >
              <span
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-150 ${
                  isSel
                    ? "bg-bucin-pink text-white scale-110"
                    : "bg-pink-50 text-pink-400 group-hover:bg-pink-100"
                }`}
                style={isSel ? { boxShadow: "0 2px 14px rgba(255,61,127,0.45)" } : {}}
              >
                {isSel ? "✓" : emoji}
              </span>
              <span className={`text-[15px] leading-snug flex-1 transition-colors ${
                isSel ? "font-semibold" : "text-gray-700"
              }`} style={isSel ? { color: "#8B0045" } : {}}>
                {opt.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
