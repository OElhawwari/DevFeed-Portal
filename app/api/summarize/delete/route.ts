import { NextResponse } from 'next/server';
import { getAdminDb, isFirebaseConfigured } from '@/lib/firebaseAdmin';
import { auth } from '@clerk/nextjs/server';

// Force dynamic rendering since we use auth
export const dynamic = 'force-dynamic';

export async function DELETE() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = getAdminDb();
    if (!isFirebaseConfigured() || !db) {
      return NextResponse.json({ 
        error: "Firebase not configured"
      }, { status: 503 });
    }

    // Delete the old summary
    const docRef = db.collection("users").doc(userId).collection("summaries").doc("latest");
    await docRef.delete();

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error deleting summary:', error);
    return NextResponse.json({ 
      error: "Failed to delete summary",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

