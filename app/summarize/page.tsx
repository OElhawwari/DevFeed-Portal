'use client'
import { useState, useEffect, useCallback } from 'react'
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs'
import { createPortal } from 'react-dom'
import Loader from '@/components/Loader'

interface SummaryLine {
  title: string
  source: 'GitHub' | 'Dev.to'
  fullText: string
  url?: string
  sourceTitle?: string
}

function parseSummaryLine(line: string, index: number): SummaryLine | null {
  const cleanLine = line.replace(/^\d+\.\s*/, '').trim()
  if (!cleanLine) return null

  // Check for URL and title in format: Title (Source) [URL:https://...] [TITLE:...]
  const urlMatch = cleanLine.match(/\[URL:(.+?)\]/)
  const url = urlMatch ? urlMatch[1] : ''
  const titleMatch = cleanLine.match(/\[TITLE:(.+?)\]/)
  const sourceTitle = titleMatch ? titleMatch[1] : ''
  const lineWithoutUrl = cleanLine.replace(/\[URL:.+?\]/g, '').replace(/\[TITLE:.+?\]/g, '').trim()

  // Check if line has source in format: Title (Source)
  const match = lineWithoutUrl.match(/^(.+?)\s*\(([^)]+)\)$/)
  if (match) {
    const [, title, source] = match
    const normalizedSource = source.trim() === 'GitHub' || source.trim() === 'Dev.to' || source.includes('GitHub')
      ? 'GitHub'
      : 'Dev.to'
    return {
      title: title.trim(),
      source: normalizedSource,
      fullText: lineWithoutUrl,
      url: url || undefined,
      sourceTitle: sourceTitle || undefined
    }
  }

  // Fallback: try to determine source based on content
  const isGitHub = /github|repository|repo|code|star|fork/i.test(lineWithoutUrl)
  const isDevto = /dev\.to|article|blog|tutorial|post/i.test(lineWithoutUrl)
  
  const source = isGitHub ? 'GitHub' : (isDevto ? 'Dev.to' : 'Dev.to')
  return {
    title: lineWithoutUrl,
    source,
    fullText: lineWithoutUrl,
    url: url || undefined,
    sourceTitle: sourceTitle || undefined
  }
}

