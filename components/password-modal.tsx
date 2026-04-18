"use client"

import { useState } from "react"
import { X, Lock, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SPECIAL_PASSWORD } from "@/lib/music-data"

interface PasswordModalProps {
  onSuccess: () => void
  onClose: () => void
}

export function PasswordModal({ onSuccess, onClose }: PasswordModalProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password.toLowerCase().trim() === SPECIAL_PASSWORD.toLowerCase()) {
      onSuccess()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className={`relative bg-gradient-to-b from-[#282828] to-[#181818] rounded-2xl w-full max-w-sm p-6 transform transition-transform ${
          shake ? 'animate-shake' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#121212] flex items-center justify-center text-[#b3b3b3] hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#1DB954] to-[#169c46] flex items-center justify-center">
            <Lock size={28} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Conteúdo Especial
          </h2>
          <p className="text-[#b3b3b3] text-sm">
            Esta playlist contém algo muito especial.
            <br />
            Qual o apelido que eu te chamo ?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              placeholder="Digite o apelido..."
              className={`w-full bg-[#121212] border-[#3e3e3e] text-white placeholder:text-[#727272] h-12 rounded-lg focus:border-[#1DB954] focus:ring-[#1DB954] ${
                error ? 'border-red-500' : ''
              }`}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <Heart size={14} />
                Hmm, não é esse... Tente novamente!
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold h-12 rounded-full"
          >
            Desbloquear
          </Button>
        </form>

        <p className="text-center text-[#727272] text-xs mt-4">
          Dica: É como eu te chamo carinhosamente
        </p>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
