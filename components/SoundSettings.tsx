'use client';

import { useState, useEffect } from 'react';
import { soundManager } from '@/utils/soundEffects';

export default function SoundSettings() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsEnabled(soundManager.getEnabled());
    setVolume(soundManager.getVolume());
  }, []);

  const handleToggleSound = () => {
    const newEnabled = !isEnabled;
    setIsEnabled(newEnabled);
    soundManager.setEnabled(newEnabled);
    
    if (newEnabled) {
      soundManager.playNotification();
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    soundManager.setVolume(newVolume);
    soundManager.playClick();
  };

  const playTestSound = () => {
    soundManager.playSuccess();
  };

  return (
    <>
      {/* Sound Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-200 hover:scale-110"
        style={{
          background: isEnabled 
            ? 'linear-gradient(135deg, var(--retro-primary) 0%, var(--retro-cyan) 100%)'
            : 'linear-gradient(135deg, #666 0%, #444 100%)',
          border: '3px solid #008844',
          boxShadow: '0 4px 0 #008844, inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 2px rgba(255, 255, 255, 0.2)',
          zIndex: 1000
        }}
        onMouseEnter={() => soundManager.playButtonHover()}
        onMouseDown={() => soundManager.playButtonPress()}
        aria-label="Sound Settings"
      >
        {isEnabled ? '🔊' : '🔇'}
      </button>

      {/* Sound Settings Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 left-6 p-4 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, #2a3550 0%, #1a2540 100%)',
            border: '4px solid var(--retro-primary)',
            boxShadow: '0 6px 0 #008844, inset -3px -3px 6px rgba(0, 0, 0, 0.3), inset 3px 3px 4px rgba(255, 255, 255, 0.2)',
            zIndex: 1001,
            minWidth: '200px'
          }}
        >
          <div className="text-center mb-4">
            <h3 
              className="text-sm font-bold mb-2"
              style={{
                color: 'var(--retro-primary)',
                textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)',
                fontFamily: 'Press Start 2P, monospace',
                letterSpacing: '1px'
              }}
            >
              SOUND SETTINGS
            </h3>
          </div>

          {/* Sound Toggle */}
          <div className="mb-4">
            <label className="flex items-center justify-between">
              <span 
                className="text-xs font-bold"
                style={{
                  color: 'var(--retro-tertiary)',
                  fontFamily: 'Press Start 2P, monospace'
                }}
              >
                SOUND:
              </span>
              <button
                onClick={handleToggleSound}
                className={`px-3 py-1 text-xs font-bold transition-all duration-100`}
                style={{
                  background: isEnabled 
                    ? 'linear-gradient(135deg, var(--retro-primary) 0%, #00cc66 100%)'
                    : 'linear-gradient(135deg, #666 0%, #444 100%)',
                  border: '2px solid #008844',
                  color: 'var(--retro-bg)',
                  boxShadow: '0 2px 0 #008844, inset -1px -1px 2px rgba(0, 0, 0, 0.3), inset 1px 1px 1px rgba(255, 255, 255, 0.2)',
                  fontFamily: 'Press Start 2P, monospace'
                }}
                onMouseEnter={() => soundManager.playButtonHover()}
                onMouseDown={() => soundManager.playButtonPress()}
              >
                {isEnabled ? 'ON' : 'OFF'}
              </button>
            </label>
          </div>

          {/* Volume Control */}
          <div className="mb-4">
            <label className="block mb-2">
              <span 
                className="text-xs font-bold"
                style={{
                  color: 'var(--retro-tertiary)',
                  fontFamily: 'Press Start 2P, monospace'
                }}
              >
                VOLUME:
              </span>
            </label>
            <div className="flex items-center gap-2">
              <span 
                className="text-xs"
                style={{
                  color: 'var(--retro-primary)',
                  fontFamily: 'Press Start 2P, monospace'
                }}
              >
                {Math.round(volume * 100)}%
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: 'linear-gradient(to right, var(--retro-primary) 0%, var(--retro-primary) ' + (volume * 100) + '%, #333 ' + (volume * 100) + '%, #333 100%)',
                  outline: 'none'
                }}
                onMouseEnter={() => soundManager.playButtonHover()}
              />
            </div>
          </div>

          {/* Test Sound and Close Buttons */}
          <div className="flex gap-2 justify-center">
            <button
              onClick={playTestSound}
              className="px-4 py-2 text-xs font-bold transition-all duration-100"
              style={{
                background: 'linear-gradient(135deg, var(--retro-secondary) 0%, var(--retro-magenta) 100%)',
                border: '2px solid #880022',
                color: 'white',
                boxShadow: '0 3px 0 #880022, inset -2px -2px 3px rgba(0, 0, 0, 0.3), inset 2px 2px 2px rgba(255, 255, 255, 0.2)',
                fontFamily: 'Press Start 2P, monospace'
              }}
              onMouseEnter={() => soundManager.playButtonHover()}
              onMouseDown={() => soundManager.playButtonPress()}
            >
              TEST SOUND
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-xs font-bold transition-all duration-100"
              style={{
                background: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
                border: '2px solid #880000',
                color: 'white',
                boxShadow: '0 3px 0 #880000, inset -2px -2px 3px rgba(0, 0, 0, 0.3), inset 2px 2px 2px rgba(255, 255, 255, 0.2)',
                fontFamily: 'Press Start 2P, monospace'
              }}
              onMouseEnter={() => soundManager.playButtonHover()}
              onMouseDown={() => soundManager.playButtonPress()}
            >
              x
            </button>
          </div>
        </div>
      )}
    </>
  );
}
