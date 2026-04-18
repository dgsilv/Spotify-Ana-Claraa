"use client"

import { useState } from "react"
import { Playlist, IMAGES, artistProfile } from "@/lib/music-data"
import { Play, ChevronRight, Settings, Bell, Clock } from "lucide-react"
import { SettingsModal } from "./settings-modal"

interface HomeViewProps {
  playlists: Playlist[]
  onSelectPlaylist: (playlist: Playlist) => void
  onGoToArtist: () => void
}

export function HomeView({ playlists, onSelectPlaylist, onGoToArtist }: HomeViewProps) {
  const [showSettings, setShowSettings] = useState(false)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Bom dia, Aninha"
    if (hour < 18) return "Boa tarde, Aninha"
    return "Boa noite, Aninha"
  }

  return (
    <div className="flex-1 overflow-y-auto pb-40 md:pb-28">
      {/* Header - Desktop */}
      <div className="hidden md:flex sticky top-0 z-20 bg-gradient-to-b from-[#1a1a40] via-[#1a1a40]/95 to-transparent">
        <div className="flex items-center justify-between w-full p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {getGreeting()}
          </h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={onGoToArtist}
              className="w-8 h-8 rounded-full overflow-hidden hover:scale-105 transition-transform"
            >
              <img 
                src={IMAGES.profilePhoto} 
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </button>
            <button 
              onClick={() => setShowSettings(true)}
              className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Header - Mobile (igual ao Spotify) */}
      <div className="md:hidden sticky top-0 z-20 bg-gradient-to-b from-[#1a1a40] via-[#1a1a40]/95 to-transparent">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onGoToArtist}
              className="w-8 h-8 rounded-full overflow-hidden"
            >
              <img 
                src={IMAGES.profilePhoto} 
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </button>
            <h1 className="text-[22px] font-bold text-white">
              {getGreeting()}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white">
              <Bell size={24} />
            </button>
            <button className="text-white">
              <Clock size={24} />
            </button>
            <button 
              onClick={() => setShowSettings(true)}
              className="text-white"
            >
              <Settings size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Grid - Desktop */}
      <div className="hidden md:block px-4 md:px-6 mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {/* Artist Quick Access */}
          <div 
            onClick={onGoToArtist}
            className="group flex items-center bg-[#2a2a2a]/80 hover:bg-[#3a3a3a]/80 rounded overflow-hidden cursor-pointer transition-all"
          >
            <img 
              src={IMAGES.profilePhoto} 
              alt="Minha Aninha"
              className="w-16 h-16 md:w-20 md:h-20 object-cover"
            />
            <span className="flex-1 px-4 text-sm md:text-base font-bold text-white truncate">
              Minha Aninha
            </span>
            <div className="w-12 h-12 rounded-full bg-[#1DB954] items-center justify-center mr-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex">
              <Play size={24} fill="black" className="text-black ml-0.5" />
            </div>
          </div>

          {/* Playlist Quick Access */}
          {playlists.map((playlist) => (
            <div 
              key={playlist.id}
              onClick={() => onSelectPlaylist(playlist)}
              className="group flex items-center bg-[#2a2a2a]/80 hover:bg-[#3a3a3a]/80 rounded overflow-hidden cursor-pointer transition-all"
            >
              <img 
                src={playlist.coverImage} 
                alt={playlist.name}
                className="w-16 h-16 md:w-20 md:h-20 object-cover"
              />
              <span className="flex-1 px-4 text-sm md:text-base font-bold text-white truncate">
                {playlist.name}
              </span>
              <div className="w-12 h-12 rounded-full bg-[#1DB954] items-center justify-center mr-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex">
                <Play size={24} fill="black" className="text-black ml-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access Grid - Mobile (igual ao Spotify) */}
      <div className="md:hidden px-3 mb-6">
        <div className="grid grid-cols-2 gap-2">
          {/* Artist Quick Access */}
          <div 
            onClick={onGoToArtist}
            className="flex items-center bg-[#2a2a2a]/80 rounded overflow-hidden h-[56px] active:bg-[#3a3a3a] transition-colors cursor-pointer"
          >
            <img 
              src={IMAGES.profilePhoto} 
              alt="Minha Aninha"
              className="w-[56px] h-[56px] object-cover"
            />
            <span className="flex-1 px-3 text-[13px] font-bold text-white truncate">
              Minha Aninha
            </span>
          </div>

          {/* Playlist Quick Access */}
          {playlists.slice(0, 5).map((playlist) => (
            <div 
              key={playlist.id}
              onClick={() => onSelectPlaylist(playlist)}
              className="flex items-center bg-[#2a2a2a]/80 rounded overflow-hidden h-[56px] active:bg-[#3a3a3a] transition-colors cursor-pointer"
            >
              <img 
                src={playlist.coverImage} 
                alt={playlist.name}
                className="w-[56px] h-[56px] object-cover"
              />
              <span className="flex-1 px-3 text-[13px] font-bold text-white truncate">
                {playlist.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Artist Section */}
      <section className="px-3 md:px-6 mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[22px] md:text-2xl font-bold text-white">
            Sua artista favorita
          </h2>
          <button 
            onClick={onGoToArtist}
            className="flex items-center gap-1 text-[#b3b3b3] hover:text-white text-sm font-bold transition-colors"
          >
            <span className="hidden md:inline">Ver tudo</span>
            <ChevronRight size={20} />
          </button>
        </div>
        <div 
          onClick={onGoToArtist}
          className="group bg-[#181818] hover:bg-[#282828] rounded-lg p-4 md:p-5 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
        >
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl mx-auto md:mx-0">
              <img 
                src={artistProfile.profileImage} 
                alt={artistProfile.displayName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 md:bottom-2 md:right-2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1DB954] items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hidden md:flex">
              <Play size={24} fill="black" className="text-black ml-0.5" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <span className="text-[#b3b3b3] text-xs uppercase tracking-wider">Artista</span>
            <h3 className="text-white font-bold text-xl md:text-3xl mt-1">
              {artistProfile.displayName}
            </h3>
            <p className="text-[#b3b3b3] text-sm mt-2 max-w-md">
              {artistProfile.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Playlists Section */}
      <section className="px-3 md:px-6 mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[22px] md:text-2xl font-bold text-white">
            Feito para você
          </h2>
        </div>
        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 -mx-3 px-3 md:mx-0 md:px-0 scrollbar-hide md:grid md:grid-cols-4 lg:grid-cols-5 md:overflow-visible">
          {playlists.map((playlist) => (
            <div 
              key={playlist.id}
              onClick={() => onSelectPlaylist(playlist)}
              className="group flex-shrink-0 w-[140px] md:w-auto flex flex-col p-3 md:p-4 bg-[#181818] hover:bg-[#282828] rounded-lg transition-all cursor-pointer"
            >
              <div className="relative mb-3 md:mb-4">
                <img 
                  src={playlist.coverImage} 
                  alt={playlist.name}
                  className="w-full aspect-square rounded-md shadow-lg object-cover"
                />
                <div className="absolute bottom-2 right-2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1DB954] items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hidden md:flex">
                  <Play size={20} fill="black" className="text-black ml-0.5" />
                </div>
              </div>
              <h3 className="text-white font-bold text-sm truncate mb-1">
                {playlist.name}
              </h3>
              <p className="text-[#b3b3b3] text-xs line-clamp-2">
                {playlist.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Special Message */}
      <section className="px-3 md:px-6 mb-8">
        <div className="bg-gradient-to-r from-[#1DB954]/20 to-[#1a1a40]/50 rounded-xl p-5 md:p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            Feliz Aniversário!
          </h2>
          <p className="text-[#b3b3b3] text-sm md:text-base max-w-lg mx-auto">
            Este é um presente especial feito com muito amor para você. Cada playlist foi pensada com carinho para celebrar nosso amor.
          </p>
        </div>
      </section>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  )
}
