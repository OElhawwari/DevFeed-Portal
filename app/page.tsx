'use client'
import { useState } from 'react'
import useSWR from 'swr'
import Loader from '@/components/Loader'
import FeedCard from '@/components/FeedCard'
import GameBoyModal from '@/components/GameBoyModal'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())
export default function HomePage(){
  const {data:gh,isLoading:l1}=useSWR('/api/github',fetcher)
  const {data:dt,isLoading:l2}=useSWR('/api/devto',fetcher)
  
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [modalType, setModalType] = useState<'github' | 'devto'>('github')
  
  const openModal = (item: any, type: 'github' | 'devto') => {
    setSelectedItem(item)
    setModalType(type)
    setModalOpen(true)
  }
  
  if(l1||l2) return <Loader/>
  return (
    <div className="space-y-8">
      {/* Main Welcome Window */}
      <div className="retro-window" style={{
        marginBottom: '28px',
        background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(255, 0, 136, 0.1) 100%)',
        position: 'relative',
        overflow: 'visible'
      }}>
        {/* Window Title Bar */}
        <div className="retro-titlebar">
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <span>◉</span>
            <span>DEVFEED.EXE</span>
          </div>
          <div style={{display: 'flex', gap: '6px'}}>
            <div style={{
              width: '16px',
              height: '16px',
              background: 'var(--retro-tertiary)',
              border: '2px solid var(--retro-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              cursor: 'pointer',
              boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.3)'
            }}>_</div>
            <div style={{
              width: '16px',
              height: '16px',
              background: 'var(--retro-cyan)',
              border: '2px solid var(--retro-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              cursor: 'pointer',
              boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.3)'
            }}>□</div>
            <div style={{
              width: '16px',
              height: '16px',
              background: 'var(--retro-secondary)',
              border: '2px solid var(--retro-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              cursor: 'pointer',
              boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.3)'
            }}>X</div>
          </div>
        </div>
        
        {/* Window Content */}
        <div style={{padding: '20px', textAlign: 'center'}}>
          {/* Decorative icons */}
          <div style={{
            position: 'absolute',
            top: '50px',
            left: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              background: 'var(--retro-cyan)',
              border: '3px solid var(--retro-primary)',
              boxShadow: '3px 3px 0 0 rgba(0, 0, 0, 0.6)',
              animation: 'coin 3s ease-in-out infinite'
            }} />
            <div style={{
              width: '24px',
              height: '24px',
              background: 'var(--retro-tertiary)',
              border: '3px solid var(--retro-orange)',
              boxShadow: '3px 3px 0 0 rgba(0, 0, 0, 0.6)',
              animation: 'coin 2.5s ease-in-out infinite'
            }} />
          </div>
          
          <div style={{
            position: 'absolute',
            top: '50px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              background: 'var(--retro-secondary)',
              border: '3px solid var(--retro-magenta)',
              boxShadow: '3px 3px 0 0 rgba(0, 0, 0, 0.6)',
              animation: 'coin 2s ease-in-out infinite'
            }} />
            <div style={{
              width: '24px',
              height: '24px',
              background: 'var(--retro-primary)',
              border: '3px solid var(--retro-cyan)',
              boxShadow: '3px 3px 0 0 rgba(0, 0, 0, 0.6)',
              animation: 'coin 3.5s ease-in-out infinite'
            }} />
          </div>
          
          <h1 style={{
            fontSize: '18px',
            color: 'var(--retro-text)',
            marginBottom: '16px',
            textShadow: '3px 3px 0 rgba(0, 0, 0, 0.8), 6px 6px 0 var(--retro-cyan), 9px 9px 0 var(--retro-magenta)',
            animation: 'pixelate 2s infinite',
            letterSpacing: '3px'
          }}>
            ═══ WELCOME TO DEVFEED ═══
          </h1>
          <p style={{
            fontSize: '10px',
            color: 'var(--retro-primary)',
            letterSpacing: '2px',
            fontWeight: 'bold',
            textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)',
            marginBottom: '16px'
          }}>
            ▸ YOUR RETRO DEVELOPER NEWS PORTAL ◂
          </p>
          
          {/* Status bar at bottom */}
          <div className="retro-status">
            <span>STATUS: ONLINE ●</span>
            <span>LEVEL: ALL</span>
            <span>SCORE: 9999</span>
          </div>
        </div>
      </div>
      
      {/* GitHub Section Window */}
      <section className="retro-window" style={{background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(0, 255, 255, 0.05) 100%)'}}>
        <div className="retro-titlebar" style={{background: 'linear-gradient(90deg, var(--retro-primary) 0%, var(--retro-cyan) 100%)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <span style={{fontSize: '12px'}}>🗂</span>
            <span>GITHUB_TRENDING.DAT</span>
          </div>
          <div style={{display: 'flex', gap: '6px'}}>
            <div style={{
              width: '16px',
              height: '16px',
              background: 'var(--retro-tertiary)',
              border: '2px solid var(--retro-bg)',
              fontSize: '8px',
              cursor: 'pointer',
              boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.3)'
            }}>i</div>
          </div>
        </div>
        <div style={{padding: '16px'}}>
          <div className="grid-cards">
            {gh?.items?.slice(0,8).map((it:any)=>(<FeedCard key={it.id} item={it} onClick={() => openModal(it, 'github')}/>))}
          </div>
        </div>
        <div className="retro-status">
          <span>FILES: {gh?.items?.length || 0}</span>
          <span>TYPE: REPOSITORY</span>
          <span>VIEW: GRID</span>
        </div>
      </section>
      
      {/* Dev.to Section Window */}
      <section className="retro-window" style={{background: 'linear-gradient(135deg, rgba(255, 255, 0, 0.05) 0%, rgba(255, 136, 0, 0.05) 100%)'}}>
        <div className="retro-titlebar" style={{background: 'linear-gradient(90deg, var(--retro-tertiary) 0%, var(--retro-orange) 100%)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <span style={{fontSize: '12px'}}>📰</span>
            <span>DEVTO_ARTICLES.EXE</span>
          </div>
          <div style={{display: 'flex', gap: '6px'}}>
            <div style={{
              width: '16px',
              height: '16px',
              background: 'var(--retro-cyan)',
              border: '2px solid var(--retro-bg)',
              fontSize: '8px',
              cursor: 'pointer',
              boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.3)'
            }}>★</div>
          </div>
        </div>
        <div style={{padding: '16px'}}>
          <div className="grid-cards">
            {dt?.items?.slice(0,8).map((it:any)=>(<FeedCard key={it.id} item={it} onClick={() => openModal(it, 'devto')}/>))}
          </div>
        </div>
        <div className="retro-status">
          <span>ARTICLES: {dt?.items?.length || 0}</span>
          <span>TYPE: CONTENT</span>
          <span>MODE: READ</span>
        </div>
      </section>
      
      
      {/* Game Boy Modal */}
      <GameBoyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedItem}
        type={modalType}
      />
    </div>
  )
}

