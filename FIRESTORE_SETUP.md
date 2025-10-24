# Firestore + Clerk Integration (Next.js App Router)

## 🔥 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable Firestore Database (in Build → Firestore Database)
4. Choose "Start in test mode" (we'll add security rules later)

### 2. Get Firebase Admin Credentials
1. In Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. Save the JSON file securely (DON'T commit to git)
4. Extract these values for `.env.local`:
   - `projectId` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (keep the `\n` characters)

### 3. Get Firebase Client Config
1. In Firebase Console → Project Settings → General
2. Scroll to "Your apps" → Add web app (if not already added)
3. Copy the config values for `.env.local`:
   - `apiKey` → `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `authDomain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `projectId` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `storageBucket` → `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `messagingSenderId` → `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `appId` → `NEXT_PUBLIC_FIREBASE_APP_ID`

## 🔐 Clerk Setup
1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create application (or use existing)
3. Get your keys from API Keys section:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

## 📝 Environment Variables
Create `.env.local` in your project root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Firebase Admin (Server-side only)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourKeyHere\n-----END PRIVATE KEY-----\n"

# Firebase Client (Browser-side)
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

## 🚀 Quick Start
1. Set up environment variables (see above)
2. Run `npm install`
3. Run `npm run dev`
4. Sign in via Clerk
5. Visit any page (GitHub, Dev.to)
6. Click on an item → Click "☆ FAV" in GameBoy modal
7. Visit `/favorites` to see your saved items

## 🔒 Firestore Security Rules (Optional but Recommended)
In Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/favorites/{favId} {
      // Only allow users to read/write their own favorites
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🏗️ Architecture

### Data Flow
1. User clicks "FAV" button → `GameBoyModal` component
2. Client calls `POST /api/favorites` with item data
3. Server authenticates with Clerk (`auth()` gets `userId`)
4. Server writes to Firestore: `/users/{userId}/favorites/{itemId}`
5. Client refetches favorites list
6. Favorites page displays items from Firestore

### File Structure
- `lib/firebase.ts` - Client-side Firebase config
- `lib/firebaseAdmin.ts` - Server-side Firebase Admin SDK
- `app/api/favorites/route.ts` - GET (list) and POST (add) endpoints
- `app/api/favorites/[id]/route.ts` - DELETE endpoint
- `store/useFavorites.ts` - Zustand store for state management
- `components/UserFavorites.tsx` - Favorites page UI
- `components/GameBoyModal.tsx` - Item detail modal with favorite button

## 🐛 Troubleshooting

### "Missing Firebase Admin environment variables"
- Check `.env.local` has all `FIREBASE_` variables
- Restart dev server after adding variables

### "Unauthorized" error in favorites
- Make sure you're signed in via Clerk
- Check Clerk keys are correct in `.env.local`

### Favorites not persisting
- Check Firebase Admin credentials are correct
- Verify Firestore is enabled in Firebase Console
- Check browser console for API errors

### "Not Found" when adding favorites
- Ensure `/api/favorites/route.ts` exists
- Check the API route is not being blocked by middleware

## 🎮 Features
- ✅ Per-user favorites stored in Firestore
- ✅ Real-time sync across devices
- ✅ Authenticated with Clerk
- ✅ Retro 90's pixel game aesthetic
- ✅ GameBoy-style modal for viewing items
- ✅ Confirmation dialog before deleting
- ✅ Support for GitHub and Dev.to items
