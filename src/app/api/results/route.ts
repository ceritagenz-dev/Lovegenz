import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "0", 10);
    const pageSize = 30;

    const supabase = getServerSupabase();
    const { data, error, count } = await supabase
      .from("responses")
      .select("id, created_at, nama, golongan_nama, golongan_rank, deskripsi, percentage", {
        count: "exact",
      })
      .order("created_at", { ascending: false })
      .range(page * pageSize, page * pageSize + pageSize - 1);

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Supabase select error:", error);
      return NextResponse.json(
        { error: "Gagal mengambil data." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      results: data,
      total: count ?? 0,
      page,
      pageSize,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Results error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan." },
      { status: 500 }
    );
  }
}
