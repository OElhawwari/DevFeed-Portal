export default function Footer(){
  return (
    <footer className='mt-12 border-t-[6px] border-solid' style={{
      borderImage: 'linear-gradient(90deg, var(--retro-cyan) 0%, var(--retro-secondary) 50%, var(--retro-cyan) 100%) 1',
      background: 'linear-gradient(135deg, var(--retro-surface) 0%, #252d4a 100%)',
      boxShadow: '0 -6px 0 0 rgba(0, 0, 0, 0.8), inset 0 3px 0 0 var(--retro-primary)'
    }}>
      <div className='container-page py-8 text-center text-[8px] tracking-[2px] leading-[2.2]' style={{
        color: 'var(--retro-primary)'
      }}>
        <div className="text-[10px] font-bold" style={{
          color: 'var(--retro-text)',
          textShadow: '2px 2px 0 rgba(0, 0, 0, 0.8), 4px 4px 0 var(--retro-cyan)'
        }}>
          © 2025 DEVFEED
        </div>
      
      </div>
    </footer>
  );
}

