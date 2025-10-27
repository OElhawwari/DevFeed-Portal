import { NextResponse } from 'next/server';
import { getAdminDb, isFirebaseConfigured } from '@/lib/firebaseAdmin';
import { auth } from '@clerk/nextjs/server';

// Force dynamic rendering since we use auth
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
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

    const body = await req.json();
    const { summary, provider, githubItems, devtoItems } = body;

    if (!summary) {
      return NextResponse.json({ error: "summary is required" }, { status: 400 });
    }

    // Save summary to database
    const docRef = db.collection("users").doc(userId).collection("summaries").doc("latest");
    await docRef.set({
      summary,
      provider: provider || 'groq',
      timestamp: new Date().toISOString(),
      githubItems: githubItems || [],
      devtoItems: devtoItems || []
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error saving summary:', error);
    return NextResponse.json({ 
      error: "Failed to save summary",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

