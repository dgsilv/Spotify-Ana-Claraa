"use client"

import { Track } from "@/lib/music-data"
import { Play, Pause, Heart, MoreHorizontal, ExternalLink, Music } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TrackRowProps {
  track: Track
  index: number
  isPlaying: boolean
  isCurrentTrack: boolean
  isLiked: boolean
  onPlay: () => void
  onLike: () => void
  onShowLyrics: () => void
  showYoutubeOption?: boolean
}

export function TrackRow({
  track,
  index,
  isPlaying,
  isCurrentTrack,
  isLiked,
  onPlay,
  onLike,
  onShowLyrics,
  showYoutubeOption = false
}: TrackRowProps) {
  const handleOpenExternal = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (track.youtubeUrl) {
      window.open(track.youtubeUrl, "_blank")
    } else if (track.spotifyUrl && track.spotifyUrl !== "#") {
      window.open(track.spotifyUrl, "_blank")
    }
  }

  return (
    <div 
      className={`group flex items-center gap-3 px-2 py-2 md:px-4 md:py-2 rounded-md hover:bg-[#2a2a2a] active:bg-[#3a3a3a] transition-colors cursor-pointer ${
        isCurrentTrack ? 'bg-[#2a2a2a]' : ''
      }`}
      onClick={onPlay}
    >
      {/* Track Number / Play Button - Hidden on mobile */}
      <div className="hidden md:flex w-8 flex-shrink-0 items-center justify-center">
        <span className={`text-base group-hover:hidden ${isCurrentTrack ? 'text-[#1DB954]' : 'text-[#b3b3b3]'}`}>
          {isCurrentTrack && isPlaying ? (
            <div className="flex items-end gap-0.5 h-4">
              <div className="w-0.5 bg-[#1DB954] animate-bounce" style={{ height: '60%', animationDelay: '0ms' }} />
              <div className="w-0.5 bg-[#1DB954] animate-bounce" style={{ height: '100%', animationDelay: '150ms' }} />
              <div className="w-0.5 bg-[#1DB954] animate-bounce" style={{ height: '40%', animationDelay: '300ms' }} />
            </div>
          ) : (
            index + 1
          )}
        </span>
        <button className="hidden group-hover:block text-white">
          {isCurrentTrack && isPlaying ? (
            <Pause size={16} fill="currentColor" />
          ) : (
            <Play size={16} fill="currentColor" />
          )}
        </button>
      </div>

      {/* Track Info - Mobile optimized */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative flex-shrink-0">
          <img 
            src={track.coverImage} 
            alt={track.title}
            className="w-12 h-12 rounded object-cover"
          />
          {/* Play indicator on mobile */}
          <div className="md:hidden absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 active:opacity-100">
            <Play size={20} fill="white" className="text-white" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className={`text-[15px] font-medium truncate ${isCurrentTrack ? 'text-[#1DB954]' : 'text-white'}`}>
            {track.title}
          </p>
          <p className="text-[13px] text-[#b3b3b3] truncate">
            {track.artist}
          </p>
        </div>
      </div>

      {/* Album (hidden on mobile) */}
      <div className="hidden lg:block flex-1 min-w-0">
        <p className="text-sm text-[#b3b3b3] truncate hover:underline cursor-pointer">
          {track.album}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Like button - sempre visível no mobile */}
        <button 
          onClick={(e) => {
            e.stopPropagation()
            onLike()
          }}
          className={`md:transition-opacity ${
            isLiked ? 'opacity-100' : 'md:opacity-0 md:group-hover:opacity-100'
          }`}
        >
          <Heart 
            size={20} 
            className={`transition-colors ${isLiked ? 'fill-[#1DB954] text-[#1DB954]' : 'text-[#b3b3b3]'}`}
          />
        </button>

        <span className="text-sm text-[#b3b3b3] hidden md:block w-12 text-right">
          {track.duration}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <button className="md:opacity-0 md:group-hover:opacity-100 transition-opacity text-[#b3b3b3] hover:text-white p-1">
              <MoreHorizontal size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#282828] border-[#3e3e3e] text-white min-w-[200px]">
            <DropdownMenuItem 
              onClick={(e) => {
                e.stopPropagation()
                onLike()
              }}
              className="hover:bg-[#3e3e3e] cursor-pointer py-3"
            >
              <Heart size={18} className={`mr-3 ${isLiked ? 'fill-[#1DB954] text-[#1DB954]' : ''}`} />
              {isLiked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            </DropdownMenuItem>
            {track.lyrics && (
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation()
                  onShowLyrics()
                }}
                className="hover:bg-[#3e3e3e] cursor-pointer py-3"
              >
                <Music size={18} className="mr-3" />
                Ver letra
              </DropdownMenuItem>
            )}
            {track.youtubeUrl && (
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(track.youtubeUrl, "_blank")
                }}
                className="hover:bg-[#3e3e3e] cursor-pointer py-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-3">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Ouvir no YouTube
              </DropdownMenuItem>
            )}
            {track.spotifyUrl && track.spotifyUrl !== "#" && (
              <DropdownMenuItem 
                onClick={handleOpenExternal}
                className="hover:bg-[#3e3e3e] cursor-pointer py-3"
              >
                <ExternalLink size={18} className="mr-3" />
                Abrir no Spotify
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
