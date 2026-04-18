"use client"

import { Playlist, IMAGES, artistProfile } from "@/lib/music-data"
import { Heart, Plus, Grid3X3, List, ArrowDownAZ } from "lucide-react"

interface LibraryViewProps {
  playlists: Playlist[]
  likedTracksCount?: number
  onSelectPlaylist: (playlist: Playlist) => void
  onGoToArtist: () => void
  onGoToLiked?: () => void
}

export function LibraryView({ 
  playlists, 
  likedTracksCount = 0,
  onSelectPlaylist, 
  onGoToArtist,
  onGoToLiked
}: LibraryViewProps) {
  return (
    <div className="flex-1 overflow-y-auto pb-36 md:pb-28">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#121212]">
        <div className="flex items-center justify-between p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Sua Biblioteca
          </h1>
          <button className="w-8 h-8 rounded-full bg-[#282828] flex items-center justify-center text-white hover:bg-[#3a3a3a] transition-colors">
            <Plus size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 px-4 md:px-6 pb-4 overflow-x-auto scrollbar-hide">
          <button className="px-4 py-1.5 bg-[#282828] hover:bg-[#3a3a3a] rounded-full text-white text-sm font-medium whitespace-nowrap transition-colors">
            Playlists
          </button>
          <button className="px-4 py-1.5 bg-transparent hover:bg-[#282828] rounded-full text-white text-sm font-medium whitespace-nowrap transition-colors">
            Artistas
          </button>
          <button className="px-4 py-1.5 bg-transparent hover:bg-[#282828] rounded-full text-white text-sm font-medium whitespace-nowrap transition-colors">
            Álbuns
          </button>
        </div>

        {/* Sort & View Options */}
        <div className="flex items-center justify-between px-4 md:px-6 pb-2">
          <button className="flex items-center gap-1 text-[#b3b3b3] hover:text-white text-sm">
            <ArrowDownAZ size={16} />
            <span>Recentes</span>
          </button>
          <div className="flex items-center gap-2">
            <button className="text-[#b3b3b3] hover:text-white">
              <List size={20} />
            </button>
            <button className="text-white">
              <Grid3X3 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-6">
        {/* Liked Songs */}
        <button 
          onClick={onGoToLiked}
          className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-[#282828] transition-colors mb-2"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded bg-gradient-to-br from-[#450af5] to-[#c4efd9] flex items-center justify-center flex-shrink-0">
            <Heart size={20} className="text-white" fill="white" />
          </div>
          <div className="text-left min-w-0 flex-1">
            <p className="text-white font-semibold truncate">Músicas Curtidas</p>
            <p className="text-[#b3b3b3] text-sm truncate">
              Playlist {likedTracksCount > 0 && `• ${likedTracksCount} ${likedTracksCount === 1 ? 'música' : 'músicas'}`}
            </p>
          </div>
        </button>

        {/* Artist */}
        <button 
          onClick={onGoToArtist}
          className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-[#282828] transition-colors mb-2"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={IMAGES.profilePhoto} 
              alt="Minha Aninha"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left min-w-0 flex-1">
            <p className="text-white font-semibold truncate">{artistProfile.displayName}</p>
            <p className="text-[#b3b3b3] text-sm truncate">Artista</p>
          </div>
        </button>

        {/* Playlists */}
        {playlists.map((playlist) => (
          <button 
            key={playlist.id}
            onClick={() => onSelectPlaylist(playlist)}
            className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-[#282828] transition-colors mb-2"
          >
            <img 
              src={playlist.coverImage} 
              alt={playlist.name}
              className="w-14 h-14 md:w-16 md:h-16 rounded flex-shrink-0 object-cover"
            />
            <div className="text-left min-w-0 flex-1">
              <p className="text-white font-semibold truncate">{playlist.name}</p>
              <p className="text-[#b3b3b3] text-sm truncate">Playlist • {playlist.tracks.length} músicas</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
