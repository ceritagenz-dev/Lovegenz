"use client";

type Props = {
  current: number;
  total: number;
};

export default function HeartbeatProgress({ current, total }: Props) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="font-display text-white/90 text-sm font-medium">
          Soal {current} / {total}
        </span>
        <span className="font-display text-white text-sm font-semibold flex items-center gap-1">
          <span className="animate-heartbeat inline-block">💓</span>
          {pct}%
        </span>
      </div>
      <div className="ekg-track">
        <div className="ekg-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
