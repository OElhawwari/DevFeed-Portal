'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useUser, SignedIn, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function UserInfoFloat() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      setShowModal(false);
      setTimeout(() => {
        router.push('/');
        setIsLoggingOut(false);
      }, 500);
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  if (!mounted) return null;

  return (
    <SignedIn>
      
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--retro-primary) 0%, var(--retro-cyan) 100%)',
          border: '4px solid #00884480',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          zIndex: 1000,
          transition: 'all 0.2s'
        
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.95)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
        }}
        aria-label="User Info"
      >
        👤
      </button>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 6px 0 #008844, inset -3px -3px 6px rgba(0, 0, 0, 0.3), inset 3px 3px 4px rgba(255, 255, 255, 0.3);
          }
          50% {
            box-shadow: 0 6px 0 #008844, inset -3px -3px 6px rgba(0, 0, 0, 0.3), inset 3px 3px 4px rgba(255, 255, 255, 0.3), 0 0 12px rgba(0, 255, 136, 0.5);
          }
        }
      `}</style>

      
      {showModal && createPortal(
        <div
          onClick={() => setShowModal(false)}
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
              border: '6px solid var(--retro-primary)',
              boxShadow: '0 0 0 4px var(--retro-bg), 0 0 20px rgba(0, 255, 136, 0.5), inset 0 0 20px rgba(0, 255, 136, 0.1), 12px 12px 0 0 rgba(0, 0, 0, 0.8)',
              padding: '0',
              position: 'relative'
            }}
          >
            
            <div style={{
              background: 'linear-gradient(90deg, var(--retro-primary) 0%, var(--retro-cyan) 100%)',
              padding: '12px 16px',
              borderBottom: '4px solid var(--retro-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 'bold',
                color: 'var(--retro-bg)',
                letterSpacing: '2px',
                textShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)'
              }}>
                USER_PROFILE.SYS
              </div>
              <button
                onClick={() => setShowModal(false)}
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

            
            <div style={{ padding: '32px 24px' }}>
              
              <div style={{
                fontSize: '64px',
                textAlign: 'center',
                marginBottom: '24px',
                filter: 'drop-shadow(0 0 10px rgba(0, 255, 136, 0.5))'
              }}>
                {user?.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt="Profile"
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      border: '4px solid var(--retro-primary)',
                      boxShadow: '0 0 20px rgba(0, 255, 136, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.3)',
                      margin: '0 auto',
                      display: 'block',
                      imageRendering: 'pixelated'
                    }}
                  />
                ) : (
                  '👤'
                )}
              </div>

              
              <div style={{
                textAlign: 'center',
                marginBottom: '24px'
              }}>
                <p style={{
                  fontSize: '12px',
                  color: 'var(--retro-tertiary)',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)',
                  letterSpacing: '1px'
                }}>
                  PLAYER PROFILE
                </p>

                
                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '3px solid var(--retro-accent)',
                  padding: '12px',
                  marginBottom: '12px',
                  boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}>
                  <div style={{
                    fontSize: '8px',
                    color: 'var(--retro-cyan)',
                    marginBottom: '4px',
                    fontWeight: 'bold'
                  }}>
                    NAME:
                  </div>
                  <p style={{
                    fontSize: '11px',
                    color: 'var(--retro-primary)',
                    fontWeight: 'bold',
                    wordBreak: 'break-word'
                  }}>
                    {user?.fullName || user?.firstName || 'Player'}
                  </p>
                </div>

                
                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '3px solid var(--retro-accent)',
                  padding: '12px',
                  marginBottom: '12px',
                  boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}>
                  <div style={{
                    fontSize: '8px',
                    color: 'var(--retro-cyan)',
                    marginBottom: '4px',
                    fontWeight: 'bold'
                  }}>
                    EMAIL:
                  </div>
                  <p style={{
                    fontSize: '9px',
                    color: 'var(--retro-primary)',
                    fontWeight: 'bold',
                    wordBreak: 'break-word'
                  }}>
                    {user?.primaryEmailAddress?.emailAddress || 'N/A'}
                  </p>
                </div>

                
                {user?.username && (
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '3px solid var(--retro-accent)',
                    padding: '12px',
                    marginBottom: '12px',
                    boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.5)'
                  }}>
                    <div style={{
                      fontSize: '8px',
                      color: 'var(--retro-cyan)',
                      marginBottom: '4px',
                      fontWeight: 'bold'
                    }}>
                      USERNAME:
                    </div>
                    <p style={{
                      fontSize: '10px',
                      color: 'var(--retro-primary)',
                      fontWeight: 'bold',
                      wordBreak: 'break-word'
                    }}>
                      @{user.username}
                    </p>
                  </div>
                )}

                
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '16px'
                }}>
                  <div style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 255, 255, 0.2) 100%)',
                    border: '3px solid var(--retro-primary)',
                    padding: '12px 8px',
                    textAlign: 'center',
                    boxShadow: '3px 3px 0 rgba(0, 0, 0, 0.5)'
                  }}>
                    <div style={{
                      fontSize: '16px',
                      color: 'var(--retro-primary)',
                      fontWeight: 'bold',
                      marginBottom: '4px'
                    }}>
                      LVL
                    </div>
                    <div style={{
                      fontSize: '20px',
                      color: 'var(--retro-tertiary)',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)'
                    }}>
                      99
                    </div>
                  </div>
                  <div style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, rgba(255, 255, 0, 0.2) 0%, rgba(255, 136, 0, 0.2) 100%)',
                    border: '3px solid var(--retro-tertiary)',
                    padding: '12px 8px',
                    textAlign: 'center',
                    boxShadow: '3px 3px 0 rgba(0, 0, 0, 0.5)'
                  }}>
                    <div style={{
                      fontSize: '16px',
                      color: 'var(--retro-tertiary)',
                      fontWeight: 'bold',
                      marginBottom: '4px'
                    }}>
                      XP
                    </div>
                    <div style={{
                      fontSize: '20px',
                      color: 'var(--retro-orange)',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)'
                    }}>
                      ∞
                    </div>
                  </div>
                </div>
              </div>

              
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center'
              }}>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  style={{
                    padding: '12px 24px',
                    background: isLoggingOut 
                      ? 'linear-gradient(135deg, #666666 0%, #444444 100%)' 
                      : 'linear-gradient(135deg, #ff0044 0%, #cc0033 100%)',
                    border: '4px solid #880022',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    cursor: isLoggingOut ? 'not-allowed' : 'pointer',
                    letterSpacing: '1px',
                    boxShadow: '0 4px 0 #880022, inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 2px rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.1s',
                    textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)',
                    opacity: isLoggingOut ? 0.6 : 1
                  }}
                  onMouseDown={(e) => {
                    if (isLoggingOut) return;
                    e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.4)';
                    e.currentTarget.style.transform = 'translateY(3px)';
                  }}
                  onMouseUp={(e) => {
                    if (isLoggingOut) return;
                    e.currentTarget.style.boxShadow = '0 4px 0 #880022, inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 2px rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {isLoggingOut ? 'LOGGING OUT...' : 'LOGOUT'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  disabled={isLoggingOut}
                  style={{
                    padding: '12px 24px',
                    background: isLoggingOut
                      ? 'linear-gradient(135deg, #666666 0%, #444444 100%)'
                      : 'linear-gradient(135deg, var(--retro-primary) 0%, #00cc66 100%)',
                    border: '4px solid #008844',
                    color: 'var(--retro-bg)',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    cursor: isLoggingOut ? 'not-allowed' : 'pointer',
                    letterSpacing: '1px',
                    boxShadow: '0 4px 0 #008844, inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 2px rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.1s',
                    textShadow: '1px 1px 0 rgba(0, 0, 0, 0.3)',
                    opacity: isLoggingOut ? 0.6 : 1
                  }}
                  onMouseDown={(e) => {
                    if (isLoggingOut) return;
                    e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.4)';
                    e.currentTarget.style.transform = 'translateY(3px)';
                  }}
                  onMouseUp={(e) => {
                    if (isLoggingOut) return;
                    e.currentTarget.style.boxShadow = '0 4px 0 #008844, inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 2px rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  CLOSE ◀
                </button>
              </div>
            </div>

            
            <div style={{
              background: 'var(--retro-bg)',
              padding: '8px 16px',
              borderTop: '3px solid var(--retro-primary)',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '8px',
              color: 'var(--retro-primary)',
              fontWeight: 'bold'
            }}>
              <span>STATUS: LOGGED IN</span>
              <span style={{ animation: 'blink 1s infinite' }}>● ONLINE</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </SignedIn>
  );
}

