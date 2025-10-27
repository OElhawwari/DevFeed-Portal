'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePathname, useRouter } from 'next/navigation';
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs';
import { soundManager } from '@/utils/soundEffects';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      // Force navigation after a short delay
      setTimeout(() => {
        router.push('/');
        setIsLoggingOut(false);
      }, 500);
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  const toggleMobileMenu = () => {
    soundManager.playButtonPress();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    soundManager.playModalClose();
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    closeMobileMenu();
  };

  return (
    <>

      <header className="px-4 py-4" style={{
        position: 'relative',
        zIndex: 40,
        borderBottom: '6px solid',
        borderImage: 'linear-gradient(90deg, var(--retro-cyan) 0%, var(--retro-secondary) 50%, var(--retro-cyan) 100%) 1',
        boxShadow: '0 6px 0 0 rgba(0, 0, 0, 0.8), inset 0 -3px 0 0 var(--retro-primary)'
      }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div className="relative ml-3">
            {/* Shadow layers */}
            <div className="absolute top-[5px] left-[5px] text-black/80 text-base font-['Press_Start_2P'] tracking-[3px] z-0">
              DEVFEED
            </div>
            <div className="absolute top-[3px] left-[3px] text-cyan-400 text-base font-['Press_Start_2P'] tracking-[3px] z-[1]">
              DEVFEED
            </div>
            <div className="absolute top-[2px] left-[2px] text-fuchsia-500 text-base font-['Press_Start_2P'] tracking-[3px] z-[2]">
              DEVFEED
            </div>
            {/* Main text */}
            <div className="relative text-yellow-400 text-base font-['Press_Start_2P'] tracking-[3px] z-[3]" style={{
              textShadow: '0 0 10px #facc15, 0 0 20px #facc15',
              WebkitTextStroke: '1px #0f1419',
              animation: 'neon-glow 2s ease-in-out infinite'
            }}>
              DEVFEED
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-2 -left-3 text-[10px] text-green-400" style={{ animation: 'blink 1s infinite' }}>▶</div>
            <div className="absolute -top-2 -right-3 text-[10px] text-pink-500" style={{ animation: 'blink 1.5s infinite' }}>◀</div>
            <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 text-[6px] text-cyan-400 tracking-[2px] font-['Press_Start_2P'] whitespace-nowrap">
              ★ DEVELOPERS PORTAL ★
            </div>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            {/* Main Navigation Container */}
            <div className="relative inline-flex items-center gap-0 rounded-[50px] p-2">
              {/* Navigation Buttons */}
              <div className="relative z-10 flex items-center gap-1">
                <a
                  href="/"
                  className={`relative ${pathname === '/' ? 'px-12' : 'px-6'} py-3.5 text-[10px] font-['Press_Start_2P'] tracking-wider transition-all duration-100 hover:translate-y-0.5 active:translate-y-1`}
                  onMouseEnter={() => soundManager.playButtonHover()}
                  onMouseDown={() => soundManager.playButtonPress()}
                  style={{
                    background: pathname === '/' ? 'linear-gradient(180deg, #3f4961 0%, #545d72 100%)' : 'linear-gradient(180deg, #2a3550 0%, #1a2540 100%)',
                    border: '2px solid #0f1419',
                    color: '#00ff88',
                    textShadow: '0 0 8px #00ff88',
                    boxShadow: 'inset 0 -4px 0 0 rgba(0, 0, 0, 0.5), inset 0 4px 0 0 rgba(255, 255, 255, 0.1), inset -4px 0 0 0 rgba(0, 0, 0, 0.4), inset 4px 0 0 0 rgba(255, 255, 255, 0.1), 0 4px 0 0 #0f1419, 4px 0 0 0 rgba(0, 0, 0, 0.3), -4px 0 0 0 rgba(0, 0, 0, 0.3), 0 -4px 0 0 rgba(0, 0, 0, 0.2)',
                  }}>
                  Home <span className="text-yellow-400">+</span>
                </a>

                <a
                  href="/github"
                  className={`relative ${pathname === '/github' ? 'px-12' : 'px-6'} py-3.5 text-[10px] font-['Press_Start_2P'] tracking-wider transition-all duration-100 hover:translate-y-0.5 active:translate-y-1`}
                  onMouseEnter={() => soundManager.playButtonHover()}
                  onMouseDown={() => soundManager.playButtonPress()}
                  style={{
                    background: pathname === '/github' ? 'linear-gradient(180deg, #3f4961 0%, #545d72 100%)' : 'linear-gradient(180deg, #2a3550 0%, #1a2540 100%)',
                    border: '2px solid #0f1419',
                    color: '#00d9ff',
                    textShadow: '0 0 8px #00d9ff',
                    boxShadow: 'inset 0 -4px 0 0 rgba(0, 0, 0, 0.5), inset 0 4px 0 0 rgba(255, 255, 255, 0.1), inset -4px 0 0 0 rgba(0, 0, 0, 0.4), inset 4px 0 0 0 rgba(255, 255, 255, 0.1), 0 4px 0 0 #0f1419, 4px 0 0 0 rgba(0, 0, 0, 0.3), -4px 0 0 0 rgba(0, 0, 0, 0.3), 0 -4px 0 0 rgba(0, 0, 0, 0.2)'
                  }}>
                  GITHUB
                </a>

                <a
                  href="/devto"
                  className={`relative ${pathname === '/devto' ? 'px-12' : 'px-6'} py-3.5 text-[10px] font-['Press_Start_2P'] tracking-wider transition-all duration-100 hover:translate-y-0.5 active:translate-y-1`}
                  onMouseEnter={() => soundManager.playButtonHover()}
                  onMouseDown={() => soundManager.playButtonPress()}
                  style={{
                    background: pathname === '/devto' ? 'linear-gradient(180deg, #3f4961 0%, #545d72 100%)' : 'linear-gradient(180deg, #2a3550 0%, #1a2540 100%)',
                    border: '2px solid #0f1419',
                    color: '#ff8800',
                    textShadow: '0 0 8px #ff8800',
                    boxShadow: 'inset 0 -4px 0 0 rgba(0, 0, 0, 0.5), inset 0 4px 0 0 rgba(255, 255, 255, 0.1), inset -4px 0 0 0 rgba(0, 0, 0, 0.4), inset 4px 0 0 0 rgba(255, 255, 255, 0.1), 0 4px 0 0 #0f1419, 4px 0 0 0 rgba(0, 0, 0, 0.3), -4px 0 0 0 rgba(0, 0, 0, 0.3), 0 -4px 0 0 rgba(0, 0, 0, 0.2)'
                  }}>
                  DEV.TO
                </a>

                <a
                  href="/summarize"
                  className={`relative ${pathname === '/summarize' ? 'px-10' : 'px-5'} py-3.5 text-[10px] font-['Press_Start_2P'] tracking-wider transition-all duration-100 hover:translate-y-0.5 active:translate-y-1`}
                  onMouseEnter={() => soundManager.playButtonHover()}
                  onMouseDown={() => soundManager.playButtonPress()}
                  style={{
                    background: pathname === '/summarize' ? 'linear-gradient(180deg, #3f4961 0%, #545d72 100%)' : 'linear-gradient(180deg, #2a3550 0%, #1a2540 100%)',
                    border: '2px solid #0f1419',
                    color: '#ff0088',
                    textShadow: '0 0 8px #ff0088',
                    boxShadow: 'inset 0 -4px 0 0 rgba(0, 0, 0, 0.5), inset 0 4px 0 0 rgba(255, 255, 255, 0.1), inset -4px 0 0 0 rgba(0, 0, 0, 0.4), inset 4px 0 0 0 rgba(255, 255, 255, 0.1), 0 4px 0 0 #0f1419, 4px 0 0 0 rgba(0, 0, 0, 0.3), -4px 0 0 0 rgba(0, 0, 0, 0.3), 0 -4px 0 0 rgba(0, 0, 0, 0.2)'
                  }}>
                  AI SUMMARY
                </a>

                <a
                  href="/favorites"
                  className={`relative ${pathname === '/favorites' ? 'px-10' : 'px-5'} py-3.5 text-[10px] font-['Press_Start_2P'] tracking-wider transition-all duration-100 hover:translate-y-0.5 active:translate-y-1`}
                  onMouseEnter={() => soundManager.playButtonHover()}
                  onMouseDown={() => soundManager.playButtonPress()}
                  style={{
                    background: pathname === '/favorites' ? 'linear-gradient(180deg, #3f4961 0%, #545d72 100%)' : 'linear-gradient(180deg, #2a3550 0%, #1a2540 100%)',
                    border: '2px solid #ffff00',
                    color: '#ffff00',
                    textShadow: '0 0 8px #ffff00',
                    boxShadow: 'inset 0 -4px 0 0 rgba(255, 255, 0, 0.3), inset 0 4px 0 0 rgba(255, 255, 255, 0.1), inset -4px 0 0 0 rgba(0, 0, 0, 0.4), inset 4px 0 0 0 rgba(255, 255, 255, 0.1), 0 4px 0 0 #0f1419, 4px 0 0 0 rgba(0, 0, 0, 0.3), -4px 0 0 0 rgba(0, 0, 0, 0.3), 0 -4px 0 0 rgba(0, 0, 0, 0.2)'
                  }}>
                  ★ FAV
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Auth Button - Right side */}
          <div className="hidden lg:block">
            <SignedOut>
              <a
                href="/sign-in"
                className="relative px-6 py-3.5 text-[10px] font-['Press_Start_2P'] tracking-wider transition-all duration-100 inline-block hover:translate-y-0.5 active:translate-y-1"
                onMouseEnter={() => soundManager.playButtonHover()}
                onMouseDown={() => soundManager.playButtonPress()}
                style={{
                  border: '2px solid #ff0088',
                  background: 'transparent',
                  color: '#ff0088',
                  textShadow: '0 0 8px #ff0088',
                  boxShadow: 'inset 0 -4px 0 0 rgba(255, 0, 136, 0.2), inset 0 4px 0 0 rgba(255, 255, 255, 0.1), inset -4px 0 0 0 rgba(0, 0, 0, 0.4), inset 4px 0 0 0 rgba(255, 255, 255, 0.1), 0 4px 0 0 #0f1419, 4px 0 0 0 rgba(0, 0, 0, 0.3), -4px 0 0 0 rgba(0, 0, 0, 0.3), 0 -4px 0 0 rgba(0, 0, 0, 0.2)'
                }}>
                SIGN IN
              </a>
            </SignedOut>
            <SignedIn>
              <button
                onClick={handleLogout}
                className="relative px-6 py-3.5 text-[10px] font-['Press_Start_2P'] tracking-wider transition-all duration-100 inline-block hover:translate-y-0.5 active:translate-y-1 cursor-pointer"
                onMouseEnter={() => soundManager.playButtonHover()}
                onMouseDown={() => soundManager.playButtonPress()}
                style={{
                  border: '2px solid #ff0088',
                  background: 'linear-gradient(180deg, #ff0088 0%, #cc0066 100%)',
                  color: '#ffffff',
                  textShadow: '0 0 8px #000000, 2px 2px 0 rgba(0, 0, 0, 0.5)',
                  boxShadow: 'inset 0 -4px 0 0 rgba(0, 0, 0, 0.5), inset 0 4px 0 0 rgba(255, 255, 255, 0.2), inset -4px 0 0 0 rgba(0, 0, 0, 0.4), inset 4px 0 0 0 rgba(255, 255, 255, 0.1), 0 4px 0 0 #0f1419, 4px 0 0 0 rgba(0, 0, 0, 0.3), -4px 0 0 0 rgba(0, 0, 0, 0.3), 0 -4px 0 0 rgba(0, 0, 0, 0.2)'
                }}
              >
                LOGOUT
              </button>
            </SignedIn>
          </div>

          {/* Mobile Burger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden relative px-4 py-3 text-[10px] font-['Press_Start_2P'] tracking-wider transition-all duration-100 hover:translate-y-0.5 active:translate-y-1"
            onMouseEnter={() => soundManager.playButtonHover()}
            onMouseDown={() => soundManager.playButtonPress()}
            style={{
              background: 'linear-gradient(180deg, #2a3550 0%, #1a2540 100%)',
              border: '2px solid #0f1419',
              color: '#00ff88',
              textShadow: '0 0 8px #00ff88',
              boxShadow: 'inset 0 -4px 0 0 rgba(0, 0, 0, 0.5), inset 0 4px 0 0 rgba(255, 255, 255, 0.1), inset -4px 0 0 0 rgba(0, 0, 0, 0.4), inset 4px 0 0 0 rgba(255, 255, 255, 0.1), 0 4px 0 0 #0f1419, 4px 0 0 0 rgba(0, 0, 0, 0.3), -4px 0 0 0 rgba(0, 0, 0, 0.3), 0 -4px 0 0 rgba(0, 0, 0, 0.2)'
            }}
          >
            ☰ MENU
          </button>
        </div>
      </header>

      {/* Logout Loading Screen */}
      {isLoggingOut && mounted && createPortal(
        <div
          className="gameboy-modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            backdropFilter: 'blur(10px)'
          }}
        >
          <div style={{
            textAlign: 'center',
            position: 'relative'
          }}>
            {/* Retro Window */}
            <div style={{
              background: 'linear-gradient(135deg, #2a3550 0%, #1a2540 100%)',
              border: '6px solid var(--retro-secondary)',
              boxShadow: '0 0 0 4px var(--retro-bg), 0 0 30px rgba(255, 0, 136, 0.6), inset 0 0 20px rgba(255, 0, 136, 0.1), 12px 12px 0 0 rgba(0, 0, 0, 0.8)',
              padding: '0',
              minWidth: '400px'
            }}>
              {/* Title Bar */}
              <div style={{
                background: 'linear-gradient(90deg, var(--retro-secondary) 0%, var(--retro-magenta) 100%)',
                padding: '12px 16px',
                borderBottom: '4px solid var(--retro-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: 'white',
                  letterSpacing: '2px',
                  textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)'
                }}>
                  LOGOUT.EXE
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '48px 32px' }}>
                {/* Spinning Loader */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 24px',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    border: '8px solid rgba(255, 0, 136, 0.2)',
                    borderTop: '8px solid var(--retro-secondary)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />

                </div>

                {/* Loading Text */}
                <div style={{
                  fontSize: '14px',
                  color: 'var(--retro-tertiary)',
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)',
                  letterSpacing: '2px',
                  animation: 'blink 0.8s infinite'
                }}>
                  LOGGING OUT...
                </div>

                {/* Progress Bar */}
                <div style={{
                  width: '100%',
                  height: '24px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '3px solid var(--retro-accent)',
                  boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.5)',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--retro-secondary) 0%, var(--retro-magenta) 50%, var(--retro-secondary) 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'loading-bar 1.5s linear infinite',
                    boxShadow: '0 0 10px rgba(255, 0, 136, 0.5)'
                  }} />
                </div>

                {/* Status Text */}
                <div style={{
                  fontSize: '9px',
                  color: 'var(--retro-primary)',
                  marginTop: '16px',
                  lineHeight: '1.8',
                  textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'
                }}>
                  SAVING SESSION DATA...<br />
                  CLEARING CACHE...<br />
                  TERMINATING CONNECTION...
                </div>
              </div>

              {/* Bottom Status Bar */}
              <div style={{
                background: 'var(--retro-bg)',
                padding: '8px 16px',
                borderTop: '3px solid var(--retro-secondary)',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '8px',
                color: 'var(--retro-secondary)',
                fontWeight: 'bold'
              }}>
                <span>PROCESS: LOGOUT</span>
                <span style={{ animation: 'blink 1s infinite' }}>● ACTIVE</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Mobile Menu Modal */}
      {isMobileMenuOpen && mounted && createPortal(
        <div
          onClick={closeMobileMenu}
          className="gameboy-modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            backdropFilter: 'blur(10px)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[90vw] max-w-sm mx-4"
            style={{
              background: 'linear-gradient(135deg, #2a3550 0%, #1a2540 100%)',
              border: '6px solid var(--retro-cyan)',
              boxShadow: '0 0 0 4px var(--retro-bg), 0 0 30px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.1), 12px 12px 0 0 rgba(0, 0, 0, 0.8)',
              padding: '0',
              position: 'relative'
            }}
          >
            {/* Title Bar */}
            <div style={{
              background: 'linear-gradient(90deg, var(--retro-cyan) 0%, var(--retro-secondary) 100%)',
              padding: '12px 16px',
              borderBottom: '4px solid var(--retro-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 'bold',
                color: 'white',
                letterSpacing: '2px',
                textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)'
              }}>
                NAVIGATION.EXE
              </div>
              <button
                onClick={closeMobileMenu}
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}
              >
                ✕
              </button>
            </div>

            {/* Menu Content */}
            <div style={{ padding: '24px' }}>
              {/* Navigation Links */}
              <div style={{ marginBottom: '24px' }}>
                <a
                  href="/"
                  onClick={handleNavClick}
                  className={`block w-full text-center py-4 px-6 mb-3 text-[10px] font-['Press_Start_2P'] tracking-wider transition-all duration-100 hover:translate-y-0.5 active:translate-y-1`}
                  style={{
                    background: pathname === '/' ? 'linear-gradient(180deg, #3f4961 0%, #545d72 100%)' : 'linear-gradient(180deg, #2a3550 0%, #1a2540 100%)',
                    border: '2px solid #0f1419',
                    color: '#00ff88',
                    textShadow: '0 0 8px #00ff88',
                    boxShadow: 'inset 0 -4px 0 0 rgba(0, 0, 0, 0.5), inset 0 4px 0 0 rgba(255, 255, 255, 0.1), 0 4px 0 0 #0f1419'
                  }}
                >
                  Home <span className="text-yellow-400">+</span>
                </a>

                <a
                  href="/github"
                  onClick={handleNavClick}
                  className={`block w-full text-center py-4 px-6 mb-3 text-[10px] font-['Press_Start_2P'] tracking-wider transition-all duration-100 hover:translate-y-0.5 active:translate-y-1`}
                  style={{
                    background: pathname === '/github' ? 'linear-gradient(180deg, #3f4961 0%, #545d72 100%)' : 'linear-gradient(180deg, #2a3550 0%, #1a2540 100%)',
                    border: '2px solid #0f1419',
                    color: '#00d9ff',
                    textShadow: '0 0 8px #00d9ff',
                    boxShadow: 'inset 0 -4px 0 0 rgba(0, 0, 0, 0.5), inset 0 4px 0 0 rgba(255, 255, 255, 0.1), 0 4px 0 0 #0f1419'
                  }}
                >
                  GITHUB
                </a>

                <a
                  href="/devto"
                  onClick={handleNavClick}
                  className={`block w-full text-center py-4 px-6 mb-3 text-[10px] font-['Press_Start_2P'] tracking-wider transition-all duration-100 hover:translate-y-0.5 active:translate-y-1`}
                  style={{
                    background: pathname === '/devto' ? 'linear-gradient(180deg, #3f4961 0%, #545d72 100%)' : 'linear-gradient(180deg, #2a3550 0%, #1a2540 100%)',
                    border: '2px solid #0f1419',
                    color: '#ff8800',
                    textShadow: '0 0 8px #ff8800',
                    boxShadow: 'inset 0 -4px 0 0 rgba(0, 0, 0, 0.5), inset 0 4px 0 0 rgba(255, 255, 255, 0.1), 0 4px 0 0 #0f1419'
                  }}
                >
                  DEV.TO
                </a>

                <a
                  href="/summarize"
                  onClick={handleNavClick}
                  className={`block w-full text-center py-4 px-6 mb-3 text-[10px] font-['Press_Start_2P'] tracking-wider transition-all duration-100 hover:translate-y-0.5 active:translate-y-1`}
                  style={{
                    background: pathname === '/summarize' ? 'linear-gradient(180deg, #3f4961 0%, #545d72 100%)' : 'linear-gradient(180deg, #2a3550 0%, #1a2540 100%)',
                    border: '2px solid #0f1419',
                    color: '#ff0088',
                    textShadow: '0 0 8px #ff0088',
                    boxShadow: 'inset 0 -4px 0 0 rgba(0, 0, 0, 0.5), inset 0 4px 0 0 rgba(255, 255, 255, 0.1), 0 4px 0 0 #0f1419'
                  }}
                >
                  AI SUMMARY
                </a>

                <a
                  href="/favorites"
                  onClick={handleNavClick}
                  className={`block w-full text-center py-4 px-6 mb-3 text-[10px] font-['Press_Start_2P'] tracking-wider transition-all duration-100 hover:translate-y-0.5 active:translate-y-1`}
                  style={{
                    background: pathname === '/favorites' ? 'linear-gradient(180deg, #3f4961 0%, #545d72 100%)' : 'linear-gradient(180deg, #2a3550 0%, #1a2540 100%)',
                    border: '2px solid #ffff00',
                    color: '#ffff00',
                    textShadow: '0 0 8px #ffff00',
                    boxShadow: 'inset 0 -4px 0 0 rgba(255, 255, 0, 0.3), inset 0 4px 0 0 rgba(255, 255, 255, 0.1), 0 4px 0 0 #0f1419'
                  }}
                >
                  ★ FAV
                </a>
              </div>

              {/* Auth Section */}
              <div style={{
                borderTop: '2px solid var(--retro-cyan)',
                paddingTop: '16px'
              }}>
                <SignedOut>
                  <a
                    href="/sign-in"
                    onClick={handleNavClick}
                    className="block w-full text-center py-4 px-6 text-[10px] font-['Press_Start_2P'] tracking-wider transition-all duration-100 hover:translate-y-0.5 active:translate-y-1"
                    style={{
                      border: '2px solid #ff0088',
                      background: 'transparent',
                      color: '#ff0088',
                      textShadow: '0 0 8px #ff0088',
                      boxShadow: 'inset 0 -4px 0 0 rgba(255, 0, 136, 0.2), inset 0 4px 0 0 rgba(255, 255, 255, 0.1), 0 4px 0 0 #0f1419'
                    }}
                  >
                    SIGN IN
                  </a>
                </SignedOut>
                <SignedIn>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="block w-full text-center py-4 px-6 text-[10px] font-['Press_Start_2P'] tracking-wider transition-all duration-100 hover:translate-y-0.5 active:translate-y-1 cursor-pointer"
                    style={{
                      border: '2px solid #ff0088',
                      background: 'linear-gradient(180deg, #ff0088 0%, #cc0066 100%)',
                      color: '#ffffff',
                      textShadow: '0 0 8px #000000, 2px 2px 0 rgba(0, 0, 0, 0.5)',
                      boxShadow: 'inset 0 -4px 0 0 rgba(0, 0, 0, 0.5), inset 0 4px 0 0 rgba(255, 255, 255, 0.2), 0 4px 0 0 #0f1419'
                    }}
                  >
                    LOGOUT
                  </button>
                </SignedIn>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div style={{
              background: 'var(--retro-bg)',
              padding: '8px 16px',
              borderTop: '3px solid var(--retro-cyan)',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '8px',
              color: 'var(--retro-cyan)',
              fontWeight: 'bold'
            }}>
              <span>MENU: MOBILE</span>
              <span style={{ animation: 'blink 1s infinite' }}>● ACTIVE</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}