"use client"

import { Track } from "@/lib/music-data"
import { X, ExternalLink, Heart, Music } from "lucide-react"

interface LyricsModalProps {
  track: Track
  onClose: () => void
}

export function LyricsModal({ track, onClose }: LyricsModalProps) {
  const handleOpenExternal = () => {
    if (track.youtubeUrl) {
      window.open(track.youtubeUrl, "_blank")
    } else if (track.spotifyUrl && track.spotifyUrl !== "#") {
      window.open(track.spotifyUrl, "_blank")
    }
  }

  const hasExternalLink = track.youtubeUrl || (track.spotifyUrl && track.spotifyUrl !== "#")

  return (
    <div 
      className="fixed inset-0 bg-black/95 backdrop-blur-lg z-[100] flex flex-col"
      onClick={onClose}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#282828]">
        <div className="flex items-center gap-3">
          <img 
            src={track.coverImage} 
            alt={track.title}
            className="w-12 h-12 rounded object-cover"
          />
          <div>
            <h2 className="text-white font-semibold">{track.title}</h2>
            <p className="text-[#b3b3b3] text-sm">{track.artist}</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-[#282828] hover:bg-[#3a3a3a] flex items-center justify-center text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Lyrics Content */}
      <div 
        className="flex-1 overflow-y-auto px-6 py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Music size={24} className="text-[#1DB954]" />
            <h3 className="text-xl font-bold text-white">Letra</h3>
          </div>
          
          {track.lyrics ? (
            <div className="space-y-4">
              {track.lyrics.split('\n\n').map((paragraph, pIndex) => (
                <div key={pIndex} className="space-y-1">
                  {paragraph.split('\n').map((line, lIndex) => (
                    <p 
                      key={`${pIndex}-${lIndex}`} 
                      className="text-xl md:text-2xl font-semibold text-white leading-relaxed"
                    >
                      {line || <br />}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart size={48} className="text-[#b3b3b3] mx-auto mb-4" />
              <p className="text-[#b3b3b3] text-lg">Letra não disponível</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#282828] flex items-center justify-center gap-4">
        {hasExternalLink && (
          <button
            onClick={handleOpenExternal}
            className="flex items-center gap-2 px-6 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold rounded-full transition-colors"
          >
            <ExternalLink size={18} />
            {track.youtubeUrl ? "Ouvir no YouTube" : "Ouvir no Spotify"}
          </button>
        )}
        <button
          onClick={onClose}
          className="px-6 py-3 text-white font-semibold hover:text-[#1DB954] transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  )
}
