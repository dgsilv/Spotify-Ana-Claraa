"use client"

import { artistProfile, Track, IMAGES } from "@/lib/music-data"
import { ArrowLeft, Play, Pause, Heart, MoreHorizontal, CheckCircle2, Shuffle, Music } from "lucide-react"

interface ArtistProfileProps {
  currentTrack: Track | null
  isPlaying: boolean
  likedTracks: Set<string>
  onBack: () => void
  onPlayTrack: (track: Track) => void
  onLike: (trackId: string) => void
  onPlayPause: () => void
  onShowLyrics: (track: Track) => void
}

export function ArtistProfile({
  currentTrack,
  isPlaying,
  likedTracks,
  onBack,
  onPlayTrack,
  onLike,
  onPlayPause,
  onShowLyrics
}: ArtistProfileProps) {
  const isPlayingArtist = currentTrack && artistProfile.topTracks.some(t => t.id === currentTrack.id)

  return (
    <div className="flex-1 overflow-y-auto pb-40 md:pb-28">
      {/* Hero Section - Mobile optimized */}
      <div 
        className="relative h-[320px] md:h-[340px] lg:h-[400px]"
        style={{
          background: `linear-gradient(transparent 0%, rgba(18,18,18,0.8) 100%), url(${artistProfile.headerImage}) center/cover`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#121212]" />
        
        {/* Back button */}
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 z-10 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>

        {/* Artist Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative">
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-[#3d91f4]">
                <path 
                  fill="currentColor" 
                  d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                />
              </svg>
            </div>
            <span className="text-white text-sm font-medium">Artista Verificada</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-2">
            {artistProfile.displayName}
          </h1>
          <p className="text-white/80 text-sm">
            {artistProfile.monthlyListeners} ouvinte mensal
          </p>
        </div>
      </div>

      {/* Action Buttons - Mobile style */}
      <div className="px-4 py-4 flex items-center justify-between bg-gradient-to-b from-[#121212]/80 to-[#121212] md:px-8 md:py-6">
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 border border-white/60 rounded-full text-white text-sm font-bold hover:border-white hover:scale-105 transition-all">
            Seguir
          </button>
          <button className="text-[#b3b3b3] hover:text-white transition-colors">
            <MoreHorizontal size={28} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-[#1DB954] hover:text-[#1ed760] transition-colors">
            <Shuffle size={24} />
          </button>
          <button 
            onClick={() => {
              if (isPlayingArtist && isPlaying) {
                onPlayPause()
              } else if (artistProfile.topTracks.length > 0) {
                onPlayTrack(artistProfile.topTracks[0])
              }
            }}
            className="w-14 h-14 bg-[#1DB954] rounded-full flex items-center justify-center hover:scale-105 hover:bg-[#1ed760] transition-all shadow-lg"
          >
            {isPlayingArtist && isPlaying ? (
              <Pause size={28} fill="black" className="text-black" />
            ) : (
              <Play size={28} fill="black" className="text-black ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* Popular Tracks */}
      <div className="px-4 md:px-8 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Populares</h2>
        <div className="space-y-1">
          {artistProfile.topTracks.map((track, index) => (
            <div 
              key={track.id}
              className="group flex items-center gap-3 px-2 py-2 rounded-md hover:bg-[#2a2a2a] active:bg-[#3a3a3a] transition-colors cursor-pointer"
              onClick={() => onPlayTrack(track)}
            >
              {/* Cover with number overlay on mobile */}
              <div className="relative w-12 h-12 flex-shrink-0">
                <img 
                  src={track.coverImage} 
                  alt={track.title}
                  className="w-full h-full rounded object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 active:opacity-100 md:hidden">
                  <Play size={20} fill="white" className="text-white" />
                </div>
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <p className={`text-[15px] font-medium truncate ${currentTrack?.id === track.id ? 'text-[#1DB954]' : 'text-white'}`}>
                  {track.title}
                </p>
                <div className="flex items-center gap-2 text-[13px] text-[#b3b3b3]">
                  <span>{track.plays}</span>
                </div>
              </div>

              {/* Duration - hidden on small mobile */}
              <div className="hidden sm:block text-[#b3b3b3] text-sm">
                {track.duration}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {track.lyrics && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      onShowLyrics(track)
                    }}
                    className="md:opacity-0 md:group-hover:opacity-100 transition-opacity text-[#b3b3b3] hover:text-white"
                  >
                    <Music size={18} />
                  </button>
                )}
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    onLike(track.id)
                  }}
                  className={`md:transition-opacity ${likedTracks.has(track.id) ? 'opacity-100' : 'md:opacity-0 md:group-hover:opacity-100'}`}
                >
                  <Heart 
                    size={20} 
                    className={likedTracks.has(track.id) ? 'fill-[#1DB954] text-[#1DB954]' : 'text-[#b3b3b3]'}
                  />
                </button>
                <button className="md:opacity-0 md:group-hover:opacity-100 transition-opacity text-[#b3b3b3] hover:text-white">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="px-4 md:px-8 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Sobre</h2>
        <div className="relative rounded-lg overflow-hidden">
          <img 
            src={artistProfile.profileImage} 
            alt={artistProfile.displayName}
            className="w-full h-[200px] md:h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white text-sm leading-relaxed mb-3">
              {artistProfile.bio}
            </p>
            <p className="text-white font-bold">
              {artistProfile.followers} seguidor
            </p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="px-4 md:px-8 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Galeria</h2>
        <div className="grid grid-cols-2 gap-2">
          {artistProfile.galleryImages?.map((image, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden">
              <img 
                src={image} 
                alt={`Foto ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Special Message */}
      <div className="px-4 md:px-8 mb-8">
        <div className="bg-gradient-to-br from-[#4c1d95] to-[#1e1b4b] rounded-xl p-5 text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            Para você, minha princesa
          </h2>
          <p className="text-white/80 text-sm">
            Cada nota que você canta é especial. Sua voz é a trilha sonora da minha vida.
          </p>
        </div>
      </div>
    </div>
  )
}
