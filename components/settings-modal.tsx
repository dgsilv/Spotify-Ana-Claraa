"use client"

import { X, ExternalLink, Heart, Music, Sparkles } from "lucide-react"
import { IMAGES } from "@/lib/music-data"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  if (!isOpen) return null

  const spotifyProfileUrl = "https://open.spotify.com/user/316zdjppahe5qb6tuz63znxrdfzy?si=c173235ff0854639"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gradient-to-b from-[#282828] to-[#121212] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-[#b3b3b3] hover:text-white hover:bg-black/60 transition-all z-10"
        >
          <X size={20} />
        </button>

        {/* Header with gradient */}
        <div className="relative h-32 bg-gradient-to-b from-[#1DB954]/40 to-transparent flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-[#1DB954]/30" />
          </div>
          <div className="relative flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#1DB954]" fill="#1DB954" />
            <Music className="w-8 h-8 text-white" />
            <Heart className="w-6 h-6 text-[#1DB954]" fill="#1DB954" />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-8 -mt-4">
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#1DB954] shadow-xl">
              <img 
                src={IMAGES.profilePhoto}
                alt="Aninha"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              Para a minha artista favorita
            </h2>
            <p className="text-[#b3b3b3] leading-relaxed text-sm md:text-base">
              Acredito que o mundo inteiro precise ouvir sua voz. E acredito que em um futuro mais breve possível, esse perfil no Spotify real possa se tornar um refúgio pra quem precisar de um conforto, ou estiver passando pelas mesmas coisas que você.
            </p>
          </div>

          {/* Spotify Link */}
          <a
            href={spotifyProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Ver perfil no Spotify
            <ExternalLink size={18} />
          </a>

          {/* Decorative footer */}
          <div className="mt-6 text-center">
            <p className="text-[#b3b3b3]/50 text-xs">
              Feito com amor
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
