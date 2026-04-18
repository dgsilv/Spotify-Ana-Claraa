"use client"

import { SpotifyLogo } from "./spotify-logo"
import { Playlist, IMAGES } from "@/lib/music-data"
import { Home, Search, Library, Plus, Heart, ChevronRight, ChevronLeft } from "lucide-react"

interface SidebarProps {
  playlists: Playlist[]
  likedTracksCount?: number
  onSelectPlaylist: (playlist: Playlist) => void
  onGoHome: () => void
  onGoToArtist: () => void
  onGoToSearch?: () => void
  onGoToLiked?: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export function Sidebar({ 
  playlists, 
  likedTracksCount = 0,
  onSelectPlaylist, 
  onGoHome, 
  onGoToArtist,
  onGoToSearch,
  onGoToLiked,
  isCollapsed = false,
  onToggleCollapse
}: SidebarProps) {
  return (
    <aside className={`hidden md:flex flex-col bg-[#000000] h-full transition-all duration-300 ${
      isCollapsed ? 'w-[72px]' : 'w-[280px] lg:w-[320px]'
    }`}>
      {/* Logo */}
      <div className="p-4 md:p-6">
        <SpotifyLogo size={isCollapsed ? 32 : 36} showText={!isCollapsed} />
      </div>

      {/* Navigation */}
      <nav className="px-2 md:px-3">
        <button 
          onClick={onGoHome}
          className={`w-full flex items-center gap-4 px-3 py-2 rounded-md text-[#b3b3b3] hover:text-white transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <Home size={24} />
          {!isCollapsed && <span className="font-semibold">Início</span>}
        </button>
        <button 
          onClick={onGoToSearch}
          className={`w-full flex items-center gap-4 px-3 py-2 rounded-md text-[#b3b3b3] hover:text-white transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <Search size={24} />
          {!isCollapsed && <span className="font-semibold">Buscar</span>}
        </button>
      </nav>

      {/* Library */}
      <div className="flex-1 mt-4 mx-2 bg-[#121212] rounded-lg overflow-hidden flex flex-col">
        <div className={`p-3 md:p-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <button className={`flex items-center gap-2 text-[#b3b3b3] hover:text-white transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}>
            <Library size={24} />
            {!isCollapsed && <span className="font-semibold">Sua Biblioteca</span>}
          </button>
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full hover:bg-[#282828] flex items-center justify-center text-[#b3b3b3] hover:text-white transition-colors">
                <Plus size={18} />
              </button>
              {onToggleCollapse && (
                <button 
                  onClick={onToggleCollapse}
                  className="w-8 h-8 rounded-full hover:bg-[#282828] flex items-center justify-center text-[#b3b3b3] hover:text-white transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Playlists */}
        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {/* Liked Songs */}
          <button 
            onClick={onGoToLiked}
            className={`w-full flex items-center gap-3 p-2 rounded-md hover:bg-[#282828] transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded bg-gradient-to-br from-[#450af5] to-[#c4efd9] flex items-center justify-center flex-shrink-0">
              <Heart size={14} className="text-white" fill="white" />
            </div>
            {!isCollapsed && (
              <div className="text-left min-w-0">
                <p className="text-white text-sm font-normal truncate">Músicas Curtidas</p>
                <p className="text-[#b3b3b3] text-xs truncate">
                  Playlist {likedTracksCount > 0 && `- ${likedTracksCount} ${likedTracksCount === 1 ? 'música' : 'músicas'}`}
                </p>
              </div>
            )}
          </button>

          {/* Artist */}
          <button 
            onClick={onGoToArtist}
            className={`w-full flex items-center gap-3 p-2 rounded-md hover:bg-[#282828] transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={IMAGES.profilePhoto} 
                alt="Minha Aninha"
                className="w-full h-full object-cover"
              />
            </div>
            {!isCollapsed && (
              <div className="text-left min-w-0">
                <p className="text-white text-sm font-normal truncate">Minha Aninha</p>
                <p className="text-[#b3b3b3] text-xs truncate">Artista</p>
              </div>
            )}
          </button>

          {/* Playlists */}
          {playlists.map((playlist) => (
            <button 
              key={playlist.id}
              onClick={() => onSelectPlaylist(playlist)}
              className={`w-full flex items-center gap-3 p-2 rounded-md hover:bg-[#282828] transition-colors ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <img 
                src={playlist.coverImage} 
                alt={playlist.name}
                className="w-10 h-10 md:w-12 md:h-12 rounded flex-shrink-0 object-cover"
              />
              {!isCollapsed && (
                <div className="text-left min-w-0">
                  <p className="text-white text-sm font-normal truncate">{playlist.name}</p>
                  <p className="text-[#b3b3b3] text-xs truncate">Playlist</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Collapse Toggle (when collapsed) */}
      {isCollapsed && onToggleCollapse && (
        <div className="p-2">
          <button 
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center p-2 rounded-md hover:bg-[#282828] text-[#b3b3b3] hover:text-white transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </aside>
  )
}
