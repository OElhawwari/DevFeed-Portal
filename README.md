# 🎮 DEVFEED - Retro Developer Portal

<div align="center">

![DEVFEED Logo](https://img.shields.io/badge/DEVFEED-Retro%20Portal-00ff88?style=for-the-badge&logo=github&logoColor=white)

**A nostalgic 90s-style dashboard for GitHub and Dev.to content**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.4.0-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Clerk](https://img.shields.io/badge/Clerk-5.1.3-purple?style=flat-square)](https://clerk.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.13-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 🎯 Overview

DEVFEED is a retro-styled developer news aggregator that brings together trending content from GitHub and Dev.to in a nostalgic 90s pixel-art interface. Built with modern web technologies but designed to feel like a classic video game, it provides an engaging way to discover and save developer content.

### 🌟 Key Highlights

- **🎮 Retro Gaming Aesthetic**: Complete 90s pixel-art design with authentic sound effects
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **🔐 User Authentication**: Secure login/signup powered by Clerk
- **💾 Favorites System**: Save items across all platforms with Firebase integration
- **🤖 AI-Powered Summaries**: Personalized "Today's Top Tech 3 Lines" summaries with database persistence, clickable source links, and support for multiple AI providers (Groq, OpenAI, Anthropic, Gemini, Together AI)
- **🔊 Interactive Audio**: Retro sound effects for buttons, hover states, and interactions
- **⚡ Real-time Data**: Live content from GitHub and Dev.to APIs
- **🎨 Customizable**: Sound settings and user preferences

---

## 🚀 Live Demo

[**Try DEVFEED Now**](https://devfeed-portal.vercel.app/)

---

## 📖 Features

### 🎮 Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| **GitHub Integration** | Trending repositories with stars, forks, and language info | ✅ |
| **Dev.to Articles** | Latest developer articles with reading time and reactions | ✅ |
| **AI Summarization** | AI-powered "Today's Top Tech 3 Lines" summaries with authentication, manual refresh, database persistence, clickable source cards, and support for 5 AI providers | ✅ |
| **Favorites System** | Save items across all platforms | ✅ |
| **User Authentication** | Secure login/signup with Clerk | ✅ |
| **Retro UI/UX** | Complete 90s gaming aesthetic | ✅ |
| **Sound Effects** | Interactive audio feedback | ✅ |
| **Responsive Design** | Mobile-first responsive layout | ✅ |

### 🎨 Visual Features

- **Pixel-Perfect Design**: Authentic 90s video game aesthetics
- **Animated Elements**: Floating pixels, glowing effects, and smooth transitions
- **GameBoy-Style Modals**: Detailed item views in retro handheld console style
- **Color-Coded Sections**: Each platform has its unique color scheme
- **Retro Typography**: Press Start 2P font for authentic gaming feel
- **Interactive Buttons**: 3D-style buttons with hover and click effects

### 🔊 Audio Features

- **Button Interactions**: Click and hover sound effects
- **Modal Transitions**: Open/close sound effects
- **Favorites Actions**: Success/error sounds for save/remove operations
- **Customizable Settings**: Volume control and enable/disable options
- **Web Audio API**: High-quality procedural sound generation

---

## 🛠️ Installation

### Prerequisites

- **Node.js** 18.0 or later
- **npm** or **yarn** package manager
- **Firebase** project (for favorites feature)
- **Clerk** account (for authentication)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/OElhawwari/DevFeed-Portal.git
   cd devfeed
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev -- --port 3100
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3100](http://localhost:3100)

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Firebase Admin (Server-side)
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

# AI Provider Configuration (Choose one)
AI_PROVIDER=groq  # Options: 'groq', 'openai', 'anthropic', 'gemini', 'together'

# OpenAI (if using OpenAI)
OPENAI_API_KEY=sk-...

# Groq (if using Groq - recommended for speed and free tier)
GROQ_API_KEY=gsk_...

# Anthropic Claude (if using Anthropic)
ANTHROPIC_API_KEY=sk-ant-...

# Google Gemini (if using Gemini)
GEMINI_API_KEY=...

# Together AI (if using Together AI)
TOGETHER_API_KEY=...

# App URL (for production)
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database

2. **Get Service Account Key**
   - Go to Project Settings → Service Accounts
   - Generate new private key
   - Add the credentials to your `.env.local`

3. **Configure Firestore Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Favorites storage
       match /users/{userId}/favorites/{favId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       // AI Summary storage
       match /users/{userId}/summaries/{summaryId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

### Clerk Setup

1. **Create Clerk Application**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com/)
   - Create a new application
   - Get your API keys from the API Keys section

2. **Configure Authentication**
   - Set up sign-in and sign-up URLs
   - Configure social providers if desired

---

## 🎮 Usage

### Navigation

- **Home Page**: Overview of all platforms with featured content
- **GitHub**: Trending repositories with detailed information
- **Dev.to**: Latest developer articles and tutorials
- **AI Summary** (`/summarize`): Today's Top Tech 3 Lines powered by AI - Requires authentication, manual refresh with loading modal, database-persisted summaries with clickable source links
- **Favorites**: Your saved items across all platforms

### Interacting with Content

1. **Browse Content**: Scroll through the grid of items
2. **View Details**: Click on any item to open the GameBoy-style modal
3. **Save to Favorites**: Click the "☆ FAV" button in the modal
4. **Open Original**: Click the item title or URL to visit the original source
5. **Manage Favorites**: Visit the Favorites page to view and remove saved items

### AI Summary Feature

1. **Access**: Navigate to the AI Summary page (requires authentication)
2. **View Summaries**: See 3 personalized tech news summaries with source badges
3. **Click to Visit**: Each summary card is clickable and links to the original source
4. **Manual Refresh**: Click the "🔄 REFRESH" button to generate a new summary
5. **Database Persistence**: Summaries are saved to Firestore and persist across sessions
6. **Loading Indicator**: Retro GameBoy-style modal appears during summary generation

### Sound Controls

- **Enable/Disable**: Use the sound settings in the bottom-right corner
- **Volume Control**: Adjust the volume slider
- **Settings Persist**: Your preferences are saved locally

---

## 🏗️ Architecture

### Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework with App Router | 14.2.5 |
| **TypeScript** | Type-safe JavaScript | 5.4.5 |
| **Tailwind CSS** | Utility-first CSS framework | 3.4.13 |
| **Firebase** | Backend-as-a-Service for favorites | 12.4.0 |
| **Clerk** | Authentication and user management | 5.1.3 |
| **SWR** | Data fetching and caching | 2.2.5 |
| **OpenAI** | AI model SDK for summarization | 6.7.0 |
| **Groq** | Fast AI inference (default provider) | Via API |
| **Anthropic** | Claude AI for summaries | Via API |
| **Google Gemini** | Gemini AI for summarization | Via API |
| **Together AI** | Open-source AI models | Via API |

### Project Structure

```
devfeed/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── devto/         # Dev.to API integration
│   │   ├── favorites/     # Favorites CRUD operations
│   │   ├── github/        # GitHub API integration
│   │   └── summarize/     # AI summarization endpoints
│   │       ├── route.ts   # Main AI summary generation (multi-provider support)
│   │       ├── get/        # Fetch saved summary
│   │       ├── save/       # Save summary to database
│   │       └── delete/     # Delete summary from database
│   ├── devto/             # Dev.to page
│   ├── favorites/         # Favorites page
│   ├── github/            # GitHub page
│   ├── summarize/         # AI Summary page (authenticated)
│   ├── sign-in/           # Authentication pages
│   ├── sign-up/
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── FeedCard.tsx       # Content item card
│   ├── GameBoyModal.tsx   # Detail modal
│   ├── Navbar.tsx         # Navigation bar
│   ├── UserFavorites.tsx  # Favorites management
│   └── ...                # Other UI components
├── lib/                   # Utility libraries
│   ├── firebase.ts        # Firebase client config
│   └── firebaseAdmin.ts   # Firebase admin config
├── store/                 # State management
│   └── useFavorites.ts    # Favorites store
├── utils/                 # Utility functions
│   └── soundEffects.ts    # Audio management
└── ...                    # Configuration files
```

### Data Flow

1. **Content Fetching**: API routes fetch data from GitHub and Dev.to APIs
2. **AI Summarization**: Multi-provider AI system generates personalized summaries
3. **Database Persistence**: Firestore stores summaries per user with timestamps
4. **Manual Refresh**: Users trigger summary updates via button click
5. **User Authentication**: Clerk handles user sessions and protects AI summary access
6. **Favorites Storage**: Firebase Firestore stores user favorites
7. **State Management**: React state hooks manage application state and loading indicators
8. **UI Updates**: React components re-render based on state changes

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import your GitHub repository to Vercel
   - Configure environment variables in Vercel dashboard

2. **Deploy**
   - Vercel will automatically deploy on every push to main branch
   - Custom domains can be configured in project settings

### Other Platforms

- **Netlify**: Compatible with Next.js static export
- **Railway**: Full-stack deployment with environment variables
- **DigitalOcean**: App Platform deployment
- **AWS**: Amplify or EC2 deployment

### Environment Variables for Production

Ensure all environment variables are properly configured in your deployment platform:

- Clerk production keys
- Firebase production configuration
- AI provider API keys (Groq, OpenAI, Anthropic, Gemini, or Together AI)
- Any additional secrets

---

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npx tsc --noEmit     # Check TypeScript types
```

### Code Style

- **ESLint**: Configured with Next.js recommended rules
- **Prettier**: Code formatting (if configured)
- **TypeScript**: Strict type checking enabled
- **Tailwind**: Utility-first CSS approach

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **Build fails with TypeScript errors** | Run `npm run build` to see specific errors and fix them |
| **Favorites not working** | Check Firebase configuration and environment variables |
| **Authentication issues** | Verify Clerk keys and configuration |
| **AI Summary not working** | Check AI provider API key and `AI_PROVIDER` environment variable |
| **Summaries not persisting** | Verify Firestore configuration and database rules |
| **API rate limits** | Check external API status and rate limits |
| **Sound not playing** | Ensure browser allows audio and check sound settings |

### Debug Mode

Enable debug logging by adding to your `.env.local`:
```env
NEXT_PUBLIC_DEBUG=true
```

### Getting Help

- **GitHub Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas
- **Documentation**: Check this README and inline code comments

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔮 Future Roadmap

### Planned Features

- [ ] **Custom Feed Filters** (by language, topic, etc.)
- [ ] **Push Notifications** for new content
- [ ] **Social Sharing** with retro-style cards
- [ ] **Export Favorites** to various formats
- [ ] **PWA**
- [ ] **API Rate Limit Optimization**
- [ ] **Custom AI Summary Topics** (frontend, backend, AI, etc.)
- [ ] **AI Summary Sharing** with retro-style cards
- [ ] **Summary History** with multiple saved summaries

---

<div align="center">

**Made with ❤️ and lots of ☕ by the Omar Elhawwari**

[⭐ Star this repo](https://github.com/OElhawwari/DevFeed-Portal-) • [🐛 Report Bug](https://github.com/OElhawwari/DevFeed-Portal/issues) • [💡 Request Feature](https://github.com/OElhawwari/DevFeed-Portal/issues)

---

*Press START to begin your retro developer journey! 🎮*

</div>
