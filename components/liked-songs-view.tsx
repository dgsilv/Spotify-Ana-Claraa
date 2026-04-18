"use client"

import { useMemo } from "react"
import { ChevronLeft, Play, Pause, Heart, Clock } from "lucide-react"
import { Track, getAllTracks } from "@/lib/music-data"
import { TrackRow } from "./track-row"
import Image from "next/image"

interface LikedSongsViewProps {
  likedTracks: Set<string>
  currentTrack: Track | null
  isPlaying: boolean
  onBack: () => void
  onPlayTrack: (track: Track) => void
  onLike: (trackId: string) => void
  onPlayPause: () => void
  onShowLyrics: (track: Track) => void
}

export function LikedSongsView({
  likedTracks,
  currentTrack,
  isPlaying,
  onBack,
  onPlayTrack,
  onLike,
  onPlayPause,
  onShowLyrics
}: LikedSongsViewProps) {
  const allTracks = useMemo(() => getAllTracks(), [])
  
  const likedTracksList = useMemo(() => {
    return allTracks.filter(track => likedTracks.has(track.id))
  }, [allTracks, likedTracks])

  const totalDuration = useMemo(() => {
    const totalMs = likedTracksList.reduce((acc, track) => acc + track.durationMs, 0)
    const minutes = Math.floor(totalMs / 60000)
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    
    if (hours > 0) {
      return `${hours} h ${remainingMinutes} min`
    }
    return `${minutes} min`
  }, [likedTracksList])

  const isCurrentPlaylistPlaying = likedTracksList.some(track => track.id === currentTrack?.id) && isPlaying

  const handlePlayAll = () => {
    if (likedTracksList.length === 0) return
    
    if (isCurrentPlaylistPlaying) {
      onPlayPause()
    } else if (currentTrack && likedTracks.has(currentTrack.id)) {
      onPlayPause()
    } else {
      onPlayTrack(likedTracksList[0])
    }
  }

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      {/* Header with gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5038a0] via-[#3b2a7a] to-[#121212]" />
        
        {/* Back button */}
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 z-10 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors md:hidden"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>

        <div className="relative px-4 pt-16 pb-6 md:px-6 md:pt-20 md:pb-8">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            {/* Liked Songs Icon */}
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-md shadow-2xl bg-gradient-to-br from-[#4b2cd4] to-[#8e8ee5] flex items-center justify-center mx-auto md:mx-0 flex-shrink-0">
              <Heart size={80} className="text-white fill-white" />
            </div>
            
            {/* Info */}
            <div className="text-center md:text-left">
              <p className="text-sm text-white/80 font-medium mb-1 md:mb-2">Playlist</p>
              <h1 className="text-2xl md:text-5xl lg:text-7xl font-black text-white mb-2 md:mb-4">
                Músicas Curtidas
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-1 text-sm text-white/80">
                <span className="font-semibold text-white">Aninha</span>
                <span className="mx-1">-</span>
                <span>{likedTracksList.length} músicas</span>
                {likedTracksList.length > 0 && (
                  <>
                    <span className="mx-1">-</span>
                    <span>{totalDuration}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 md:px-6 py-4 flex items-center gap-4 bg-gradient-to-b from-[#121212]/50 to-[#121212]">
        <button 
          onClick={handlePlayAll}
          disabled={likedTracksList.length === 0}
          className="w-14 h-14 bg-[#1DB954] rounded-full flex items-center justify-center hover:scale-105 transition-transform hover:bg-[#1ed760] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCurrentPlaylistPlaying ? (
            <Pause size={28} className="text-black" fill="black" />
          ) : (
            <Play size={28} className="text-black ml-1" fill="black" />
          )}
        </button>
      </div>

      {/* Track List */}
      {likedTracksList.length > 0 ? (
        <div className="px-4 md:px-6">
          {/* Table Header - Desktop */}
          <div className="hidden md:grid grid-cols-[16px_4fr_3fr_minmax(80px,1fr)] gap-4 px-4 py-2 text-[#b3b3b3] text-sm border-b border-[#282828] mb-2">
            <span>#</span>
            <span>Título</span>
            <span>Álbum</span>
            <span className="flex justify-end">
              <Clock size={16} />
            </span>
          </div>

          {/* Tracks */}
          {likedTracksList.map((track, index) => (
            <TrackRow
              key={track.id}
              track={track}
              index={index}
              isPlaying={currentTrack?.id === track.id && isPlaying}
              isCurrentTrack={currentTrack?.id === track.id}
              isLiked={likedTracks.has(track.id)}
              onPlay={() => onPlayTrack(track)}
              onLike={() => onLike(track.id)}
              onShowLyrics={() => onShowLyrics(track)}
            />
          ))}
        </div>
      ) : (
        <div className="px-4 md:px-6 py-12 text-center">
          <Heart size={48} className="text-[#b3b3b3] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            Músicas que você curtir vão aparecer aqui
          </h3>
          <p className="text-[#b3b3b3]">
            Salve músicas tocando no ícone de coração.
          </p>
        </div>
      )}
    </div>
  )
}
