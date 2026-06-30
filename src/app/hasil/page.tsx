"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

type ResultItem = {
  id: string;
  created_at: string;
  nama: string;
  golongan_nama: string;
  golongan_rank: number;
  deskripsi: string;
  percentage: number;
};

export default function HasilPage() {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPage = useCallback(async (pageNum: number) => {
    const res = await fetch(`/api/results?page=${pageNum}`);
    const data = await res.json();
    return data;
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchPage(0);
      setResults(data.results || []);
      setTotal(data.total || 0);
      setLoading(false);
    })();
  }, [fetchPage]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    const data = await fetchPage(nextPage);
    setResults((prev) => [...prev, ...(data.results || [])]);
    setPage(nextPage);
    setLoadingMore(false);
  };

  const hasMore = results.length < total;

  return (
    <main className="min-h-screen bg-gradient-to-br from-bucin-red via-bucin-purple to-bucin-deepred px-4 py-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-white/85 text-sm font-medium underline-offset-2 hover:underline"
          >
            ← Kembali
          </Link>
          <span className="text-white/85 text-sm font-medium">
            {total} responden
          </span>
        </div>

        <div className="text-center mb-2">
          <h1 className="font-display text-3xl font-bold text-white text-shadow-soft">
            Hasil Sensus Bucin
          </h1>
          <p className="text-white/80 text-sm mt-1">
            Daftar lengkap, yang paling baru ngisi muncul di atas
          </p>
        </div>

        {loading && (
          <div className="flex flex-col items-center gap-3 py-16">
            <span className="text-4xl animate-heartbeat">💗</span>
            <p className="text-white/85 text-sm">Memuat data responden...</p>
          </div>
        )}

        {!loading && results.length === 0 && (
          <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 text-center">
            <p className="text-white text-base font-medium">
              Belum ada yang ngisi sensus nih.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 font-display bg-bucin-gold text-bucin-deepred font-bold px-6 py-3 rounded-full"
            >
              Jadi yang pertama →
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {results.map((item) => (
            <ResultCard key={item.id} item={item} />
          ))}
        </div>

        {hasMore && (
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="font-display bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3.5 rounded-full mt-2 disabled:opacity-60"
          >
            {loadingMore ? "Memuat..." : "Muat lebih banyak"}
          </button>
        )}
      </div>
    </main>
  );
}

function ResultCard({ item }: { item: ResultItem }) {
  return (
    <div className="bg-white rounded-2xl card-shadow p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <p className="font-display font-bold text-bucin-deepred text-base leading-tight">
            {item.nama}
          </p>
          <p className="text-bucin-pink font-display font-semibold text-sm">
            {item.golongan_nama}
          </p>
        </div>
        <div className="flex-shrink-0 bg-bucin-cream rounded-xl px-2.5 py-1 text-center">
          <p className="font-display font-bold text-bucin-deepred text-sm">
            {item.percentage}%
          </p>
        </div>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        {item.deskripsi}
      </p>
    </div>
  );
}
