"use client";

import { QuizQuestion } from "@/lib/questions";

type Props = {
  question: QuizQuestion;
  selected?: string;
  onSelect: (label: string) => void;
};

export default function QuestionCard({ question, selected, onSelect }: Props) {
  return (
    <div className="bg-white rounded-3xl card-shadow p-5 sm:p-7 w-full">
      <h2 className="font-display text-xl sm:text-2xl text-bucin-deepred font-semibold leading-snug mb-5">
        {question.question}
      </h2>
      <div className="flex flex-col gap-2.5">
        {question.options.map((opt) => {
          const isSelected = selected === opt.label;
          return (
            <button
              key={opt.label}
              onClick={() => onSelect(opt.label)}
              className={`group flex items-start gap-3 text-left rounded-2xl px-4 py-3.5 border-2 transition-all duration-150 active:scale-[0.98] ${
                isSelected
                  ? "border-bucin-pink bg-bucin-cream"
                  : "border-gray-100 bg-white hover:border-bucin-pink/40 hover:bg-bucin-cream/50"
              }`}
            >
              <span
                className={`font-display flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  isSelected
                    ? "bg-bucin-pink text-white"
                    : "bg-gray-100 text-gray-500 group-hover:bg-bucin-pink/15 group-hover:text-bucin-deepred"
                }`}
              >
                {opt.label}
              </span>
              <span
                className={`text-[15px] leading-snug pt-0.5 ${
                  isSelected
                    ? "text-bucin-deepred font-medium"
                    : "text-gray-700"
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
