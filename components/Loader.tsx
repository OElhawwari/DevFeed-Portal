export default function Loader(){
  return(
    <div className='w-full flex items-center justify-center py-16 flex-col gap-6'>
      <div className='relative w-20 h-20'>
        
        <div className='absolute inset-0 border-[6px] animate-[spin_2s_steps(8)_infinite]' style={{
          borderColor: 'var(--retro-primary)',
          boxShadow: 'inset 0 0 0 3px var(--retro-accent), 6px 6px 0 0 rgba(0, 0, 0, 0.7), -2px -2px 0 0 var(--retro-cyan)'
        }}>
        </div>
        
        
        <div className='absolute inset-2 border-4 animate-[spin-reverse_1.5s_steps(6)_infinite]' style={{
          borderColor: 'var(--retro-secondary)',
          boxShadow: 'inset 0 0 0 2px var(--retro-magenta)'
        }}>
        </div>
        
        
        <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 animate-[blink_0.6s_infinite] border-2" style={{
          background: 'linear-gradient(135deg, var(--retro-tertiary), var(--retro-orange))',
          borderColor: 'var(--retro-secondary)',
          boxShadow: '0 0 8px var(--retro-tertiary)'
        }}></div>
      </div>
      
      <div className="text-xs tracking-[3px] animate-[blink_1s_infinite] font-bold" style={{
        color: 'var(--retro-primary)',
        textShadow: '2px 2px 0 rgba(0, 0, 0, 0.8), 4px 4px 0 var(--retro-cyan)'
      }}>
        LOADING...
      </div>
      
      
      <div className="w-[200px] h-4 border-[3px] overflow-hidden relative" style={{
        background: 'var(--retro-surface)',
        borderColor: 'var(--retro-primary)',
        boxShadow: 'inset -2px -2px 0 0 var(--retro-accent), 3px 3px 0 0 rgba(0, 0, 0, 0.6)'
      }}>
        <div className="h-full animate-[loading-bar_1.5s_ease-in-out_infinite]" style={{
          background: 'linear-gradient(90deg, var(--retro-secondary), var(--retro-magenta))',
          boxShadow: 'inset 1px 1px 0 0 rgba(255, 255, 255, 0.3)'
        }} />
      </div>
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }
      `}</style>
    </div>
  );
}

