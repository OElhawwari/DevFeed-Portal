import { NextRequest, NextResponse } from "next/server";
import { getAdminDb, isFirebaseConfigured } from "@/lib/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";


export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    
    const db = getAdminDb();
    if (!isFirebaseConfigured() || !db) {
      return NextResponse.json({ 
        error: "Firebase not configured. Please add Firebase credentials to .env.local",
        items: [] 
      }, { status: 503 });
    }

    const snap = await db.collection("users").doc(userId).collection("favorites").get();
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ 
      error: "Failed to fetch favorites",
      details: error instanceof Error ? error.message : "Unknown error",
      items: []
    }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    
    const db = getAdminDb();
    if (!isFirebaseConfigured() || !db) {
      return NextResponse.json({ 
        error: "Firebase not configured. Please add Firebase credentials to .env.local"
      }, { status: 503 });
    }

    const body = await req.json();
    const id = (body?.id ?? Date.now().toString()).toString();
    const title = body?.title ?? "Untitled";
    const url = body?.url;
    const kind = body?.kind ?? "github";

    if (!url) {
      return NextResponse.json({ error: "url is required" }, { status: 400 });
    }

    const docRef = db.collection("users").doc(userId).collection("favorites").doc(id);
    await docRef.set({ id, title, url, kind });

    return NextResponse.json({ ok: true, id });
  } catch (error) {
    return NextResponse.json({ 
      error: "Failed to add favorite",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
