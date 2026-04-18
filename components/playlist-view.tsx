"use client"

import { useState } from "react"
import { Playlist, Track } from "@/lib/music-data"
import { TrackRow } from "./track-row"
import { Play, Pause, Heart, MoreHorizontal, Clock, ArrowLeft, Shuffle } from "lucide-react"
import { LyricsModal } from "./lyrics-modal"

interface PlaylistViewProps {
  playlist: Playlist
  currentTrack: Track | null
  isPlaying: boolean
  likedTracks: Set<string>
  onBack: () => void
  onPlayTrack: (track: Track) => void
  onLike: (trackId: string) => void
  onPlayPause: () => void
  onShowLyrics?: (track: Track) => void
}

export function PlaylistView({
  playlist,
  currentTrack,
  isPlaying,
  likedTracks,
  onBack,
  onPlayTrack,
  onLike,
  onPlayPause,
  onShowLyrics
}: PlaylistViewProps) {
  const [showLocalLyrics, setShowLocalLyrics] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)

  const handleShowLyrics = (track: Track) => {
    if (onShowLyrics) {
      onShowLyrics(track)
    } else {
      setSelectedTrack(track)
      setShowLocalLyrics(true)
    }
  }

  const totalDuration = playlist.tracks.reduce((acc, track) => acc + track.durationMs, 0)
  const formatTotalDuration = (ms: number) => {
    const totalMinutes = Math.floor(ms / 60000)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    if (hours > 0) {
      return `${hours} h ${minutes} min`
    }
    return `${minutes} min`
  }

  const isPlayingPlaylist = currentTrack && playlist.tracks.some(t => t.id === currentTrack.id)

  return (
    <div className="flex-1 overflow-y-auto pb-40 md:pb-28">
      {/* Header with gradient - Mobile style */}
      <div 
        className="relative"
        style={{
          background: `linear-gradient(transparent 0%, rgba(18,18,18,0.5) 100%), url(${playlist.coverImage}) center/cover`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#121212]/60 to-[#121212]" />
        
        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between p-4">
          <button 
            onClick={onBack}
            className="w-8 h-8 bg-black/40 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
        </div>

        <div className="relative z-10 px-4 pt-4 pb-6 flex flex-col items-center md:flex-row md:items-end md:gap-6 md:px-8 md:pt-12">
          <img 
            src={playlist.coverImage} 
            alt={playlist.name}
            className="w-[180px] h-[180px] md:w-56 md:h-56 shadow-2xl object-cover"
          />
          <div className="mt-4 text-center md:text-left md:mt-0">
            <p className="text-xs font-medium text-white/80 uppercase tracking-wider mb-1 hidden md:block">
              Playlist
            </p>
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-2 line-clamp-2">
              {playlist.name}
            </h1>
            <p className="text-sm text-white/70 mb-2 hidden md:block">
              {playlist.description}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-1 text-sm text-white/80">
              <span className="font-semibold text-white">Para Minha Aninha</span>
              <span className="mx-1">•</span>
              <span>{playlist.tracks.length} músicas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions - Mobile style */}
      <div className="px-4 py-4 flex items-center justify-between bg-gradient-to-b from-[#121212]/50 to-[#121212] md:px-8 md:py-6">
        <div className="flex items-center gap-4">
          <button className="text-[#b3b3b3] hover:text-white transition-colors">
            <Heart size={28} className={playlist.tracks.some(t => likedTracks.has(t.id)) ? 'fill-[#1DB954] text-[#1DB954]' : ''} />
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
              if (isPlayingPlaylist && isPlaying) {
                onPlayPause()
              } else if (playlist.tracks.length > 0) {
                onPlayTrack(playlist.tracks[0])
              }
            }}
            className="w-14 h-14 bg-[#1DB954] rounded-full flex items-center justify-center hover:scale-105 hover:bg-[#1ed760] transition-all shadow-lg"
          >
            {isPlayingPlaylist && isPlaying ? (
              <Pause size={28} fill="black" className="text-black" />
            ) : (
              <Play size={28} fill="black" className="text-black ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* Track List Header - Hidden on mobile */}
      <div className="hidden md:flex items-center gap-4 px-8 py-2 border-b border-[#282828] text-[#b3b3b3] text-sm sticky top-0 bg-[#121212] z-10">
        <div className="w-8 text-center">#</div>
        <div className="flex-1">Título</div>
        <div className="hidden lg:block flex-1">Álbum</div>
        <div className="w-16 flex justify-center">
          <Clock size={16} />
        </div>
      </div>

      {/* Track List */}
      <div className="px-2 md:px-4">
        {playlist.tracks.map((track, index) => (
          <TrackRow
            key={track.id}
            track={track}
            index={index}
            isPlaying={isPlaying}
            isCurrentTrack={currentTrack?.id === track.id}
            isLiked={likedTracks.has(track.id)}
            onPlay={() => onPlayTrack(track)}
            onLike={() => onLike(track.id)}
            onShowLyrics={() => handleShowLyrics(track)}
            showYoutubeOption={playlist.isSpecial}
          />
        ))}
      </div>

      {/* Lyrics Modal (fallback) */}
      {showLocalLyrics && selectedTrack && (
        <LyricsModal
          track={selectedTrack}
          onClose={() => setShowLocalLyrics(false)}
        />
      )}
    </div>
  )
}
