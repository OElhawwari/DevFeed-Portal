import { NextResponse } from 'next/server';
import { getAdminDb, isFirebaseConfigured } from '@/lib/firebaseAdmin';
import { auth } from '@clerk/nextjs/server';

// Force dynamic rendering since we use auth
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = getAdminDb();
    if (!isFirebaseConfigured() || !db) {
      return NextResponse.json({ 
        error: "Firebase not configured",
        exists: false 
      }, { status: 503 });
    }

    // Check for existing summary
    const snap = await db.collection("users").doc(userId).collection("summaries").doc("latest").get();
    
    if (!snap.exists) {
      return NextResponse.json({ exists: false });
    }

    const data = snap.data();
    return NextResponse.json({ 
      exists: true,
      summary: data?.summary,
      provider: data?.provider,
      timestamp: data?.timestamp,
      githubItems: data?.githubItems || [],
      devtoItems: data?.devtoItems || []
    });
  } catch (error) {
    console.error('Error fetching summary:', error);
    return NextResponse.json({ 
      error: "Failed to fetch summary",
      exists: false
    }, { status: 500 });
  }
}

