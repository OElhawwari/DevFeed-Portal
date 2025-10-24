import { NextRequest, NextResponse } from "next/server";
import { getAdminDb, isFirebaseConfigured } from "@/lib/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const db = getAdminDb();
    if (!isFirebaseConfigured() || !db) {
      return NextResponse.json({ 
        error: "Firebase not configured. Please add Firebase credentials to .env.local"
      }, { status: 503 });
    }

    const docRef = db.collection("users").doc(userId).collection("favorites").doc(id);
    await docRef.delete();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ 
      error: "Failed to delete favorite",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
