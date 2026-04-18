"use client"

import { useState } from "react"
import { SpotifyLogo } from "./spotify-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IMAGES } from "@/lib/music-data"

interface LoginPageProps {
  onLogin: () => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#121212] flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-8">
        <SpotifyLogo size={40} />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-sm">
          {/* Welcome Message */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-[#1DB954] shadow-lg shadow-[#1DB954]/20">
              <img 
                src={IMAGES.profilePhoto} 
                alt="Aninha"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Feliz Aniversário, Ninha!
            </h1>
            <p className="text-[#b3b3b3] text-sm md:text-base leading-relaxed">
              Preparei esse presente especial para você.
              <br />
              Feito com muito carinho e dedicação.
               Espero que goste!
               Explore tudo!
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-[#121212] rounded-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-white text-center mb-6">
              Entrar no Spotify
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  E-mail ou nome de usuário
                </label>
                <Input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail ou nome de usuário"
                  className="w-full bg-[#121212] border-[#727272] text-white placeholder:text-[#a7a7a7] h-12 rounded-sm focus:border-white focus:ring-0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    className="w-full bg-[#121212] border-[#727272] text-white placeholder:text-[#a7a7a7] h-12 rounded-sm focus:border-white focus:ring-0 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a7a7a7] hover:text-white"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold h-12 rounded-full text-base transition-transform hover:scale-[1.02]"
              >
                Entrar
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#292929] text-center">
              <p className="text-[#b3b3b3] text-sm">
                Não precisa de senha de verdade.
                <br />
                <span className="text-[#1DB954]">É só clicar em Entrar!</span>
              </p>
            </div>
          </div>

          {/* Footer Message */}
          <p className="text-center text-[#b3b3b3] text-xs mt-6">
            Feito com muito amor para você
          </p>
        </div>
      </main>
    </div>
  )
}
