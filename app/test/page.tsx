'use client'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function testPage(){ 

  
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative">
            
            <div className="absolute top-[5px] left-[5px] text-black/80 text-base font-['Press_Start_2P'] tracking-[3px] z-0">
              DEVFEED
            </div>
            <div className="absolute top-[3px] left-[3px] text-cyan-400 text-base font-['Press_Start_2P'] tracking-[3px] z-[1]">
              DEVFEED
            </div>
            <div className="absolute top-[2px] left-[2px] text-fuchsia-500 text-base font-['Press_Start_2P'] tracking-[3px] z-[2]">
              DEVFEED
            </div>
            
            <div className="relative text-yellow-400 text-base font-['Press_Start_2P'] tracking-[3px] z-[3] animate-[neon-glow_2s_ease-in-out_infinite]" style={{
              textShadow: '0 0 10px #facc15, 0 0 20px #facc15',
              WebkitTextStroke: '1px #0f1419'
            }}>
              DEVFEED
            </div>
            
            
            <div className="absolute -top-2 -left-3 text-[10px] text-green-400 animate-[blink_1s_infinite]">▶</div>
            <div className="absolute -top-2 -right-3 text-[10px] text-pink-500 animate-[blink_1.5s_infinite]">◀</div>
            <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 text-[6px] text-cyan-400 tracking-[2px] font-['Press_Start_2P'] whitespace-nowrap">
              ★ DEVELOPERS PORTAL ★
            </div>
          </div>
    </div>
  ) 
}

