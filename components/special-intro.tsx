"use client"

import { useState, useEffect } from "react"
import { Heart, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { specialPhrases, IMAGES } from "@/lib/music-data"

interface SpecialIntroProps {
  onComplete: () => void
  onClose: () => void
}

export function SpecialIntro({ onComplete, onClose }: SpecialIntroProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [fadeIn, setFadeIn] = useState(true)

  const isLastPhrase = currentPhraseIndex === specialPhrases.length - 1

  const handleNext = () => {
    if (isLastPhrase) {
      onComplete()
    } else {
      setFadeIn(false)
      setTimeout(() => {
        setCurrentPhraseIndex(prev => prev + 1)
        setFadeIn(true)
      }, 300)
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-6"
      style={{
        background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)`
      }}
    >
      {/* Background hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            size={Math.random() * 20 + 10}
            className="absolute text-[#1DB954]/10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl"
      >
        &times;
      </button>

      {/* Photo */}
      <div className="relative mb-8">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#1DB954]/30 shadow-2xl">
          <img 
            src={IMAGES.profilePhoto} 
            alt="Aninha"
            className="w-full h-full object-cover"
          />
        </div>
        <Heart 
          size={28} 
          className="absolute -bottom-1 -right-1 text-[#1DB954] fill-[#1DB954] animate-pulse"
        />
      </div>

      {/* Phrase */}
      <div className={`text-center transition-all duration-300 max-w-md ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-2xl md:text-3xl font-light text-white leading-relaxed">
          {specialPhrases[currentPhraseIndex]}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8 mb-6">
        {specialPhrases.map((_, i) => (
          <div 
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentPhraseIndex ? 'bg-[#1DB954] w-6' : 
              i < currentPhraseIndex ? 'bg-[#1DB954]/50' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Continue button */}
      <Button
        onClick={handleNext}
        className="mt-4 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold rounded-full px-8 py-6 text-lg flex items-center gap-2"
      >
        {isLastPhrase ? (
          <>
            Sim!
            <Heart size={20} className="fill-current" />
          </>
        ) : (
          <>
            Continuar
            <ChevronRight size={20} />
          </>
        )}
      </Button>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
            opacity: 0.2;
          }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
