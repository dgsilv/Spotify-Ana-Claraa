"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Track, playlists, getAllTracks } from "@/lib/music-data"
import { TrackRow } from "./track-row"
import Image from "next/image"

interface SearchViewProps {
  currentTrack: Track | null
  isPlaying: boolean
  likedTracks: Set<string>
  onPlayTrack: (track: Track) => void
  onLike: (trackId: string) => void
  onShowLyrics: (track: Track) => void
  onSelectPlaylist: (playlistId: string) => void
}

export function SearchView({
  currentTrack,
  isPlaying,
  likedTracks,
  onPlayTrack,
  onLike,
  onShowLyrics,
  onSelectPlaylist
}: SearchViewProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const allTracks = useMemo(() => getAllTracks(), [])

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    
    const query = searchQuery.toLowerCase()
    return allTracks.filter(track => 
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      (track.album && track.album.toLowerCase().includes(query))
    )
  }, [searchQuery, allTracks])

  const playlistResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    
    const query = searchQuery.toLowerCase()
    return playlists.filter(playlist => 
      playlist.name.toLowerCase().includes(query) ||
      playlist.description.toLowerCase().includes(query)
    )
  }, [searchQuery])

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="p-4 md:p-6">
        {/* Search Input */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b3b3b3]" size={20} />
          <input
            type="text"
            placeholder="O que você quer ouvir?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#242424] text-white rounded-full py-3 pl-10 pr-10 outline-none focus:ring-2 focus:ring-white/20 placeholder:text-[#b3b3b3]"
            autoFocus
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b3b3b3] hover:text-white"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Search Results */}
        {searchQuery.trim() ? (
          <div>
            {/* Playlist Results */}
            {playlistResults.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Playlists</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {playlistResults.map((playlist) => (
                    <div
                      key={playlist.id}
                      onClick={() => onSelectPlaylist(playlist.id)}
                      className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer group"
                    >
                      <div className="relative aspect-square mb-4 rounded-md overflow-hidden shadow-lg">
                        <Image
                          src={playlist.coverImage}
                          alt={playlist.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-white truncate">{playlist.name}</h3>
                      <p className="text-sm text-[#b3b3b3] truncate mt-1">{playlist.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Track Results */}
            {searchResults.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Músicas</h2>
                <div className="bg-[#181818]/50 rounded-lg">
                  {searchResults.map((track, index) => (
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
              </div>
            )}

            {/* No Results */}
            {searchResults.length === 0 && playlistResults.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#b3b3b3] text-lg">
                  Nenhum resultado encontrado para &quot;{searchQuery}&quot;
                </p>
                <p className="text-[#b3b3b3] mt-2">
                  Verifique se digitou corretamente ou tente buscar algo diferente.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Browse Categories */
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Navegar por tudo</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  onClick={() => onSelectPlaylist(playlist.id)}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                >
                  <Image
                    src={playlist.coverImage}
                    alt={playlist.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-3 left-3 font-bold text-white text-lg">
                    {playlist.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
