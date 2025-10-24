'use client';

import { SignIn } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function SignInPage() {
  useEffect(() => {
    const setPlaceholders = () => {
      const emailInput = document.querySelector('input[name="identifier"], input[name="emailAddress"]') as HTMLInputElement;
      const passwordInputs = document.querySelectorAll('input[name="password"]');

      if (emailInput) emailInput.placeholder = 'example@devfeed.io';
      passwordInputs.forEach((input: any) => {
        input.placeholder = '********';
      });
    };

    setPlaceholders();

    const timer1 = setTimeout(setPlaceholders, 100);
    const timer2 = setTimeout(setPlaceholders, 500);
    const timer3 = setTimeout(setPlaceholders, 1000);

    const observer = new MutationObserver(setPlaceholders);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      observer.disconnect();
    };
  }, []);
  return (
    <div className='py-8 md:py-16 px-4'>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 max-w-7xl mx-auto items-start">
        <div className="flex flex-col gap-6">
          <div className='retro-window' style={{
            background: 'linear-gradient(135deg, rgba(255, 0, 136, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)'
          }}>
            <div className='retro-titlebar' style={{ background: 'linear-gradient(90deg, var(--retro-secondary) 0%, var(--retro-magenta) 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>LOGIN.EXE</span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '16px', height: '16px', background: 'var(--retro-tertiary)', border: '2px solid var(--retro-bg)', fontSize: '8px', cursor: 'pointer', boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.3)' }}>_</div>
                <div style={{ width: '16px', height: '16px', background: 'var(--retro-cyan)', border: '2px solid var(--retro-bg)', fontSize: '8px', cursor: 'pointer', boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.3)' }}>□</div>
                <div style={{ width: '16px', height: '16px', background: 'var(--retro-secondary)', border: '2px solid var(--retro-bg)', fontSize: '8px', cursor: 'pointer', boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.3)' }}>X</div>
              </div>
            </div>
            <div style={{ padding: '32px', textAlign: 'center', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                width: '20px',
                height: '20px',
                background: 'var(--retro-secondary)',
                border: '3px solid var(--retro-magenta)',
                boxShadow: '3px 3px 0 0 rgba(0, 0, 0, 0.6)',
                animation: 'coin 2s ease-in-out infinite'
              }} />
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '20px',
                height: '20px',
                background: 'var(--retro-cyan)',
                border: '3px solid var(--retro-primary)',
                boxShadow: '3px 3px 0 0 rgba(0, 0, 0, 0.6)',
                animation: 'coin 2.5s ease-in-out infinite'
              }} />

              <h1 style={{
                fontSize: '20px',
                color: 'var(--retro-text)',
                textShadow: '3px 3px 0 rgba(0, 0, 0, 0.8), 6px 6px 0 var(--retro-secondary), 9px 9px 0 var(--retro-magenta)',
                letterSpacing: '3px',
                marginBottom: '16px',
                animation: 'pixelate 2s infinite'
              }}>
                ▶ PLAYER LOGIN ◀
              </h1>
              <p style={{
                fontSize: '10px',
                color: 'var(--retro-secondary)',
                letterSpacing: '2px',
                fontWeight: 'bold',
                textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)',
                marginBottom: '16px'
              }}>
                CONTINUE YOUR QUEST
              </p>
              <div className='retro-status'>
                <span>AUTH REQUIRED</span>
                <span>STATUS: PENDING</span>
              </div>
            </div>
          </div>

          <div className='retro-window hidden lg:block' style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 0, 0.05) 0%, rgba(255, 136, 0, 0.05) 100%)'
          }}>
            <div className='retro-titlebar' style={{ background: 'linear-gradient(270deg, var(--retro-tertiary) 0%, var(--retro-orange) 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>SIGN_UP.TXT</span>
              </div>
            </div>
            <div className="p-4 md:p-5 text-center">
              <p className="text-[9px] md:text-[10px] font-bold leading-[2.2] tracking-[1px]" style={{
                color: 'var(--retro-primary)',
                textShadow: '1px 1px 0 rgba(0, 0, 0, 0.3)'
              }}>
                NEW PLAYER? <br/> <a href="/sign-up" style={{
                  color: 'var(--retro-tertiary)',
                  textDecoration: 'underline',
                  textShadow: '0 0 8px var(--retro-tertiary)',
                  animation: 'blink 1s infinite'
                }}>▶ START NEW GAME</a>
              </p>
            </div>
          </div>

          <div className='retro-window hidden lg:block' style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(0, 255, 255, 0.05) 100%)'
          }}>
            <div className='retro-titlebar' style={{ background: 'linear-gradient(90deg, var(--retro-primary) 0%, var(--retro-cyan) 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>BENEFITS.LST</span>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <ul className="text-[9px] md:text-[10px] font-bold leading-[2.2] tracking-[1px]" style={{
                color: 'var(--retro-primary)',
                textShadow: '1px 1px 0 rgba(0, 0, 0, 0.3)',
                listStyle: 'none',
                padding: 0
              }}>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    color: 'var(--retro-tertiary)',
                    fontSize: '14px',
                    textShadow: '0 0 8px var(--retro-tertiary)'
                  }}>★</span>
                  <span>SAVE YOUR FAVORITE CONTENT</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    color: 'var(--retro-cyan)',
                    fontSize: '14px',
                    textShadow: '0 0 8px var(--retro-cyan)'
                  }}>★</span>
                  <span>SYNC ACROSS ALL DEVICES</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    color: 'var(--retro-secondary)',
                    fontSize: '14px',
                    textShadow: '0 0 8px var(--retro-secondary)'
                  }}>★</span>
                  <span>PERSONALIZED EXPERIENCE</span>
                </li>
              </ul>
            </div>
            <div className='retro-status'>
              <span>PERKS: 3</span>
              <span>TYPE: PREMIUM</span>
              <span>FREE</span>
            </div>
          </div>

          
        </div>

        <div className="sticky top-8">
          <div className='retro-window' style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(0, 255, 255, 0.05) 100%)'
          }}>
            <div className='retro-titlebar' style={{ background: 'linear-gradient(90deg, var(--retro-cyan) 0%, var(--retro-primary) 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>USER_AUTH.SYS</span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  background: 'var(--retro-primary)',
                  border: '2px solid var(--retro-bg)',
                  fontSize: '8px',
                  cursor: 'pointer',
                  boxShadow: '2px 2px 0 0 rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>?</div>
              </div>
            </div>
            <div style={{
              padding: '24px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                width: '16px',
                height: '16px',
                border: '3px solid var(--retro-primary)',
                borderRight: 'none',
                borderBottom: 'none'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                width: '16px',
                height: '16px',
                border: '3px solid var(--retro-secondary)',
                borderLeft: 'none',
                borderTop: 'none'
              }} />

              <style>{`
                .cl-formFieldLabelRow__informational {
                  display: none !important;
                }
                .cl-internal-b3fm6y {
                  display: none !important;
                }
                .cl-formFieldLabelRow span:last-child {
                  display: none !important;
                }
                .cl-formFieldLabel ~ .cl-formFieldLabelRow span:last-child {
                  display: none !important;
                }
              `}</style>

              <SignIn
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "bg-transparent shadow-none w-4/5 sm:w-full",
                    headerTitle: "text-white text-sm font-['Press_Start_2P'] leading-relaxed",
                    headerSubtitle: "text-white/90 text-xs mt-2 hidden",
                    socialButtonsBlockButton: "bg-gradient-to-b from-[#ff6b35] to-[#f7931e] border-4 border-[#0f1419] text-white hover:from-[#ff8555] hover:to-[#ffad3e] font-['Press_Start_2P'] text-xs transition-all duration-100 hover:translate-y-0.5 active:translate-y-1 shadow-[inset_0_-6px_0_0_rgba(0,0,0,0.4),inset_0_6px_0_0_rgba(255,255,255,0.3),inset_-6px_0_0_0_rgba(0,0,0,0.3),inset_6px_0_0_0_rgba(255,255,255,0.2),0_6px_0_0_#0f1419,6px_0_0_0_rgba(0,0,0,0.4),-6px_0_0_0_rgba(0,0,0,0.4),0_-4px_0_0_rgba(0,0,0,0.3),0_0_20px_rgba(255,107,53,0.3)]",
                    socialButtonsBlockButtonText: "text-white font-['Press_Start_2P'] text-[9px] drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]",
                    formButtonPrimary: "bg-gradient-to-b from-[#00ff88] to-[#00cc66] border-2 border-[#0f1419] text-black hover:from-[#00ffaa] hover:to-[#00dd77] font-['Press_Start_2P'] text-xs shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.5),inset_0_4px_0_0_rgba(255,255,255,0.2),inset_-4px_0_0_0_rgba(0,0,0,0.4),inset_4px_0_0_0_rgba(255,255,255,0.1),0_4px_0_0_#0f1419,4px_0_0_0_rgba(0,0,0,0.3),-4px_0_0_0_rgba(0,0,0,0.3),0_-4px_0_0_rgba(0,0,0,0.2)]",
                    formFieldLabel: "text-white font-['Press_Start_2P'] text-[9px]",
                    formFieldInput: "bg-[#1a2540] border-2 border-[#0f1419] text-white text-xs font-['Press_Start_2P'] placeholder:text-white/50 placeholder:text-[10px] focus:border-[#00ff88]",
                    identityPreviewText: {
                      color: 'white',
                      paddingTop: '24px',
                      fontSize: '10px',
                      textDecoration: 'underline',
                      textShadow: '0 0 2px var(--retro-tertiary)',
                    },
                    lastAuthenticationStrategyBadge: {
                      display: 'none',
                    },
                    identityPreviewEditButton: {
                      display: 'none',
                    },
                    formFieldAction: "text-[#00ff88] hover:text-[#00ffaa] text-[6px]",
                    alternativeMethodsBlockButton: "bg-gradient-to-b from-[#00ff88] to-[#00cc66] border-4 border-[#0f1419] text-black hover:from-[#00ffaa] hover:to-[#00dd77] font-['Press_Start_2P'] text-xs transition-all duration-100 hover:translate-y-0.5 active:translate-y-1 shadow-[inset_0_-6px_0_0_rgba(0,0,0,0.4),inset_0_6px_0_0_rgba(255,255,255,0.3),inset_-6px_0_0_0_rgba(0,0,0,0.3),inset_6px_0_0_0_rgba(255,255,255,0.2),0_6px_0_0_#0f1419,6px_0_0_0_rgba(0,0,0,0.4),-6px_0_0_0_rgba(0,0,0,0.4),0_-4px_0_0_rgba(0,0,0,0.3),0_0_20px_rgba(0,255,136,0.3)]",
                    alternativeMethodsBlockButtonText: "text-black font-['Press_Start_2P'] text-[9px] drop-shadow-[2px_2px_0_rgba(255,255,255,0.3)]",
                    backLink:"text-white",
                    formResendCodeLink:"text-white text-[9px] mt-2",
                    formFieldInputShowPasswordButton: "text-white",
                    footerActionText: "text-white text-xs",
                    footerActionLink: "text-[#00ff88] hover:text-[#00ffaa] font-['Press_Start_2P'] text-xs",
                    dividerText: "text-white text-xs",
                    dividerLine: "bg-white/30",
                    otpCodeFieldInput: "bg-[#1a2540] border-2 border-[#0f1419] text-white",
                    formHeaderTitle: "text-white font-['Press_Start_2P'] text-sm",
                    formHeaderSubtitle: "text-white/90 text-xs",
                    footer: "hidden"
                  },
                  layout: {
                    socialButtonsPlacement: "top"
                  }
                }}
                redirectUrl="/"
                signUpUrl="/sign-up"
              />
            </div>
            <div className='retro-status'>
              <span>MODE: LOGIN</span>
              <span>LEVEL: ACCESS</span>
              <span style={{ animation: 'blink 1s infinite' }}>ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
      <div className='retro-window block lg:hidden mt-8' style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 0, 0.05) 0%, rgba(255, 136, 0, 0.05) 100%)'
          }}>
            <div className='retro-titlebar' style={{ background: 'linear-gradient(270deg, var(--retro-tertiary) 0%, var(--retro-orange) 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>SIGN_UP.TXT</span>
              </div>
            </div>
            <div className="p-4 md:p-5 text-center">
              <p className="text-[9px] md:text-[10px] font-bold leading-[2.2] tracking-[1px]" style={{
                color: 'var(--retro-primary)',
                textShadow: '1px 1px 0 rgba(0, 0, 0, 0.3)'
              }}>
                NEW PLAYER? <br/> <a href="/sign-up" style={{
                  color: 'var(--retro-tertiary)',
                  textDecoration: 'underline',
                  textShadow: '0 0 8px var(--retro-tertiary)'
                }}>▶ START NEW GAME</a>
              </p>
            </div>
          </div>
    </div>
  );
}