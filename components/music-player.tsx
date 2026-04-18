"use client"

import { useState, useEffect, useRef } from "react"
import { Track } from "@/lib/music-data"
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Heart,
  Maximize2,
  ListMusic,
  Music,
  Smartphone
} from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface MusicPlayerProps {
  currentTrack: Track | null
  isPlaying: boolean
  onPlayPause: () => void
  onLike: (trackId: string) => void
  likedTracks: Set<string>
  onShowLyrics?: (track: Track) => void
}

export function MusicPlayer({ 
  currentTrack, 
  isPlaying, 
  onPlayPause, 
  onLike,
  likedTracks,
  onShowLyrics
}: MusicPlayerProps) {
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying && currentTrack) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0
          }
          return prev + (100 / (currentTrack.durationMs / 1000))
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, currentTrack])

  useEffect(() => {
    setProgress(0)
  }, [currentTrack?.id])

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const currentTime = currentTrack 
    ? formatTime((progress / 100) * currentTrack.durationMs)
    : "0:00"

  const totalTime = currentTrack?.duration || "0:00"

  const isLiked = currentTrack ? likedTracks.has(currentTrack.id) : false

  const handleOpenExternal = () => {
    if (currentTrack?.youtubeUrl) {
      window.open(currentTrack.youtubeUrl, "_blank")
    } else if (currentTrack?.spotifyUrl && currentTrack.spotifyUrl !== "#") {
      window.open(currentTrack.spotifyUrl, "_blank")
    }
  }

  if (!currentTrack) {
    return null
  }

  return (
    <>
      {/* Mobile Mini Player - igual ao Spotify real */}
      <div className="md:hidden fixed bottom-[56px] left-2 right-2 z-50">
        <div 
          className="bg-[#382b47] rounded-lg overflow-hidden shadow-xl"
          onClick={onPlayPause}
        >
          {/* Progress bar no topo */}
          <div className="h-[2px] bg-[#5a4d6d]">
            <div 
              className="h-full bg-white transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex items-center gap-3 p-2 pr-3">
            {/* Album Art */}
            <img 
              src={currentTrack.coverImage} 
              alt={currentTrack.title}
              className="w-10 h-10 rounded object-cover"
            />
            
            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {currentTrack.title}
              </p>
              <p className="text-[#b3b3b3] text-xs truncate">
                {currentTrack.artist}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  onLike(currentTrack.id)
                }}
                className="p-1"
              >
                <Heart 
                  size={22} 
                  className={`transition-colors ${isLiked ? 'fill-[#1DB954] text-[#1DB954]' : 'text-white'}`}
                />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  onPlayPause()
                }}
                className="p-1"
              >
                {isPlaying ? (
                  <Pause size={24} className="text-white" fill="white" />
                ) : (
                  <Play size={24} className="text-white" fill="white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Player - como no Spotify real */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 h-[90px] bg-[#181818] border-t border-[#282828] px-4 z-50">
        <div className="h-full max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
          {/* Track Info - Left */}
          <div className="flex items-center gap-3 min-w-0 w-[30%]">
            <div className="w-14 h-14 flex-shrink-0 rounded overflow-hidden">
              <img 
                src={currentTrack.coverImage} 
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-normal truncate hover:underline cursor-pointer">
                {currentTrack.title}
              </p>
              <p className="text-[#b3b3b3] text-xs truncate hover:underline cursor-pointer hover:text-white">
                {currentTrack.artist}
              </p>
            </div>
            <button 
              onClick={() => onLike(currentTrack.id)}
              className="ml-2 flex-shrink-0"
            >
              <Heart 
                size={16} 
                className={`transition-colors ${isLiked ? 'fill-[#1DB954] text-[#1DB954]' : 'text-[#b3b3b3] hover:text-white'}`}
              />
            </button>
          </div>

          {/* Player Controls - Center */}
          <div className="flex flex-col items-center gap-2 max-w-[40%] w-full">
            <div className="flex items-center gap-5">
              <button 
                onClick={() => setShuffle(!shuffle)}
                className={`transition-colors ${shuffle ? 'text-[#1DB954]' : 'text-[#b3b3b3] hover:text-white'}`}
              >
                <Shuffle size={18} />
              </button>
              <button className="text-[#b3b3b3] hover:text-white transition-colors">
                <SkipBack size={20} fill="currentColor" />
              </button>
              <button 
                onClick={onPlayPause}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <Pause size={18} fill="black" className="text-black" />
                ) : (
                  <Play size={18} fill="black" className="text-black ml-0.5" />
                )}
              </button>
              <button className="text-[#b3b3b3] hover:text-white transition-colors">
                <SkipForward size={20} fill="currentColor" />
              </button>
              <button 
                onClick={() => setRepeat(!repeat)}
                className={`transition-colors ${repeat ? 'text-[#1DB954]' : 'text-[#b3b3b3] hover:text-white'}`}
              >
                <Repeat size={18} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full flex items-center gap-2 group">
              <span className="text-[#b3b3b3] text-xs w-10 text-right">
                {currentTime}
              </span>
              <div className="flex-1">
                <Slider
                  value={[progress]}
                  onValueChange={(value) => setProgress(value[0])}
                  max={100}
                  step={0.1}
                  className="cursor-pointer"
                />
              </div>
              <span className="text-[#b3b3b3] text-xs w-10">
                {totalTime}
              </span>
            </div>
          </div>

          {/* Volume Controls - Right */}
          <div className="flex items-center gap-2 justify-end w-[30%]">
            {currentTrack.lyrics && onShowLyrics && (
              <button 
                onClick={() => onShowLyrics(currentTrack)}
                className="text-[#b3b3b3] hover:text-white transition-colors"
                title="Ver letra"
              >
                <Music size={18} />
              </button>
            )}
            <button className="text-[#b3b3b3] hover:text-white transition-colors">
              <ListMusic size={18} />
            </button>
            <button className="text-[#b3b3b3] hover:text-white transition-colors">
              <Smartphone size={18} />
            </button>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="text-[#b3b3b3] hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <div className="w-24 group">
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={(value) => {
                  setVolume(value[0])
                  setIsMuted(false)
                }}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
            <button className="text-[#b3b3b3] hover:text-white transition-colors ml-2">
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
