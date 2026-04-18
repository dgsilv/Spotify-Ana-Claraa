"use client"

import { Home, Search, Library } from "lucide-react"
import { IMAGES } from "@/lib/music-data"

interface MobileNavProps {
  currentView: string
  onGoHome: () => void
  onGoToSearch?: () => void
  onGoToLibrary: () => void
  onGoToProfile: () => void
}

export function MobileNav({ currentView, onGoHome, onGoToSearch, onGoToLibrary, onGoToProfile }: MobileNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-black/80 z-40">
      <div className="flex items-center justify-around py-2">
        <button 
          onClick={onGoHome}
          className={`flex flex-col items-center gap-1 py-2 px-6 ${
            currentView === 'home' ? 'text-white' : 'text-[#b3b3b3]'
          }`}
        >
          <Home size={24} fill={currentView === 'home' ? 'currentColor' : 'none'} strokeWidth={currentView === 'home' ? 0 : 2} />
          <span className="text-[10px] font-medium">Início</span>
        </button>
        <button 
          onClick={onGoToSearch}
          className={`flex flex-col items-center gap-1 py-2 px-6 ${
            currentView === 'search' ? 'text-white' : 'text-[#b3b3b3]'
          }`}
        >
          <Search size={24} strokeWidth={currentView === 'search' ? 3 : 2} />
          <span className="text-[10px] font-medium">Buscar</span>
        </button>
        <button 
          onClick={onGoToLibrary}
          className={`flex flex-col items-center gap-1 py-2 px-6 ${
            currentView === 'library' ? 'text-white' : 'text-[#b3b3b3]'
          }`}
        >
          <Library size={24} fill={currentView === 'library' ? 'currentColor' : 'none'} strokeWidth={currentView === 'library' ? 0 : 2} />
          <span className="text-[10px] font-medium">Biblioteca</span>
        </button>
      </div>
    </nav>
  )
}