export default function SummarizePage() {
  const { isSignedIn } = useUser()
  const [mounted, setMounted] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [hasCheckedDB, setHasCheckedDB] = useState(false)
  const [summaryData, setSummaryData] = useState<any>(null)

  const generateNewSummary = useCallback(async () => {
    setIsFetching(true)
    try {
      // Fetch new summary
      const response = await fetch('/api/summarize')
      const data = await response.json()
      
      // Save to database
      await fetch('/api/summarize/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      setSummaryData(data)
    } catch (error) {
      console.error('Error generating summary:', error)
    } finally {
      setIsFetching(false)
    }
  }, [])

  // Check for existing summary on mount
  useEffect(() => {
    let mounted = true;
    
    const checkExistingSummary = async () => {
      if (!isSignedIn) {
        if (mounted) setHasCheckedDB(true)
        return
      }

      try {
        const response = await fetch('/api/summarize/get')
        const data = await response.json()
        
        if (!mounted) return;
        
        if (data.exists && data.summary) {
          setSummaryData(data)
        } else {
          // No existing data, generate new summary
          await generateNewSummary()
        }
      } catch (error) {
        console.error('Error checking for existing summary:', error)
      } finally {
        if (mounted) setHasCheckedDB(true)
      }
    }

    setMounted(true)
    if (isSignedIn) {
      checkExistingSummary()
    } else {
      setHasCheckedDB(true)
    }

    return () => {
      mounted = false;
    }
  }, [isSignedIn, generateNewSummary])

  // Handle manual refresh with loading state
  const handleRefresh = async () => {
    setIsFetching(true)
    try {
      // Delete old summary
      await fetch('/api/summarize/delete', { method: 'DELETE' })
      
      // Generate and save new summary
      await generateNewSummary()
    } catch (error) {
      console.error('Error refreshing summary:', error)
    } finally {
      setIsFetching(false)
    }
  }

  const parsedLines = summaryData?.summary?.split('\n').map((line: string, index: number) => 
    parseSummaryLine(line, index)
  ).filter(Boolean) || []

  // Show loader if not mounted or still checking database
  if (!mounted || !hasCheckedDB) return <Loader />

  // Show loader while fetching initial data
  if (isFetching && !summaryData) return <Loader />

  return (
    <div className="space-y-8">
      {/* Loading overlay when fetching - Using portal */}
      {isFetching && mounted && createPortal(
        <div className="gameboy-modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-black/95 flex items-center justify-center z-[9999999] backdrop-blur-[10px]">
          <div className="text-center relative">
            {/* Retro Window */}
            <div className="p-0 w-[90vw] max-w-[400px] sm:min-w-[400px] border-[6px]" style={{
              background: 'linear-gradient(135deg, #2a3550 0%, #1a2540 100%)',
              borderColor: 'var(--retro-cyan)',
              boxShadow: '0 0 0 4px var(--retro-bg), 0 0 30px rgba(0, 217, 255, 0.6), inset 0 0 20px rgba(0, 217, 255, 0.1), 12px 12px 0 0 rgba(0, 0, 0, 0.8)'
            }}>
              {/* Title Bar */}
              <div className="px-4 py-3 flex items-center justify-center" style={{
                background: 'linear-gradient(90deg, var(--retro-cyan) 0%, var(--retro-primary) 100%)',
                borderBottom: '4px solid var(--retro-bg)'
              }}>
                <div className="text-[11px] font-bold text-white tracking-[2px]" style={{
                  textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)'
                }}>
                  UPDATE_NEWS.EXE
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-12">
                {/* Spinning Loader */}
                <div className="w-20 h-20 mx-auto mb-6 relative">
                  <div className="w-full h-full border-8 border-[rgba(0,217,255,0.2)] border-t-[var(--retro-cyan)] rounded-full animate-[spin_1s_linear_infinite]" />
                </div>

                {/* Loading Text */}
                <div className="text-sm font-bold mb-3 tracking-[2px] animate-[blink_0.8s_infinite]" style={{
                  color: 'var(--retro-cyan)',
                  textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)'
                }}>
                  UPDATING NEWS...
                </div>

                {/* Progress Bar */}
                <div className="w-full h-6 bg-black/30 border-[3px] overflow-hidden relative" style={{
                  borderColor: 'var(--retro-accent)',
                  boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}>
                  <div className="h-full bg-[length:200%_100%] animate-[loading-bar_1.5s_linear_infinite]" style={{
                    background: 'linear-gradient(90deg, var(--retro-cyan) 0%, var(--retro-primary) 50%, var(--retro-cyan) 100%)',
                    boxShadow: '0 0 10px rgba(0, 217, 255, 0.5)'
                  }} />
                </div>

                {/* Status Text */}
                <div className="text-[9px] mt-4 leading-[1.8]" style={{
                  color: 'var(--retro-primary)',
                  textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'
                }}>
                  GENERATING AI SUMMARY...<br />
                  PLEASE WAIT...
                </div>
              </div>

              {/* Bottom Status Bar */}
              <div className="px-4 py-2 border-t-[3px] flex justify-between text-[8px] font-bold" style={{
                background: 'var(--retro-bg)',
                borderTopColor: 'var(--retro-cyan)',
                color: 'var(--retro-cyan)'
              }}>
                <span>PROCESS: UPDATE</span>
                <span className="animate-[blink_1s_infinite]">● ACTIVE</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      <SignedOut>
        <div className="retro-window" style={{ background: 'linear-gradient(135deg, rgba(255, 0, 136, 0.1) 0%, rgba(0, 255, 136, 0.1) 100%)' }}>
          <div className="retro-titlebar">
            <div className="flex items-center gap-2">
              <span className="text-xs">🔒</span>
              <span>ACCESS DENIED</span>
            </div>
          </div>
          <div className="p-10 py-5 text-center">
            <p className="text-[11px] mb-6 leading-snug" style={{ color: 'var(--retro-text)', textShadow: '2px 2px 0 rgba(0, 0, 0, 0.8)' }}>
              AI SUMMARY REQUIRES AUTHENTICATION<br/><br/>
              Sign in to access AI-powered tech summaries
            </p>
            <SignInButton>
              <button 
                className="px-6 py-3 text-[10px] font-bold cursor-pointer transition-all"
                style={{
                  background: 'linear-gradient(135deg, var(--retro-secondary), var(--retro-magenta))',
                  border: '3px solid var(--retro-bg)',
                  color: 'white',
                  textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)',
                  boxShadow: 'inset -2px -2px 0 0 rgba(0, 0, 0, 0.3), inset 2px 2px 0 0 rgba(255, 255, 255, 0.3), 3px 3px 0 0 rgba(0, 0, 0, 0.7)',
                  letterSpacing: '1px',
                  fontFamily: 'Press Start 2P'
                }}>
                ▶ SIGN IN NOW ◀
              </button>
            </SignInButton>
          </div>
          <div className="retro-status">
            <span>STATUS: LOCKED</span>
            <span>ACCESS: DENIED</span>
            <span>ACTION: SIGN IN</span>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
      {!summaryData ? (
        <Loader />
      ) : (
      <>
      {/* Main Summary Window */}
      <div className="retro-window mb-7 relative overflow-visible" style={{
        background: 'linear-gradient(135deg, rgba(255, 0, 136, 0.1) 0%, rgba(0, 255, 136, 0.1) 100%)'
      }}>
        {/* Window Title Bar */}
        <div className="retro-titlebar">
          <div className="flex items-center gap-2">
            <span>TODAY'S PICK</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-4 h-4 bg-[var(--retro-tertiary)] border-2 border-[var(--retro-bg)] flex items-center justify-center text-xs cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,0.3)]">_</div>
            <div className="w-4 h-4 bg-[var(--retro-cyan)] border-2 border-[var(--retro-bg)] flex items-center justify-center text-xs cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,0.3)]">□</div>
            <div className="w-4 h-4 bg-[var(--retro-secondary)] border-2 border-[var(--retro-bg)] flex items-center justify-center text-xs cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,0.3)]">X</div>
          </div>
        </div>
        
        {/* Window Content */}
        <div className="p-10 py-5 text-center">
          <h1 className="text-base mb-2 tracking-widest" style={{ 
            color: 'var(--retro-text)', 
            textShadow: '3px 3px 0 rgba(0, 0, 0, 0.8)',
            letterSpacing: '3px' 
          }}>
            ═══ TOP TECH NEWS ═══
          </h1>
          
          <p className="text-[9px] mb-8 tracking-wide" style={{ 
            color: 'var(--retro-primary)', 
            textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)',
            letterSpacing: '1px' 
          }}>
            Last updated: {new Date(summaryData?.timestamp || Date.now()).toLocaleDateString()}
          </p>

          {/* Summary Lines */}
           <div className="flex flex-col gap-6 mb-8 max-w-[800px] mx-auto">
             {parsedLines.map((line: SummaryLine | null, index: number) => {
               if (!line) return null
               
               const isGitHub = line.sourceTitle?.toLowerCase() === 'github'
               const borderColor = 'var(--retro-primary)'
               
               const cardContent = (
                 <>
                   {/* Line Number Badge */}
                   <div 
                     className="absolute -top-3 left-5 bg-[var(--retro-secondary)] px-3 py-1 border-[3px] border-[var(--retro-bg)] text-xs font-bold text-white shadow-[2px_2px_0_0_rgba(0,0,0,0.5)] z-10">
                     LINE {index + 1}
                   </div>

                   {/* Source Badge */}
                   <div 
                     className={`text-shadow-none absolute -top-3 right-5 px-3 py-1 border-[3px] border-[var(--retro-bg)] text-xs font-bold text-white shadow-[2px_2px_0_0_rgba(0,0,0,0.5)] tracking-wide z-10 ${
                       isGitHub 
                         ? 'bg-gradient-to-br from-[var(--retro-sky)] to-[var(--retro-cyan)]'
                         : 'bg-gradient-to-br from-[var(--retro-orange)] to-[var(--retro-tertiary)]'
                     }`}>
                     {line.sourceTitle?.toUpperCase() || line.source.toUpperCase()}
                   </div>
                   
                   <p className="text-[13px] leading-relaxed text-left font-bold pt-2" style={{ 
                     color: 'var(--retro-text)', 
                     textShadow: '1px 1px 0 rgba(0, 0, 0, 0.3)' 
                   }}>
                     {line.title}
                   </p>
                 </>
               )
               
               return line.url ? (
                 <a
                   key={index}
                   href={line.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="p-5 px-6 relative animate-fadeIn transition-transform duration-300 hover:scale-105 block"
                   style={{
                     background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(255, 0, 136, 0.1) 100%)',
                     border: '4px solid',
                     borderColor: borderColor,
                     boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.3), 0 4px 0 0 rgba(0, 0, 0, 0.6)',
                     animationDelay: `${index * 0.2}s`,
                     animationFillMode: 'both',
                     cursor: 'pointer'
                   }}
                 >
                   {cardContent}
                 </a>
               ) : (
                 <div
                   key={index}
                   className="p-5 px-6 relative animate-fadeIn"
                   style={{
                     background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(255, 0, 136, 0.1) 100%)',
                     border: '4px solid',
                     borderColor: borderColor,
                     boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.3), 0 4px 0 0 rgba(0, 0, 0, 0.6)',
                     animationDelay: `${index * 0.2}s`,
                     animationFillMode: 'both'
                   }}
                 >
                   {cardContent}
                 </div>
               )
             })}
           </div>

          {/* Update Button */}
          <div className="flex justify-center mb-4">
            <button
              onClick={handleRefresh}
              disabled={isFetching}
              className={`px-4 py-2 text-xs font-bold transition-all ${isFetching ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              style={{
                background: isFetching 
                  ? 'linear-gradient(135deg, #666 0%, #444 100%)'
                  : 'linear-gradient(135deg, var(--retro-secondary), var(--retro-magenta))',
                border: '3px solid var(--retro-bg)',
                color: 'white',
                textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)',
                boxShadow: isFetching 
                  ? 'inset 2px 2px 4px rgba(0, 0, 0, 0.4)'
                  : 'inset -2px -2px 0 0 rgba(0, 0, 0, 0.3), inset 2px 2px 0 0 rgba(255, 255, 255, 0.3), 3px 3px 0 0 rgba(0, 0, 0, 0.7)',
                letterSpacing: '1px',
                fontFamily: 'Press Start 2P'
              }}
              onMouseDown={(e) => {
                if (!isFetching) {
                  e.currentTarget.style.transform = 'translateY(2px)'
                  e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.4)'
                }
              }}
              onMouseUp={(e) => {
                if (!isFetching) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'inset -2px -2px 0 0 rgba(0, 0, 0, 0.3), inset 2px 2px 0 0 rgba(255, 255, 255, 0.3), 3px 3px 0 0 rgba(0, 0, 0, 0.7)'
                }
              }}
            >
              {isFetching ? 'LOADING...' : 'UPDATE'}
            </button>
          </div>
        </div>

        {/* Status bar at bottom */}
        <div className="retro-status">
          <span>STATUS: ACTIVE ●</span>
          <span>SOURCE: AI-POWERED</span>
          <span>TIME: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
      </>
      )}
      </SignedIn>
    </div>
  )
}

