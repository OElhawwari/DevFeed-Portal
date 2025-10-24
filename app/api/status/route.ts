import { NextResponse } from "next/server";
import { isFirebaseConfigured } from "@/lib/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = auth();
  
  return NextResponse.json({
    firebase: {
      configured: isFirebaseConfigured(),
      hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
      hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
      hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
    },
    clerk: {
      authenticated: !!userId,
      userId: userId || null,
    },
    timestamp: new Date().toISOString(),
  });
}

