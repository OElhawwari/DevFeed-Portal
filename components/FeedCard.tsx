import { soundManager } from '@/utils/soundEffects';

type GitHubItem={id:string;name:string;author:string;url:string;description:string;language?:string;stars?:number;forks?:number;}
type DevtoItem={id:number;title:string;url:string;description?:string;tags?:string[];reactions?:number;reading_time?:number;cover?:string;}
export default function FeedCard({item, onClick}:{item:GitHubItem|DevtoItem; onClick?: () => void}){
  const isGH=(x:any)=>'author'in x&&'stars'in x;
  const isDevto=(x:any)=>'reading_time'in x;
  
  const colors = ['var(--retro-primary)', 'var(--retro-cyan)', 'var(--retro-tertiary)', 'var(--retro-secondary)'];
  
  const colorIndex = (item.id.toString().length + item.id.toString().charCodeAt(0)) % colors.length;
  const randomColor = colors[colorIndex];
  
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      soundManager.playButtonPress();
      onClick();
    }
  };
  
  return (
    <a 
      href={(item as any).url} 
      target="_blank" 
      rel="noreferrer" 
      className="glass block p-5 group"
      onClick={handleClick}
      onMouseEnter={(e) => {
        soundManager.playButtonHover();
        e.currentTarget.style.transform = 'translate(-3px, -3px)';
        e.currentTarget.style.boxShadow = 'inset -6px -6px 0 0 var(--retro-accent), inset 6px 6px 0 0 rgba(0, 255, 136, 0.4), 10px 10px 0 0 rgba(0, 0, 0, 0.8), -3px -3px 0 0 var(--retro-magenta)';
      }}
      style={{
        transition: 'transform 0.1s, box-shadow 0.1s',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = 'inset -6px -6px 0 0 var(--retro-accent), inset 6px 6px 0 0 rgba(0, 255, 136, 0.3), 8px 8px 0 0 rgba(0, 0, 0, 0.7), -2px -2px 0 0 var(--retro-cyan)';
      }}
    >
      
      <div style={{
        position: 'absolute',
        top: '-2px',
        left: '-2px',
        width: '12px',
        height: '12px',
        border: '2px solid var(--retro-primary)',
        borderRight: 'none',
        borderBottom: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-2px',
        right: '-2px',
        width: '12px',
        height: '12px',
        border: '2px solid var(--retro-secondary)',
        borderLeft: 'none',
        borderTop: 'none'
      }} />
      
      {isGH(item)&&(
        <>
          <div style={{
            background: 'linear-gradient(135deg, var(--retro-primary), var(--retro-cyan))',
            color: 'var(--retro-bg)',
            fontSize: '11px',
            fontWeight: 'bold',
            marginBottom: '12px',
            letterSpacing: '1px',
            padding: '6px 10px',
            border: '3px solid var(--retro-primary)',
            boxShadow: '3px 3px 0 0 rgba(0, 0, 0, 0.5)',
            display: 'inline-block'
          }}>
            ▸ {(item as GitHubItem).name}
          </div>
          <div style={{
            fontSize: '8px',
            color: 'var(--retro-tertiary)',
            marginBottom: '10px',
            fontWeight: 'bold',
            textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'
          }}>
            BY: {(item as GitHubItem).author}
          </div>
          <p style={{
            fontSize: '9px',
            color: 'var(--retro-primary)',
            lineHeight: '1.7',
            marginBottom: '14px',
            opacity: 0.95,
            textShadow: '1px 1px 0 rgba(0, 0, 0, 0.3)'
          }}>
            {(item as GitHubItem).description}
          </p>
          <div style={{
            fontSize: '8px',
            color: 'var(--retro-text)',
            display: 'flex',
            gap: '14px',
            flexWrap: 'wrap',
            padding: '10px',
            background: 'rgba(0, 0, 0, 0.2)',
            border: '2px dashed var(--retro-cyan)',
            marginTop: '12px'
          }}>
            <span style={{color: 'var(--retro-tertiary)', fontWeight: 'bold'}}>★ {(item as GitHubItem).stars}</span>
            <span style={{color: 'var(--retro-secondary)', fontWeight: 'bold'}}>⑂ {(item as GitHubItem).forks}</span>
            <span style={{color: 'var(--retro-magenta)', fontWeight: 'bold'}}>[{(item as GitHubItem).language}]</span>
          </div>
        </>
      )} 
      {isDevto(item)&&(
        <>
          {(item as DevtoItem).cover&&(
            <div style={{
              position: 'relative',
              marginBottom: '14px',
              border: '4px solid var(--retro-secondary)',
              boxShadow: '4px 4px 0 0 rgba(0, 0, 0, 0.6), -2px -2px 0 0 var(--retro-cyan)',
              overflow: 'hidden'
            }}>
              <img 
                src={(item as DevtoItem).cover!} 
                alt="" 
                style={{
                  width: '100%',
                  display: 'block',
                  border: '2px solid var(--retro-primary)',
                  imageRendering: 'pixelated'
                }}
              />
            </div>
          )}
          <div style={{
            background: 'linear-gradient(135deg, var(--retro-tertiary), var(--retro-orange))',
            color: 'var(--retro-bg)',
            fontSize: '11px',
            fontWeight: 'bold',
            marginBottom: '12px',
            letterSpacing: '1px',
            padding: '6px 10px',
            border: '3px solid var(--retro-tertiary)',
            boxShadow: '3px 3px 0 0 rgba(0, 0, 0, 0.5)',
            display: 'inline-block'
          }}>
            ▸ {(item as DevtoItem).title}
          </div>
          <p style={{
            fontSize: '9px',
            color: 'var(--retro-primary)',
            lineHeight: '1.7',
            marginBottom: '14px',
            opacity: 0.95,
            textShadow: '1px 1px 0 rgba(0, 0, 0, 0.3)'
          }}>
            {(item as DevtoItem).description}
          </p>
          <div style={{
            fontSize: '8px',
            color: 'white',
            display: 'flex',
            gap: '14px',
            padding: '10px',
            background: 'linear-gradient(135deg, var(--retro-secondary), var(--retro-magenta))',
            border: '2px solid var(--retro-secondary)',
            marginTop: '12px',
            fontWeight: 'bold'
          }}>
            <span>❤ {(item as DevtoItem).reactions}</span>
            <span>⏱ {(item as DevtoItem).reading_time}MIN</span>
          </div>
        </>
      )}
    </a>
  )
}

