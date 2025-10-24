'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" >
      <div className="text-center">
        <div 
          className="text-8xl md:text-9xl font-bold mb-8 animate-[glitch_2s_ease-in-out_infinite]"
          style={{
            color: '#ff0044',
            textShadow: '0 0 20px #ff0044, 0 0 40px #ff0044, 0 0 60px #ff0044',
            fontFamily: 'Press Start 2P, monospace',
            letterSpacing: '8px',
            filter: 'drop-shadow(0 0 10px rgba(255, 0, 68, 0.8))'
          }}
        >
          404
        </div>

        <div 
          className="text-2xl md:text-3xl font-bold mb-12"
          style={{
            color: 'var(--retro-tertiary)',
            textShadow: '2px 2px 0 rgba(0, 0, 0, 0.8), 4px 4px 0 var(--retro-primary)',
            fontFamily: 'Press Start 2P, monospace',
            letterSpacing: '3px'
          }}
        >
          NOT FOUND
        </div>

        <Link href="/">
          <button
            className="relative px-6 py-3 text-sm font-bold transition-all duration-100 hover:translate-y-0.5 active:translate-y-1"
            style={{
              background: 'linear-gradient(135deg, var(--retro-primary) 0%, #00cc66 100%)',
              border: '3px solid #008844',
              color: 'var(--retro-bg)',
              textShadow: '1px 1px 0 rgba(0, 0, 0, 0.3)',
              boxShadow: '0 4px 0 #008844, inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 3px rgba(255, 255, 255, 0.3)',
              fontFamily: 'Press Start 2P, monospace',
              letterSpacing: '1px',
              cursor: 'pointer'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0, 0, 0, 0.4)';
              e.currentTarget.style.transform = 'translateY(3px)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 0 #008844, inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 3px rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'brightness(1)';
            }}
          >
            ▶ RETURN TO HOME ◀
          </button>
        </Link>

        
      </div>

      <style jsx>{`
        @keyframes glitch {
          0%, 100% {
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
          10% {
            transform: translate(-2px, 2px);
            filter: hue-rotate(90deg);
          }
          20% {
            transform: translate(2px, -2px);
            filter: hue-rotate(180deg);
          }
          30% {
            transform: translate(-2px, -2px);
            filter: hue-rotate(270deg);
          }
          40% {
            transform: translate(2px, 2px);
            filter: hue-rotate(360deg);
          }
          50% {
            transform: translate(-2px, 2px);
            filter: hue-rotate(45deg);
          }
          60% {
            transform: translate(2px, -2px);
            filter: hue-rotate(135deg);
          }
          70% {
            transform: translate(-2px, -2px);
            filter: hue-rotate(225deg);
          }
          80% {
            transform: translate(2px, 2px);
            filter: hue-rotate(315deg);
          }
          90% {
            transform: translate(-2px, 2px);
            filter: hue-rotate(45deg);
          }
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.3; }
        }

        @keyframes coin {
          0%, 100% { 
            transform: translateY(0) rotateY(0deg);
            filter: brightness(1);
          }
          50% { 
            transform: translateY(-10px) rotateY(180deg);
            filter: brightness(1.3);
          }
        }
      `}</style>
    </div>
  );
}
