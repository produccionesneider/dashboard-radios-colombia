import React from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';

const BeautifulPlayer = ({
  station,
  isPlaying,
  togglePlay,
  volume,
  setVolume,
  isMuted,
  toggleMute,
  onClose
}) => {
  if (!station) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
      {/* Background with blur and color tint */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      >
        <div 
          className="absolute inset-0 opacity-40 transition-colors duration-1000"
          style={{ 
            background: `radial-gradient(circle at 50% 50%, ${station.bgColor || '#2563EB'} 0%, transparent 70%)` 
          }}
        />
      </div>

      {/* Main Player Container */}
      <div 
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row bg-dark-card/60 backdrop-blur-md border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white/70 hover:text-white transition-all"
        >
          <X size={18} />
        </button>

        {/* Left: Artwork / Logo */}
        <div 
          className="w-full md:w-2/5 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10"
          style={{ backgroundColor: station.bgColor || '#1E1E1E' }}
        >
          <div className={`relative w-48 h-48 md:w-full md:h-auto md:aspect-square rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden transition-transform duration-500 ${isPlaying ? 'scale-105' : 'scale-100'}`}>
            {station.logo ? (
              <img 
                src={station.logo} 
                alt={station.name} 
                className="w-full h-full object-contain drop-shadow-xl"
              />
            ) : (
              <div className="text-white/30 font-bold text-2xl">RADIO</div>
            )}
            
            {/* Pulsing rings when playing */}
            {isPlaying && (
              <>
                <div className="absolute inset-0 rounded-2xl border-2 border-white/20 animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute inset-0 rounded-2xl border border-white/10 animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }}></div>
              </>
            )}
          </div>
        </div>

        {/* Right: Info & Controls */}
        <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
          
          <div className="mb-2 inline-flex">
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${isPlaying ? 'bg-brand-red/20 text-brand-red border border-brand-red/30' : 'bg-white/10 text-white/50 border border-white/10'}`}>
              {isPlaying && <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />}
              {isPlaying ? 'EN VIVO' : 'PAUSADO'}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
            {station.name}
          </h2>
          
          <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
            <span className="font-medium text-white/80">{station.freq}</span>
            <span>•</span>
            <span>{station.city}, {station.department}</span>
            <span>•</span>
            <span>{station.genre}</span>
          </div>

          <p className="text-white/50 text-sm leading-relaxed mb-8 line-clamp-3">
            {station.description || 'Transmitiendo en vivo para toda Colombia y el mundo.'}
          </p>

          {/* Controls */}
          <div className="flex items-center gap-6 mt-auto">
            <button 
              onClick={() => togglePlay(station)}
              className="w-16 h-16 rounded-full bg-brand-blue hover:bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-brand-blue/30 transition-transform hover:scale-105 active:scale-95"
            >
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
            </button>

            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-black/30 border border-white/5">
              <button onClick={toggleMute} className="text-white/60 hover:text-white transition-colors">
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (isMuted && parseFloat(e.target.value) > 0) {
                    toggleMute();
                  }
                }}
                className="flex-1 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BeautifulPlayer;
