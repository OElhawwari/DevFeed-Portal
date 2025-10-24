'use client'
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs';
import { useFavorites } from '@/store/useFavorites'

export default function UserFavorites() {
  const { isSignedIn } = useUser();
  const items = useFavorites(s => s.items);
  const loading = useFavorites(s => s.loading);
  const load = useFavorites(s => s.load);
  const remove = useFavorites(s => s.remove);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string | number, title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  
  useEffect(() => {
    if (isSignedIn) {
      load();
    }
  }, [isSignedIn, load]);

  
  const handleDelete = async () => {
    if (!confirmDelete) return;
    
    setIsDeleting(true);
    try {
      await remove(String(confirmDelete.id));
      
      setTimeout(() => {
        setIsDeleting(false);
        setConfirmDelete(null);
      }, 500);
    } catch (error) {
      setIsDeleting(false);
      setConfirmDelete(null);
    }
  };
  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      <div className="retro-window mb-4 sm:mb-6 md:mb-8" style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 0, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)'
      }}>
        <div className="retro-titlebar" style={{ background: 'linear-gradient(90deg, var(--retro-tertiary) 0%, var(--retro-magenta) 100%)' }}>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-[7px] sm:text-[8px] md:text-[10px]">LEVEL_4_FAVORITES.SAV</span>
          </div>
          <div className="flex gap-1 sm:gap-1.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 border-2 text-[5px] sm:text-[6px] md:text-[8px] cursor-pointer" style={{ background: 'var(--retro-cyan)', borderColor: 'var(--retro-bg)', boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.3)' }}>_</div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 border-2 text-[5px] sm:text-[6px] md:text-[8px] cursor-pointer" style={{ background: 'var(--retro-primary)', borderColor: 'var(--retro-bg)', boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.3)' }}>□</div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 border-2 text-[5px] sm:text-[6px] md:text-[8px] cursor-pointer" style={{ background: 'var(--retro-secondary)', borderColor: 'var(--retro-bg)', boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.3)' }}>X</div>
          </div>
        </div>
        <div className="p-3 sm:p-4 md:p-6 text-center">
          <h1 className="text-xs sm:text-sm md:text-base font-bold tracking-[1px] sm:tracking-[2px] md:tracking-[3px] mb-1 sm:mb-2 md:mb-3 animate-[coin_0.6s_ease-in-out]" style={{
            color: 'var(--retro-text)',
            textShadow: '1px 1px 0 rgba(0, 0, 0, 0.8), 2px 2px 0 var(--retro-tertiary)'
          }}>
            ▶ YOUR FAVORITES ◀
          </h1>
          <p className="text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.5px] sm:tracking-[1px] md:tracking-[2px] font-bold mb-1 sm:mb-2 md:mb-3" style={{
            color: 'var(--retro-tertiary)',
            textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'
          }}>
            LEVEL 4: SAVE POINTS
          </p>
          <div className="retro-status text-[5px] sm:text-[6px] md:text-[8px]">
            <span>LOCATION: /FAVORITES</span>
            <span>LEVEL: 4</span>
            <span>SAVED: {items.length}</span>
          </div>
        </div>
      </div>

      <SignedOut>
        <div className="retro-alert flex flex-col items-center gap-3 md:gap-4 p-4 md:p-6">
          <p className="text-[8px] md:text-[10px] leading-[1.6] md:leading-[1.8] font-bold text-center" style={{
            color: 'var(--retro-bg)'
          }}>
            ACCESS DENIED!<br />
            PLEASE SIGN IN TO SYNC FAVORITES ACROSS DEVICES
          </p>
          <SignInButton>
            <button className="pixel-btn text-[8px] md:text-[10px] px-3 py-2 md:px-4 md:py-3" style={{
              borderColor: 'var(--retro-secondary)',
              color: 'var(--retro-bg)',
              background: 'linear-gradient(135deg, var(--retro-secondary), var(--retro-magenta))',
              boxShadow: 'inset -2px -2px 0 0 rgba(0, 0, 0, 0.3), inset 2px 2px 0 0 rgba(255, 255, 255, 0.3), 3px 3px 0 0 rgba(0, 0, 0, 0.7)'
            }}>
              ▶ SIGN IN NOW ◀
            </button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        {loading ? (
          <div className="retro-window" style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 255, 0.1) 100%)'
          }}>
            <div className="retro-titlebar" style={{ background: 'linear-gradient(90deg, var(--retro-cyan) 0%, var(--retro-primary) 100%)' }}>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-[7px] sm:text-[8px] md:text-[10px]">LOADING.EXE</span>
              </div>
            </div>
            <div className="py-8 md:py-12 px-4 md:px-6 text-center">
              <p className="text-[8px] md:text-[10px] tracking-wider font-bold" style={{
                color: 'var(--retro-primary)',
                textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'
              }}>
                LOADING FAVORITES...<br />PLEASE WAIT...
              </p>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="retro-window" style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 255, 0.1) 100%)'
          }}>
            <div className="retro-titlebar" style={{ background: 'linear-gradient(90deg, var(--retro-cyan) 0%, var(--retro-primary) 100%)' }}>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-[7px] sm:text-[8px] md:text-[10px]">INFORMATION.MSG</span>
              </div>
            </div>
            <div className="p-4 md:p-6 text-center">
              <p className="text-[8px] md:text-[10px] tracking-wider font-bold" style={{
                color: 'var(--retro-primary)',
                textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'
              }}>
                NO FAVORITES YET.<br />START COLLECTING!
              </p>
            </div>
            <div className="retro-status text-[5px] sm:text-[6px] md:text-[8px]">
              <span>ITEMS: 0</span>
              <span>STATUS: EMPTY</span>
              <span>READY</span>
            </div>
          </div>
        ) : (
          <div className="retro-window">
            <div className="retro-titlebar" style={{ background: 'linear-gradient(90deg, var(--retro-tertiary) 0%, var(--retro-magenta) 100%)' }}>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-[7px] sm:text-[8px] md:text-[10px]">FAVORITES.LST</span>
              </div>
            </div>
            <div className="p-2 sm:p-3 md:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5 sm:gap-2 md:gap-3">
                {items.map((f, idx) => (
                  <div key={String(f.id)} className="retro-window p-2 sm:p-3" style={{
                    background: idx % 2 === 0
                      ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(0, 255, 255, 0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(255, 0, 136, 0.05) 0%, rgba(255, 0, 255, 0.05) 100%)',
                  }}>
                    {/* Mobile Layout - Stacked */}
                    <div className="flex flex-col sm:hidden gap-2">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setConfirmDelete({ id: f.id, title: f.title || f.url })}
                          className="w-4 h-4 border-2 cursor-pointer flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0 transition-all duration-100 font-[Arial,sans-serif]"
                          style={{
                            background: f.kind === 'github' ? 'var(--retro-primary)' : f.kind === 'devto' ? 'var(--retro-tertiary)' : 'var(--retro-secondary)',
                            borderColor: 'var(--retro-bg)',
                            boxShadow: '1px 1px 0 0 rgba(0, 0, 0, 0.5)'
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.boxShadow = 'inset 1px 1px 2px rgba(0, 0, 0, 0.4)';
                            e.currentTarget.style.transform = 'translateY(1px)';
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.boxShadow = '0 2px 0 #880022, inset -1px -1px 2px rgba(0, 0, 0, 0.3), inset 1px 1px 1px rgba(255, 255, 255, 0.2)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                          aria-label="Delete"
                        >
                          ✕
                        </button>
                        <span className="text-[6px] text-white px-1.5 py-0.5 border-[1px] font-bold whitespace-nowrap" style={{
                          borderColor: 'var(--retro-text)',
                          background: 'linear-gradient(135deg, var(--retro-secondary), var(--retro-magenta))',
                          boxShadow: '1px 1px 0 0 rgba(0, 0, 0, 0.5)'
                        }}>
                          [{f.kind}]
                        </span>
                      </div>
                      <a
                        href={f.url}
                        target="_blank"
                        className="text-[7px] font-bold leading-tight break-words" 
                        style={{
                          color: 'var(--retro-tertiary)',
                          textShadow: '1px 1px 0 rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        ▸ {f.title || f.url}
                      </a>
                    </div>

                    {/* Desktop Layout - Horizontal */}
                    <div className="hidden sm:flex items-center justify-between gap-2">
                      <button
                        onClick={() => setConfirmDelete({ id: f.id, title: f.title || f.url })}
                        className="w-5 h-5 md:w-6 md:h-6 border-2 cursor-pointer flex items-center justify-center text-[10px] md:text-xs font-bold text-white flex-shrink-0 transition-all duration-100 font-[Arial,sans-serif]"
                        style={{
                          background: f.kind === 'github' ? 'var(--retro-primary)' : f.kind === 'devto' ? 'var(--retro-tertiary)' : 'var(--retro-secondary)',
                          borderColor: 'var(--retro-bg)',
                          boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.5)'
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.4)';
                          e.currentTarget.style.transform = 'translateY(2px)';
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.boxShadow = '0 3px 0 #880022, inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 2px rgba(255, 255, 255, 0.2)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        aria-label="Delete"
                      >
                        ✕
                      </button>
                      
                      <a
                        href={f.url}
                        target="_blank"
                        className="truncate text-[8px] md:text-[9px] flex-1 font-bold"
                        style={{
                          color: 'var(--retro-tertiary)',
                          textShadow: '1px 1px 0 rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        ▸ {f.title || f.url}
                      </a>
                      <span className="text-[7px] md:text-[8px] text-white px-2 md:px-2.5 py-1 border-[2px] md:border-[3px] font-bold whitespace-nowrap flex-shrink-0" style={{
                        borderColor: 'var(--retro-text)',
                        background: 'linear-gradient(135deg, var(--retro-secondary), var(--retro-magenta))',
                        boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.5)'
                      }}>
                        [{f.kind}]
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="retro-status text-[5px] sm:text-[6px] md:text-[8px]">
              <span>TOTAL: {items.length}</span>
              <span>TYPE: MIXED</span>
              <span>✓ SAVED</span>
            </div>
          </div>
        )}
      </SignedIn>

      
      {confirmDelete && mounted && createPortal(
        <div
          onClick={() => setConfirmDelete(null)}
          className="gameboy-modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            padding: '20px',
            backdropFilter: 'blur(8px)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[90vw] max-w-[500px] sm:w-full"
            style={{
              background: 'linear-gradient(135deg, #2a3550 0%, #1a2540 100%)',
              border: '6px solid var(--retro-secondary)',
              boxShadow: '0 0 0 4px var(--retro-bg), 0 0 20px rgba(255, 0, 136, 0.5), inset 0 0 20px rgba(255, 0, 136, 0.1), 12px 12px 0 0 rgba(0, 0, 0, 0.8)',
              padding: '0',
              position: 'relative'
            }}
          >
            
            <div style={{
              background: 'linear-gradient(90deg, var(--retro-secondary) 0%, var(--retro-magenta) 100%)',
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
                CONFIRM_DELETE.EXE
              </div>
              <button
                onClick={() => setConfirmDelete(null)}
                style={{
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  border: '2px solid var(--retro-bg)',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: 'var(--retro-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Arial, sans-serif',
                  boxShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)'
                }}
              >
                ✕
              </button>
            </div>

            
            <div className="p-6 md:p-8">
              
              <div className="text-center mb-4 md:mb-6">
                <p className="text-[10px] md:text-[12px] font-bold mb-2 md:mb-3" style={{
                  color: 'var(--retro-tertiary)',
                  textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)',
                  letterSpacing: '1px'
                }}>
                  DELETE FAVORITE?
                </p>
                <div className="bg-black/30 border-[2px] md:border-[3px] border-retro-accent p-3 md:p-4 mb-3 md:mb-4" style={{
                  boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}>
                  <p className="text-[8px] md:text-[9px] font-bold break-words leading-[1.4] md:leading-[1.6]" style={{
                    color: 'var(--retro-primary)'
                  }}>
                    {confirmDelete.title}
                  </p>
                </div>
                <p className="text-[8px] md:text-[10px] leading-[1.6] md:leading-[1.8]" style={{
                  color: 'var(--retro-text)',
                  textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'
                }}>
                  THIS ACTION CANNOT BE UNDONE!<br />
                  ARE YOU SURE?
                </p>
              </div>

              
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 md:px-6 md:py-3 text-[8px] md:text-[10px] font-bold transition-all duration-100"
                  style={{
                    background: isDeleting 
                      ? 'linear-gradient(135deg, #666666 0%, #444444 100%)' 
                      : 'linear-gradient(135deg, #ff0044 0%, #cc0033 100%)',
                    border: '3px solid #880022',
                    color: 'white',
                    cursor: isDeleting ? 'not-allowed' : 'pointer',
                    letterSpacing: '1px',
                    boxShadow: '0 3px 0 #880022, inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 2px rgba(255, 255, 255, 0.2)',
                    textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)',
                    opacity: isDeleting ? 0.6 : 1
                  }}
                  onMouseDown={(e) => {
                    if (isDeleting) return;
                    e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.4)';
                    e.currentTarget.style.transform = 'translateY(2px)';
                  }}
                  onMouseUp={(e) => {
                    if (isDeleting) return;
                    e.currentTarget.style.boxShadow = '0 3px 0 #880022, inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 2px rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {isDeleting ? 'DELETING...' : 'YES, DELETE ✕'}
                </button>
                <button
                  onClick={() => setConfirmDelete(null)}
                  disabled={isDeleting}
                  className="px-4 py-2 md:px-6 md:py-3 text-[8px] md:text-[10px] font-bold transition-all duration-100"
                  style={{
                    background: isDeleting
                      ? 'linear-gradient(135deg, #666666 0%, #444444 100%)'
                      : 'linear-gradient(135deg, var(--retro-primary) 0%, #00cc66 100%)',
                    border: '3px solid #008844',
                    color: 'var(--retro-bg)',
                    cursor: isDeleting ? 'not-allowed' : 'pointer',
                    letterSpacing: '1px',
                    boxShadow: '0 3px 0 #008844, inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 2px rgba(255, 255, 255, 0.2)',
                    textShadow: '1px 1px 0 rgba(0, 0, 0, 0.3)',
                    opacity: isDeleting ? 0.6 : 1
                  }}
                  onMouseDown={(e) => {
                    if (isDeleting) return;
                    e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.4)';
                    e.currentTarget.style.transform = 'translateY(2px)';
                  }}
                  onMouseUp={(e) => {
                    if (isDeleting) return;
                    e.currentTarget.style.boxShadow = '0 3px 0 #008844, inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 2px rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  NO, CANCEL ◀
                </button>
              </div>
            </div>

            
            <div className="bg-retro-bg px-4 py-2 border-t-[3px] border-retro-secondary flex justify-between text-[6px] md:text-[8px] text-retro-tertiary font-bold">
              <span>ACTION: DELETE</span>
              <span className="animate-[blink_1s_infinite]">WARNING</span>
            </div>
          </div>
        </div>,
        document.body
      )}

      
      {isDeleting && mounted && createPortal(
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
            zIndex: 9999999,
            backdropFilter: 'blur(10px)'
          }}
        >
          <div style={{
            textAlign: 'center',
            position: 'relative'
          }}>
            
            <div className="w-[90vw] max-w-[400px] sm:min-w-[400px]" style={{
              background: 'linear-gradient(135deg, #2a3550 0%, #1a2540 100%)',
              border: '6px solid #ff6b35',
              boxShadow: '0 0 0 4px var(--retro-bg), 0 0 30px rgba(255, 107, 53, 0.6), inset 0 0 20px rgba(255, 107, 53, 0.1), 12px 12px 0 0 rgba(0, 0, 0, 0.8)',
              padding: '0'
            }}>
              
              <div style={{
                background: 'linear-gradient(90deg, #ff6b35 0%, #f7931e 100%)',
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
                  REMOVE_FAVORITE.EXE
                </div>
              </div>

              
              <div className="p-8 md:p-12">
                
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 relative">
                  <div className="w-full h-full border-[6px] md:border-[8px] border-orange-400/20 border-t-orange-500 rounded-full animate-spin" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl animate-[blink_1s_infinite]">
                    
                  </div>
                </div>

                
                <div className="text-[12px] md:text-[14px] text-orange-500 font-bold mb-2 md:mb-3 text-center animate-[blink_0.8s_infinite]" style={{
                  textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)',
                  letterSpacing: '1px'
                }}>
                  REMOVING FROM FAVORITES...
                </div>

                
                <div className="w-full h-5 md:h-6 bg-black/30 border-[2px] md:border-[3px] border-retro-accent overflow-hidden relative" style={{
                  boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}>
                  <div className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-[length:200%_100%] animate-[loading-bar_1.5s_linear_infinite]" style={{
                    boxShadow: '0 0 10px rgba(255, 107, 53, 0.5)'
                  }} />
                </div>

                
                <div className="text-[7px] md:text-[9px] text-retro-primary mt-3 md:mt-4 text-center leading-[1.6] md:leading-[1.8]" style={{
                  textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'
                }}>
                  REMOVING FROM DATABASE...<br />
                  SYNCING TO FIRESTORE...<br />
                  PLEASE WAIT...
                </div>
              </div>

              
              <div className="bg-retro-bg px-4 py-2 border-t-[3px] border-orange-500 flex justify-between text-[6px] md:text-[8px] text-orange-500 font-bold">
                <span>PROCESS: REMOVE</span>
                <span className="animate-[blink_1s_infinite]">● ACTIVE</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

