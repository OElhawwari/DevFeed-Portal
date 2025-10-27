import { NextResponse } from "next/server";

export async function GET() {
  try {
    const r = await fetch("https://dev.to/api/articles?per_page=20", {
      next: { revalidate: 300 },
    });

    if (!r.ok) throw new Error("Dev.to API error: " + r.status);

    const d = await r.json();

    const items = d.map((a: any) => ({
      id: String(a.id),
      title: a.title,
      url: a.url,
      description: a.description || "",
      tags: a.tag_list || [],
      reactions: a.public_reactions_count,
      reading_time: a.reading_time_minutes,
      cover: a.cover_image || a.social_image || null,
    }));

    return NextResponse.json({ items });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 502 });
  }
}


