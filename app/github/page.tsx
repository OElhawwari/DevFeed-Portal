'use client'
import { useState } from 'react'
import useSWR from 'swr'; 
import Loader from '@/components/Loader'; 
import FeedCard from '@/components/FeedCard'
import GameBoyModal from '@/components/GameBoyModal'

export default function GitHubPage(){ 
  const {data,isLoading}=useSWR('/api/github',(u)=>fetch(u).then(r=>r.json())); 
  
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  
  const openModal = (item: any) => {
    setSelectedItem(item)
    setModalOpen(true)
  }
  
  if(isLoading) return <Loader/>; 
  return (
    <div>
      <div className="retro-window mb-8" style={{
        background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 255, 0.1) 100%)'
      }}>
        <div className="retro-titlebar" style={{background: 'linear-gradient(90deg, var(--retro-primary) 0%, var(--retro-cyan) 100%)'}}>
          <div className="flex items-center gap-2">
            <span>LEVEL_1_GITHUB.DAT</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-4 h-4 border-2 text-[8px] cursor-pointer" style={{background: 'var(--retro-tertiary)', borderColor: 'var(--retro-bg)', boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.3)'}}>_</div>
            <div className="w-4 h-4 border-2 text-[8px] cursor-pointer" style={{background: 'var(--retro-cyan)', borderColor: 'var(--retro-bg)', boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.3)'}}>□</div>
            <div className="w-4 h-4 border-2 text-[8px] cursor-pointer" style={{background: 'var(--retro-secondary)', borderColor: 'var(--retro-bg)', boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.3)'}}>X</div>
          </div>
        </div>
        <div className="p-6 text-center">
          <h1 className="text-base font-bold tracking-[3px] mb-3 animate-[pixelate_2s_infinite]" style={{
            color: 'var(--retro-text)',
            textShadow: '3px 3px 0 rgba(0, 0, 0, 0.8), 6px 6px 0 var(--retro-cyan)'
          }}>
            ▶ GITHUB TRENDING ◀
          </h1>
          <p className="text-[9px] tracking-[2px] font-bold mb-3" style={{
            color: 'var(--retro-primary)',
            textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'
          }}>
            LEVEL 1: REPOSITORIES
          </p>
          <div className="retro-status">
            <span>LOCATION: /GITHUB</span>
            <span>LEVEL: 1</span>
            <span>ITEMS: {data?.items?.length || 0}</span>
          </div>
        </div>
      </div>
      
      <div className="retro-window" style={{background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(0, 255, 255, 0.05) 100%)'}}>
        <div className="retro-titlebar" style={{background: 'linear-gradient(90deg, var(--retro-cyan) 0%, var(--retro-primary) 100%)'}}>
          <div className="flex items-center gap-2">
            <span>REPOSITORIES.LST</span>
          </div>
        </div>
        <div className="p-4">
          <div className="grid-cards">
            {data?.items?.map((it:any)=>(<FeedCard key={it.id} item={it} onClick={() => openModal(it)}/>))}
          </div>
        </div>
        <div className="retro-status">
          <span>FILES: {data?.items?.length || 0}</span>
          <span>TYPE: REPO</span>
          <span>TRENDING</span>
        </div>
      </div>
      
      
      <GameBoyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedItem}
        type="github"
      />
    </div>
  ) 
}

