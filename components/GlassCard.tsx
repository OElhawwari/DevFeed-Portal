import { PropsWithChildren } from 'react';
export default function GlassCard({children}:PropsWithChildren){
  return (
    <div className='glass p-4' style={{
      fontSize: '9px',
      lineHeight: '1.8'
    }}>
      {children}
    </div>
  );
}
