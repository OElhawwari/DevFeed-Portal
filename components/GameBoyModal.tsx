'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useUser } from '@clerk/nextjs';
import { useFavorites } from '@/store/useFavorites';
import { soundManager } from '@/utils/soundEffects';

interface GameBoyModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  type: 'github' | 'devto';
}

export default function GameBoyModal({ isOpen, onClose, item, type }: GameBoyModalProps) {
  const [mounted, setMounted] = useState(false);
  const [showAuthError, setShowAuthError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savingAction, setSavingAction] = useState<'adding' | 'removing' | null>(null);
  const { isSignedIn } = useUser();
  const { add, remove, has } = useFavorites();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      soundManager.playModalOpen();
    } else {
      document.body.style.overflow = 'unset';
      soundManager.playModalClose();
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !item || !mounted) return null;

  
  const getItemId = () => {
    if (type === 'github') return String(item.id);
    if (type === 'devto') return String(item.id); 
    return String(item.id);
  };

  
  const getItemTitle = () => {
    if (type === 'github') return item.name;
    if (type === 'devto') return item.title;
    return '';
  };

  
  const getItemUrl = () => {
    if (type === 'github') return item.url || item.html_url;
    if (type === 'devto') return item.url;
    return '';
  };

  const itemId = getItemId();
  const isFavorited = has(itemId);

  
  const handleFavoriteToggle = async () => {
    
    if (!isSignedIn) {
      setShowAuthError(true);
      soundManager.playError();
      return;
    }

    
    const action = isFavorited ? 'removing' : 'adding';
    setSavingAction(action);
    setIsSaving(true);

    try {
      
      if (action === 'removing') {
        await remove(itemId);
        soundManager.playFavoriteRemove();
      } else {
        
        await add({
          id: itemId,
          title: getItemTitle(),
          url: getItemUrl(),
          kind: type
        });
        soundManager.playFavoriteAdd();
      }
      
      setTimeout(() => {
        setIsSaving(false);
        setSavingAction(null);
      }, 500);
    } catch (error) {
      setIsSaving(false);
      setSavingAction(null);
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'github':
        return (
          <>
            <div className="text-sm font-bold mb-3" style={{
              color: 'var(--retro-primary)',
              textShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)'
            }}>
              {item.name}
            </div>
            <div className="text-[9px] mb-2" style={{
              color: 'var(--retro-cyan)'
            }}>
              by {item.author}
            </div>
            <div className="text-[10px] leading-[1.6] mb-3 text-[#1a1a1a] max-h-[120px] overflow-y-auto">
              {item.description}
            </div>
            <div className="flex gap-4 mb-3 text-[9px]">
              <div className="bg-black/10 px-2 py-1 border-2 border-black/20">
                ⭐ {item.stars}
              </div>
              <div className="bg-black/10 px-2 py-1 border-2 border-black/20">
                🔱 {item.forks}
              </div>
              {item.language && (
                <div className="bg-black/10 px-2 py-1 border-2 border-black/20">
                  {item.language}
                </div>
              )}
            </div>
          </>
        );
      case 'devto':
        return (
          <>
            <div className="text-sm font-bold mb-3" style={{
              color: 'var(--retro-primary)',
              textShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)'
            }}>
              {item.title}
            </div>
            <div className="text-[9px] mb-2" style={{
              color: 'var(--retro-cyan)'
            }}>
              by {item.user?.name || 'Unknown'}
            </div>
            <div className="text-[10px] leading-[1.6] mb-3 text-[#1a1a1a] max-h-[120px] overflow-y-auto">
              {item.description || 'No description available'}
            </div>
            <div className="flex gap-4 mb-3 text-[9px]">
              <div className="bg-black/10 px-2 py-1 border-2 border-black/20">
                ❤️ {item.public_reactions_count || 0}
              </div>
              <div className="bg-black/10 px-2 py-1 border-2 border-black/20">
                💬 {item.comments_count || 0}
              </div>
            </div>
          </>
        );
    }
  };

  const modalContent = (
    <div
      onClick={onClose}
      className="gameboy-modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-black/90 flex items-center justify-center z-[999999] p-5 backdrop-blur-[8px]"
    >
      
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90vw] max-w-[400px] sm:w-[400px] rounded-[12px_12px_60px_12px] p-4 sm:p-6 relative border-8 border-[#989880]"
        style={{
          background: 'linear-gradient(135deg, #e8e8d0 0%, #d0d0b8 100%)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 0 0 4px #a8a890, inset 0 0 0 8px #c8c8b0'
        }}
      >
        
        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#606050] tracking-[2px]">
          DEVFEED BOY
        </div>

        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 rounded-full border-[3px] border-[#882858] cursor-pointer flex items-center justify-center text-base font-bold text-[#2a2a28] transition-all duration-100 font-[Arial,sans-serif] leading-none"
          style={{
            background: 'linear-gradient(135deg, #c84b8a 0%, #a83b7a 100%)',
            boxShadow: '0 3px 0 #882858, inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 2px rgba(255, 255, 255, 0.2)'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.4)';
            e.currentTarget.style.transform = 'translateY(2px)';
            soundManager.playButtonPress();
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.boxShadow = '0 3px 0 #882858, inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 2px rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onMouseEnter={() => soundManager.playButtonHover()}
          aria-label="Close"
        >
          ✕
        </button>

        
        <div className="absolute top-3 right-12 w-2 h-2 rounded-full bg-[#ff0044] animate-[blink_2s_infinite]" style={{
          boxShadow: '0 0 8px #ff0044, inset -2px -2px 4px rgba(0, 0, 0, 0.3)'
        }} />

        
        <div className="p-3 rounded-lg mb-5 mt-6" style={{
          background: 'linear-gradient(135deg, #606050 0%, #404038 100%)',
          boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.4), inset -2px -2px 4px rgba(255, 255, 255, 0.1)'
        }}>
          
          <div className="min-h-[280px] p-4 rounded border-2 border-[#0f380f] relative overflow-y-auto max-h-[320px]" style={{
            background: 'linear-gradient(135deg, #9bbc0f 0%, #8bac0f 100%)',
            boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.2)'
          }}>
            
            <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{
              background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0, 0, 0, 0.05) 2px, rgba(0, 0, 0, 0.05) 4px)'
            }} />

            
            <div className="relative z-[1]">
              {renderContent()}

              
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    soundManager.playButtonPress();
                    window.open(item.url || item.html_url, '_blank');
                  }}
                  className="flex-1 px-3 py-2 bg-black/30 border-[3px] border-black/40 text-[#1a1a1a] text-[9px] font-bold cursor-pointer transition-all duration-100"
                  style={{
                    boxShadow: 'inset -2px -2px 0 rgba(0, 0, 0, 0.2), inset 2px 2px 0 rgba(255, 255, 255, 0.2)'
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.boxShadow = 'inset 2px 2px 0 rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.transform = 'translate(1px, 1px)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.boxShadow = 'inset -2px -2px 0 rgba(0, 0, 0, 0.2), inset 2px 2px 0 rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translate(0, 0)';
                  }}
                  onMouseEnter={() => soundManager.playButtonHover()}
                >
                  OPEN ▸
                </button>
                <button
                  onClick={handleFavoriteToggle}
                  disabled={isSaving}
                  className={`px-4 py-2 border-[3px] text-[9px] font-bold transition-all duration-100 ${
                    (!isSignedIn || isSaving) 
                      ? 'opacity-50 cursor-not-allowed text-[#666666]' 
                      : 'cursor-pointer text-[#1a1a1a]'
                  }`}
                  style={{
                    background: !isSignedIn
                      ? 'rgba(100, 100, 100, 0.3)'
                      : isSaving
                        ? 'rgba(100, 100, 100, 0.3)'
                        : isFavorited 
                          ? 'rgba(255, 215, 0, 0.5)' 
                          : 'rgba(0, 0, 0, 0.3)',
                    borderColor: !isSignedIn
                      ? 'rgba(150, 150, 150, 0.4)'
                      : isSaving
                        ? 'rgba(150, 150, 150, 0.4)'
                        : isFavorited 
                          ? 'rgba(255, 215, 0, 0.8)' 
                          : 'rgba(0, 0, 0, 0.4)',
                    boxShadow: (!isSignedIn || isSaving)
                      ? 'inset 2px 2px 4px rgba(0, 0, 0, 0.3)'
                      : isFavorited
                        ? 'inset -2px -2px 0 rgba(255, 215, 0, 0.3), inset 2px 2px 0 rgba(255, 255, 255, 0.4), 0 0 8px rgba(255, 215, 0, 0.4)'
                        : 'inset -2px -2px 0 rgba(0, 0, 0, 0.2), inset 2px 2px 0 rgba(255, 255, 255, 0.2)'
                  }}
                  onMouseDown={(e) => {
                    if (!isSignedIn || isSaving) return;
                    e.currentTarget.style.boxShadow = 'inset 2px 2px 0 rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.transform = 'translate(1px, 1px)';
                    soundManager.playButtonPress();
                  }}
                  onMouseUp={(e) => {
                    if (!isSignedIn || isSaving) return;
                    const newBoxShadow = isFavorited
                      ? 'inset -2px -2px 0 rgba(255, 215, 0, 0.3), inset 2px 2px 0 rgba(255, 255, 255, 0.4), 0 0 8px rgba(255, 215, 0, 0.4)'
                      : 'inset -2px -2px 0 rgba(0, 0, 0, 0.2), inset 2px 2px 0 rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.boxShadow = newBoxShadow;
                    e.currentTarget.style.transform = 'translate(0, 0)';
                  }}
                  onMouseEnter={() => {
                    if (!isSignedIn || isSaving) return;
                    soundManager.playButtonHover();
                  }}
                >
                  {!isSignedIn ? '🔒 FAV' : isSaving ? '⏳ SAVING...' : (isFavorited ? '★ SAVED' : '☆ FAV')}
                </button>
              </div>
            </div>
          </div>
        </div>

        
        <div className="flex justify-between items-center mb-4">
          
          <div className="relative w-20 h-20">
            
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-6 h-20 bg-[#2a2a28]" style={{
              boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.3)'
            }} />
            
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-20 h-6 bg-[#2a2a28]" style={{
              boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.3)'
            }} />
          </div>

          
          <div className="flex gap-3 items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-[#2a2a28] cursor-pointer"
            onClick={onClose}
            style={{
              background: 'linear-gradient(135deg, #c84b8a 0%, #a83b7a 100%)',
              boxShadow: '0 4px 0 #882858, inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 2px rgba(255, 255, 255, 0.2)'
            }}>
              B
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-[#2a2a28]" style={{
              background: 'linear-gradient(135deg, #c84b8a 0%, #a83b7a 100%)',
              boxShadow: '0 4px 0 #882858, inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 2px rgba(255, 255, 255, 0.2)'
            }}>
              A
            </div>
          </div>
        </div>

        
        <div className="flex gap-3 justify-center mb-2">
          <div className="w-[60px] h-3 bg-[#606050] rounded-md relative" style={{
            boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] text-[#606050] font-bold">SELECT</div>
          </div>
          <div className="w-[60px] h-3 bg-[#606050] rounded-md relative cursor-pointer" style={{
            boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.3)'
          }}
          onClick={onClose}
          >
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] text-[#606050] font-bold">START</div>
          </div>
        </div>

        
        <div className="absolute bottom-5 right-6 flex gap-[3px]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-[3px] h-6 bg-[#a8a890] rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  );

  
  const errorModal = showAuthError && (
    <div
      onClick={() => setShowAuthError(false)}
      className="gameboy-modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-black/95 flex items-center justify-center z-[9999999] p-5 backdrop-blur-[10px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90vw] max-w-[500px] sm:w-full p-0 relative border-[6px] border-[#ff0044]"
        style={{
          background: 'linear-gradient(135deg, #2a3550 0%, #1a2540 100%)',
          boxShadow: '0 0 0 4px var(--retro-bg), 0 0 30px rgba(255, 0, 68, 0.6), inset 0 0 20px rgba(255, 0, 68, 0.1), 12px 12px 0 0 rgba(0, 0, 0, 0.8)'
        }}
      >
        
        <div className="px-4 py-3 flex items-center justify-between" style={{
          background: 'linear-gradient(90deg, #ff0044 0%, #cc0033 100%)',
          borderBottom: '4px solid var(--retro-bg)'
        }}>
          <div className="text-[11px] font-bold text-white tracking-[2px]" style={{
            textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)'
          }}>
            ACCESS_DENIED.EXE
          </div>
          <button
            onClick={() => setShowAuthError(false)}
            className="bg-black/30 border-2 border-white/30 text-white w-6 h-6 cursor-pointer text-sm flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        
        <div className="px-8 py-10">
          
          <div className="text-[64px] text-center mb-6 animate-[blink_1s_infinite] text-red-500">
            404
          </div>

          
          <div className="text-center">
            <p className="text-base font-bold text-[#ff0044] mb-4 tracking-[2px]" style={{
              textShadow: '0 0 10px rgba(255, 0, 68, 0.5), 2px 2px 0 rgba(0, 0, 0, 0.5)'
            }}>
              ERROR: NOT LOGGED IN
            </p>

            <div className="bg-black/30 border-[3px] border-[rgba(255,0,68,0.3)] p-4 mb-6 font-mono">
              <p className="text-[11px] leading-[1.8] m-0" style={{
                color: 'var(--retro-primary)'
              }}>
                YOU MUST BE SIGNED IN<br />
                TO SAVE FAVORITES!<br /><br />
                PLEASE LOG IN TO CONTINUE...
              </p>
            </div>

            <p className="text-[9px] mt-4 leading-[1.6]" style={{
              color: 'var(--retro-cyan)',
              textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'
            }}>
              ERROR CODE: 0x404_AUTH_REQUIRED<br />
              PRESS ANY BUTTON TO DISMISS
            </p>
          </div>

          
          <div className="flex gap-3 mt-6 justify-center">
            <button
              onClick={() => {
                setShowAuthError(false);
                window.location.href = '/sign-in';
              }}
              className="px-6 py-3 border-4 text-white text-[10px] font-bold cursor-pointer transition-all duration-100 tracking-wider"
              style={{
                background: 'linear-gradient(180deg, var(--retro-secondary) 0%, var(--retro-magenta) 100%)',
                borderColor: 'var(--retro-bg)',
                boxShadow: 'inset 0 -4px 0 0 rgba(0, 0, 0, 0.3), inset 0 4px 0 0 rgba(255, 255, 255, 0.2), 0 4px 0 0 #0f1419',
                textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(4px)';
                e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.5)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'inset 0 -4px 0 0 rgba(0, 0, 0, 0.3), inset 0 4px 0 0 rgba(255, 255, 255, 0.2), 0 4px 0 0 #0f1419';
              }}
            >
              ▸ SIGN IN NOW
            </button>

            <button
              onClick={() => setShowAuthError(false)}
              className="px-6 py-3 border-4 text-white text-[10px] font-bold cursor-pointer transition-all duration-100 tracking-wider"
              style={{
                background: 'linear-gradient(180deg, #555555 0%, #333333 100%)',
                borderColor: 'var(--retro-bg)',
                boxShadow: 'inset 0 -4px 0 0 rgba(0, 0, 0, 0.3), inset 0 4px 0 0 rgba(255, 255, 255, 0.2), 0 4px 0 0 #0f1419',
                textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(4px)';
                e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.5)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'inset 0 -4px 0 0 rgba(0, 0, 0, 0.3), inset 0 4px 0 0 rgba(255, 255, 255, 0.2), 0 4px 0 0 #0f1419';
              }}
            >
              ◀ CANCEL
            </button>
          </div>
        </div>

        
        <div className="px-4 py-2 border-t-[3px] border-[#ff0044] flex justify-between text-[8px] text-[#ff0044] font-bold" style={{
          background: 'var(--retro-bg)'
        }}>
          <span>STATUS: UNAUTHORIZED</span>
          <span className="animate-[blink_1s_infinite]">● AUTH REQUIRED</span>
        </div>
      </div>
    </div>
  );

  
  const addingModal = isSaving && savingAction === 'adding' && (
    <div className="gameboy-modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-black/95 flex items-center justify-center z-[9999999] backdrop-blur-[10px]">
      <div className="text-center relative">
        
        <div className="p-0 w-[90vw] max-w-[400px] sm:min-w-[400px] border-[6px]" style={{
          background: 'linear-gradient(135deg, #2a3550 0%, #1a2540 100%)',
          borderColor: 'var(--retro-tertiary)',
          boxShadow: '0 0 0 4px var(--retro-bg), 0 0 30px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(255, 215, 0, 0.1), 12px 12px 0 0 rgba(0, 0, 0, 0.8)'
        }}>
          
          <div className="px-4 py-3 flex items-center justify-center" style={{
            background: 'linear-gradient(90deg, var(--retro-tertiary) 0%, var(--retro-secondary) 100%)',
            borderBottom: '4px solid var(--retro-bg)'
          }}>
            <div className="text-[11px] font-bold text-white tracking-[2px]" style={{
              textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)'
            }}>
              ADD_FAVORITE.EXE
            </div>
          </div>

          
          <div className="px-8 py-12">
            
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="w-full h-full border-8 border-[rgba(255,215,0,0.2)] rounded-full animate-[spin_1s_linear_infinite]" style={{
                borderTopColor: 'var(--retro-tertiary)'
              }} />
              
            </div>

            
            <div className="text-sm font-bold mb-3 tracking-[2px] animate-[blink_0.8s_infinite]" style={{
              color: 'var(--retro-tertiary)',
              textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)'
            }}>
              ADDING TO FAVORITES...
            </div>

            
            <div className="w-full h-6 bg-black/30 border-[3px] overflow-hidden relative" style={{
              borderColor: 'var(--retro-accent)',
              boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              <div className="h-full bg-[length:200%_100%] animate-[loading-bar_1.5s_linear_infinite]" style={{
                background: 'linear-gradient(90deg, var(--retro-tertiary) 0%, var(--retro-secondary) 50%, var(--retro-tertiary) 100%)',
                boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
              }} />
            </div>

            
            <div className="text-[9px] mt-4 leading-[1.8]" style={{
              color: 'var(--retro-primary)',
              textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'
            }}>
              SAVING TO DATABASE...<br />
              SYNCING TO FIRESTORE...<br />
              PLEASE WAIT...
            </div>
          </div>

          
          <div className="px-4 py-2 border-t-[3px] flex justify-between text-[8px] font-bold" style={{
            background: 'var(--retro-bg)',
            borderTopColor: 'var(--retro-tertiary)',
            color: 'var(--retro-tertiary)'
          }}>
            <span>PROCESS: ADD</span>
            <span className="animate-[blink_1s_infinite]">● ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );

  
  const removingModal = isSaving && savingAction === 'removing' && (
    <div className="gameboy-modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-black/95 flex items-center justify-center z-[9999999] backdrop-blur-[10px]">
      <div className="text-center relative">
        
        <div className="p-0 w-[90vw] max-w-[400px] sm:min-w-[400px] border-[6px] border-[#ff6b35]" style={{
          background: 'linear-gradient(135deg, #2a3550 0%, #1a2540 100%)',
          boxShadow: '0 0 0 4px var(--retro-bg), 0 0 30px rgba(255, 107, 53, 0.6), inset 0 0 20px rgba(255, 107, 53, 0.1), 12px 12px 0 0 rgba(0, 0, 0, 0.8)'
        }}>
          
          <div className="px-4 py-3 flex items-center justify-center" style={{
            background: 'linear-gradient(90deg, #ff6b35 0%, #f7931e 100%)',
            borderBottom: '4px solid var(--retro-bg)'
          }}>
            <div className="text-[11px] font-bold text-white tracking-[2px]" style={{
              textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)'
            }}>
              REMOVE_FAVORITE.EXE
            </div>
          </div>

          
          <div className="px-8 py-12">
            
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="w-full h-full border-8 border-[rgba(255,107,53,0.2)] rounded-full animate-[spin_1s_linear_infinite]" style={{
                borderTopColor: '#ff6b35'
              }} />
              
            </div>

            
            <div className="text-sm text-[#ff6b35] font-bold mb-3 tracking-[2px] animate-[blink_0.8s_infinite]" style={{
              textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)'
            }}>
              REMOVING FROM FAVORITES...
            </div>

            
            <div className="w-full h-6 bg-black/30 border-[3px] overflow-hidden relative" style={{
              borderColor: 'var(--retro-accent)',
              boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              <div className="h-full bg-[length:200%_100%] animate-[loading-bar_1.5s_linear_infinite]" style={{
                background: 'linear-gradient(90deg, #ff6b35 0%, #f7931e 50%, #ff6b35 100%)',
                boxShadow: '0 0 10px rgba(255, 107, 53, 0.5)'
              }} />
            </div>

            
            <div className="text-[9px] mt-4 leading-[1.8]" style={{
              color: 'var(--retro-primary)',
              textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'
            }}>
              REMOVING FROM DATABASE...<br />
              SYNCING TO FIRESTORE...<br />
              PLEASE WAIT...
            </div>
          </div>

          
          <div className="px-4 py-2 border-t-[3px] border-[#ff6b35] flex justify-between text-[8px] text-[#ff6b35] font-bold" style={{
            background: 'var(--retro-bg)'
          }}>
            <span>PROCESS: REMOVE</span>
            <span className="animate-[blink_1s_infinite]">● ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {createPortal(modalContent, document.body)}
      {errorModal && createPortal(errorModal, document.body)}
      {addingModal && createPortal(addingModal, document.body)}
      {removingModal && createPortal(removingModal, document.body)}
    </>
  );
}

