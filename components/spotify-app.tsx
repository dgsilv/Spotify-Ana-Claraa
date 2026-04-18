"use client"

import { useState, useCallback } from "react"
import { playlists, Track, Playlist } from "@/lib/music-data"
import { LoginPage } from "./login-page"
import { Sidebar } from "./sidebar"
import { MobileNav } from "./mobile-nav"
import { HomeView } from "./home-view"
import { LibraryView } from "./library-view"
import { PlaylistView } from "./playlist-view"
import { ArtistProfile } from "./artist-profile"
import { MusicPlayer } from "./music-player"
import { PasswordModal } from "./password-modal"
import { SpecialIntro } from "./special-intro"
import { LyricsModal } from "./lyrics-modal"
import { SearchView } from "./search-view"
import { LikedSongsView } from "./liked-songs-view"

type View = "home" | "library" | "playlist" | "artist" | "search" | "liked"

export function SpotifyApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentView, setCurrentView] = useState<View>("home")
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set())
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showSpecialIntro, setShowSpecialIntro] = useState(false)
  const [pendingPlaylist, setPendingPlaylist] = useState<Playlist | null>(null)
  const [unlockedPlaylists, setUnlockedPlaylists] = useState<Set<string>>(new Set())
  const [showLyrics, setShowLyrics] = useState(false)
  const [lyricsTrack, setLyricsTrack] = useState<Track | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true)
  }, [])

  const handleSelectPlaylist = useCallback((playlist: Playlist) => {
    if (playlist.requiresPassword && !unlockedPlaylists.has(playlist.id)) {
      setPendingPlaylist(playlist)
      setShowPasswordModal(true)
    } else {
      setSelectedPlaylist(playlist)
      setCurrentView("playlist")
    }
  }, [unlockedPlaylists])

  const handleSelectPlaylistById = useCallback((playlistId: string) => {
    const playlist = playlists.find(p => p.id === playlistId)
    if (playlist) {
      handleSelectPlaylist(playlist)
    }
  }, [handleSelectPlaylist])

  const handlePasswordSuccess = useCallback(() => {
    setShowPasswordModal(false)
    // Após digitar a senha correta, mostrar o intro com as frases
    setShowSpecialIntro(true)
  }, [])

  const handleSpecialIntroComplete = useCallback(() => {
    setShowSpecialIntro(false)
    if (pendingPlaylist) {
      setUnlockedPlaylists((prev) => new Set(prev).add(pendingPlaylist.id))
      setSelectedPlaylist(pendingPlaylist)
      setCurrentView("playlist")
      setPendingPlaylist(null)
    }
  }, [pendingPlaylist])

  const handleGoHome = useCallback(() => {
    setCurrentView("home")
    setSelectedPlaylist(null)
  }, [])

  const handleGoToLibrary = useCallback(() => {
    setCurrentView("library")
    setSelectedPlaylist(null)
  }, [])

  const handleGoToArtist = useCallback(() => {
    setCurrentView("artist")
    setSelectedPlaylist(null)
  }, [])

  const handleGoToSearch = useCallback(() => {
    setCurrentView("search")
    setSelectedPlaylist(null)
  }, [])

  const handleGoToLiked = useCallback(() => {
    setCurrentView("liked")
    setSelectedPlaylist(null)
  }, [])

  const handlePlayTrack = useCallback((track: Track) => {
    // Se a música tiver YouTube URL, abre direto no YouTube
    if (track.youtubeUrl) {
      window.open(track.youtubeUrl, "_blank")
      return
    }
    
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentTrack(track)
      setIsPlaying(true)
    }
  }, [currentTrack, isPlaying])

  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const handleLike = useCallback((trackId: string) => {
    setLikedTracks((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(trackId)) {
        newSet.delete(trackId)
      } else {
        newSet.add(trackId)
      }
      return newSet
    })
  }, [])

  const handleShowLyrics = useCallback((track: Track) => {
    setLyricsTrack(track)
    setShowLyrics(true)
  }, [])

  // Login Screen
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="h-screen flex flex-col bg-[#121212] overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Desktop */}
        <Sidebar 
          playlists={playlists}
          likedTracksCount={likedTracks.size}
          onSelectPlaylist={handleSelectPlaylist}
          onGoHome={handleGoHome}
          onGoToArtist={handleGoToArtist}
          onGoToSearch={handleGoToSearch}
          onGoToLiked={handleGoToLiked}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col bg-[#121212] overflow-hidden">
          {currentView === "home" && (
            <HomeView 
              playlists={playlists}
              onSelectPlaylist={handleSelectPlaylist}
              onGoToArtist={handleGoToArtist}
            />
          )}

          {currentView === "library" && (
            <LibraryView 
              playlists={playlists}
              likedTracksCount={likedTracks.size}
              onSelectPlaylist={handleSelectPlaylist}
              onGoToArtist={handleGoToArtist}
              onGoToLiked={handleGoToLiked}
            />
          )}

          {currentView === "search" && (
            <SearchView
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              likedTracks={likedTracks}
              onPlayTrack={handlePlayTrack}
              onLike={handleLike}
              onShowLyrics={handleShowLyrics}
              onSelectPlaylist={handleSelectPlaylistById}
            />
          )}

          {currentView === "liked" && (
            <LikedSongsView
              likedTracks={likedTracks}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onBack={handleGoHome}
              onPlayTrack={handlePlayTrack}
              onLike={handleLike}
              onPlayPause={handlePlayPause}
              onShowLyrics={handleShowLyrics}
            />
          )}

          {currentView === "playlist" && selectedPlaylist && (
            <PlaylistView 
              playlist={selectedPlaylist}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              likedTracks={likedTracks}
              onBack={handleGoHome}
              onPlayTrack={handlePlayTrack}
              onLike={handleLike}
              onPlayPause={handlePlayPause}
              onShowLyrics={handleShowLyrics}
            />
          )}

          {currentView === "artist" && (
            <ArtistProfile 
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              likedTracks={likedTracks}
              onBack={handleGoHome}
              onPlayTrack={handlePlayTrack}
              onLike={handleLike}
              onPlayPause={handlePlayPause}
              onShowLyrics={handleShowLyrics}
            />
          )}
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav 
        currentView={currentView}
        onGoHome={handleGoHome}
        onGoToSearch={handleGoToSearch}
        onGoToLibrary={handleGoToLibrary}
        onGoToProfile={handleGoToArtist}
      />

      {/* Music Player */}
      <MusicPlayer 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onLike={handleLike}
        likedTracks={likedTracks}
        onShowLyrics={handleShowLyrics}
      />

      {/* Password Modal */}
      {showPasswordModal && (
        <PasswordModal 
          onSuccess={handlePasswordSuccess}
          onClose={() => {
            setShowPasswordModal(false)
            setPendingPlaylist(null)
          }}
        />
      )}

      {/* Special Intro (frases) */}
      {showSpecialIntro && (
        <SpecialIntro 
          onComplete={handleSpecialIntroComplete}
          onClose={() => {
            setShowSpecialIntro(false)
            setPendingPlaylist(null)
          }}
        />
      )}

      {/* Lyrics Modal */}
      {showLyrics && lyricsTrack && (
        <LyricsModal 
          track={lyricsTrack}
          onClose={() => {
            setShowLyrics(false)
            setLyricsTrack(null)
          }}
        />
      )}
    </div>
  )
}
