import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UserInfoFloat from '@/components/UserInfoFloat'
import SoundSettings from '@/components/SoundSettings'

export const metadata = { 
  title: '▶ DEVFEED ◀ Retro Developer Portal', 
  description: 'A 90s pixel-style dashboard for GitHub, Dev.to, and Reddit. PRESS START!' 
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
        </head>
        <body className="min-h-screen flex flex-col" style={{
          position: 'relative',
          overflow: 'auto'
        }}>
          {/* Enhanced Retro Grid Background Pattern */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            pointerEvents: 'none',
            zIndex: 0
          }} />
          
          {/* Diagonal stripes overlay */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 100px,
              rgba(0, 255, 255, 0.02) 100px,
              rgba(0, 255, 255, 0.02) 200px
            )`,
            pointerEvents: 'none',
            zIndex: 0
          }} />
          
          {/* Floating decorative pixels */}
          <div style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            width: '12px',
            height: '12px',
            background: 'var(--retro-cyan)',
            boxShadow: '3px 3px 0 0 rgba(0, 0, 0, 0.5)',
            zIndex: 0,
            animation: 'power-up 2s ease-in-out infinite'
          }} />
          <div style={{
            position: 'fixed',
            top: '60px',
            right: '40px',
            width: '10px',
            height: '10px',
            background: 'var(--retro-tertiary)',
            boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.5)',
            zIndex: 0,
            animation: 'power-up 3s ease-in-out infinite'
          }} />
          <div style={{
            position: 'fixed',
            bottom: '100px',
            left: '50px',
            width: '8px',
            height: '8px',
            background: 'var(--retro-secondary)',
            boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.5)',
            zIndex: 0,
            animation: 'coin 4s ease-in-out infinite'
          }} />
          
          <Navbar />
          <main className="container-page flex-1 space-y-6" style={{position: 'relative', zIndex: 1}}>
            {children}
          </main>
          <Footer />
          <UserInfoFloat />
          <SoundSettings />
        </body>
      </html>
    </ClerkProvider>
  )
}
