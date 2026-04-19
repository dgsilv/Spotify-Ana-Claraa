// Configuração de imagens - Fácil de trocar depois
// COMO TROCAR AS FOTOS:
// 1. Faça upload da nova imagem em algum serviço de hospedagem
// 2. Cole a URL aqui no lugar da URL atual
export const IMAGES = {
  // Foto de perfil da Aninha
  profilePhoto: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-15%20at%2016.20.40-7o4OysQJ8a0CQSe8Lw0r1jP1ZWTBjK.jpeg",
  
  // Fotos para playlists e capas
  coupleBeach: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-15%20at%2016.17.03-CIY9vSCWm0KREwEcG1TXD4FiAyNFrw.jpeg",
  smiling: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-15%20at%2016.20.15-y1xB0FJdtYnzt4J0OapnontPX64rSy.jpeg",
  coupleLake: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-15%20at%2016.18.10-tVCZMPCONEC5s7JQBaSsoJ96V9csfs.jpeg",
  selfieBlue: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-15%20at%2016.20.40%20%281%29-UUHru2vkhWzKnL8j4xEZXhyITKuHdX.jpeg",
  coupleNight: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-15%20at%2016.17.03%20%281%29-Ld3YsbyglMlD6TdZmsH7ILCkLXq9Rw.jpeg",

  // Capas de álbuns
  albumSolELua: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4VDbwlg0capeTTdSCaP3nSZCW5MgP9.png",
  albumCheiroMar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-suLStsUUsmjcqbUVLfCo98hD5BGCre.png",
  albumEnvelhecer: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MDpN9fyfbfAUhKGc26583mgsvLSvku.png",
  albumPerola: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NM0hpS0QBOJcoXOPXtX6TAyDNFTr8v.png",
  albumSentimental: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-56QOQANR76o4BTDlLRFRIcbtM74CNr.png",
  albumGal: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-t2Z9DTVCSKKuaEVXyJ2DINPtXe401B.png",
  albumMatematica: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VoidVp0beAYL9NulkINECbf80cjKIF.png",
  albumDanca: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wsJx4eNLz2Mp2kn6lxQdBbGiOvlvB2.png",
  albumPeloTempo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-akhZRn2xF8vjoxi00yqzixy2Biu48U.png",
  albumPlatao: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1GtItWsTOdNZ4pilMpnsFzQi2NEmlU.png",
  albumLevo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dP6QNqirlouPzJq5czom9HidgGS6aV.png",
  albumJustice: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qOIhQIyxUaqs5m5SqscJIWqFuVMVNj.png",
  albumToTheMoon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AS2muaerDpInx5rBR3CYJiEAJ1gbBq.png",
}

export interface Track {
  id: string
  title: string
  artist: string
  album?: string
  duration: string
  durationMs: number
  // COMO TROCAR A FOTO DO ÁLBUM:
  // Substitua a URL abaixo pela URL da imagem do álbum real
  // Você pode pegar a imagem do álbum no Spotify (clique com botão direito na capa > Copiar link da imagem)
  coverImage: string
  // COMO TROCAR O LINK DO SPOTIFY:
  // Vá no Spotify, clique nos 3 pontinhos da música > Compartilhar > Copiar link da música
  spotifyUrl: string
  // Para música que abre no YouTube em vez de Spotify
  youtubeUrl?: string
  // Letra da música (opcional)
  lyrics?: string
  isLiked?: boolean
}

export interface Playlist {
  id: string
  name: string
  description: string
  coverImage: string
  tracks: Track[]
  isSpecial?: boolean
  requiresPassword?: boolean
}

// Letra da música Corações em Ti
const coracoesEmTiLyrics = `QUE A CANÇÃO DOS NOSSOS CORAÇÕES NÃO SEJA OUTRA NÃO SER TE DESCOBRIR TE PERSEGUIR 

QUE OS NOSSOS PÉS NÃO CORRAM PARA OUTRO CAMINHO A NÃO SER OS TEUS 

ATÉ QUE NADA MAIS IMPORTE
ATÉ QUE EU SEJA TOTALMENTE TEU

TE PERSEGUIREI NÃO ME CANSAREI DE TI PARA ONDE FORES EU IREI

NÃO PARA AQUI TEM MUITO MAIS A SER VIVIDO VAMOS DESCOBRI-LÓ

CORAÇÕES EM TI PÉS QUE CAMINHAM PARA TI VAMOS PERSEGUI-LÓ

ATÉ QUE NADA MAIS IMPORTE
ATÉ QUE EU SEJA TOTALMENTE TEU

NÓS VAMOS DESCOBRIR 
NÓS VAMOS DESCOBRI-LÓ

TE PERSEGUIREI NÃO ME CANSAREI DE TI PARA ONDE FORES EU IREI.`

// ============================================================
// PLAYLISTS DO APLICATIVO
// ============================================================
// COMO ADICIONAR UMA NOVA MÚSICA:
// 1. Copie o objeto de exemplo abaixo
// 2. Preencha com as informações da música
// 3. Cole dentro do array "tracks" da playlist desejada
//
// EXEMPLO:
// {
//   id: "id-unico-da-musica",
//   title: "Nome da Música",
//   artist: "Nome do Artista",
//   album: "Nome do Álbum",
//   duration: "3:45",
//   durationMs: 225000, // duração em milissegundos (minutos * 60 + segundos) * 1000
//   coverImage: "URL_DA_CAPA_DO_ALBUM",
//   spotifyUrl: "https://open.spotify.com/track/ID_DA_MUSICA",
//   lyrics: "Letra da música aqui (opcional)"
// }
// ============================================================

export const playlists: Playlist[] = [
  {
    id: "nossas-musicas",
    name: "Nossas Músicas",
    description: "Algumas das nossas músicas",
    coverImage: IMAGES.coupleBeach,
    tracks: [
      {
        id: "sol-e-lua",
        title: "O Sol e a Lua",
        artist: "Pequeno Cidadão",
        album: "Pequeno Cidadão",
        duration: "3:24",
        durationMs: 204000,
        coverImage: IMAGES.albumSolELua,
        spotifyUrl: "https://open.spotify.com/intl-pt/track/4uNECVAqc6LjDH8pqXH3Ey",
        lyrics: "O sol pediu a lua em casamento\nDisse que já a amava há muito tempo\nDesde a época dos dinossauros, pterodátilos, tiranossauros\nQuando nem existia a bicicleta nem o velotrol nem a motocicleta"
      },
      {
        id: "cheiro-de-mar",
        title: "Cheiro de Mar",
        artist: "José Jr",
        album: "Cheiro de Mar",
        duration: "4:12",
        durationMs: 252000,
        coverImage: IMAGES.albumCheiroMar,
        spotifyUrl: "https://open.spotify.com/intl-pt/album/6Pu2z4gz2CCpO8cB78Gttx",
        lyrics: "Cheiro de mar, brisa do vento\nTeu sorriso é meu alento\nNa areia dos nossos passos\nDesenho o nosso momento..."
      },
      {
        id: "envelhecer-com-voce",
        title: "Envelhecer Com Você",
        artist: "Lorena Chaves",
        album: "Envelhecer Com Você",
        duration: "3:45",
        durationMs: 225000,
        coverImage: IMAGES.albumEnvelhecer,
        spotifyUrl: "https://open.spotify.com/intl-pt/track/41P3rv4y39QiEIdhqBrmaF",
        lyrics: "Quero envelhecer com você\nVer nossos cabelos brancos\nE ainda sentir teu toque\nAinda ouvir teu canto..."
      },
      {
        id: "perola",
        title: "Pérola",
        artist: "José Jr",
        album: "Pérola",
        duration: "3:52",
        durationMs: 232000,
        coverImage: IMAGES.albumPerola,
        spotifyUrl: "https://open.spotify.com/intl-pt/track/3UYmQN7OBL6aGmzd3kiVcj",
        lyrics: "Você é minha pérola rara\nUm tesouro que encontrei\nNo fundo do mar da vida\nFoi você que eu encontrei..."
      },
      {
        id: "sentimental",
        title: "Sentimental",
        artist: "Los Hermanos",
        album: "Bloco do Eu Sozinho",
        duration: "3:30",
        durationMs: 210000,
        coverImage: IMAGES.albumSentimental,
        spotifyUrl: "https://open.spotify.com/intl-pt/track/6Zv4HVHfadVo3JQSSbwY7r",
        lyrics: "De vez em quando bate uma saudade\nDe tudo que a gente não viveu\nA memória se inventa de verdade\nUm passado que o presente esqueceu..."
      },
      {
        id: "matematica-nossas",
        title: "Matemática",
        artist: "Restart",
        album: "Geração Z",
        duration: "3:42",
        durationMs: 222000,
        coverImage: IMAGES.albumMatematica,
        spotifyUrl: "https://open.spotify.com/intl-pt/track/5CIHSAYZZ9ppV7wCDfBEcV",
        lyrics: "Você mais eu, é igual a nós dois\nUm mais um sempre será dois\nMatemática do amor..."
      },
      {
        id: "eternamente",
        title: "Eternamente",
        artist: "Gal Costa",
        album: "Baby Gal",
        duration: "3:18",
        durationMs: 198000,
        coverImage: IMAGES.albumGal,
        spotifyUrl: "https://open.spotify.com/intl-pt/track/1ngbz6irbfEmpsYcZhzX6L",
        lyrics: "Eternamente, eu vou te amar\nEternamente, até o fim\nNão importa o que aconteça\nVou estar aqui por ti..."
      },
      // ADICIONE MAIS MÚSICAS AQUI - COPIE O FORMATO ACIMA
    ]
  },
  {
    id: "minha-cantora-favorita",
    name: "Da Minha Cantora Favorita",
    description: "A voz que toca meu coração",
    coverImage: IMAGES.profilePhoto,
    tracks: [
      {
        id: "coracoes-em-ti",
        title: "Corações em Ti",
        artist: "Minha Aninha",
        album: "Especial",
        duration: "4:30",
        durationMs: 270000,
        coverImage: IMAGES.profilePhoto,
        spotifyUrl: "#",
        lyrics: coracoesEmTiLyrics
      }
      // NÃO ADICIONE MÚSICAS AQUI - Esta playlist é exclusiva da Aninha
    ]
  },
  {
    id: "voce",
    name: "Você",
    description: "Cada momento ao seu lado é únio, minha princesa. E essas são algumas das músicas que me lembram você!",
    coverImage: IMAGES.coupleLake,
    tracks: [
      {
        id: "matematica",
        title: "Matemática",
        artist: "Restart",
        album: "Geração Z",
        duration: "3:42",
        durationMs: 222000,
        coverImage: IMAGES.albumMatematica,
        spotifyUrl: "https://open.spotify.com/intl-pt/track/5CIHSAYZZ9ppV7wCDfBEcV",
        lyrics: "Você mais eu, é igual a nós dois\nUm mais um sempre será dois\nMatemática do amor..."
      },
      {
        id: "danca",
        title: "Dança",
        artist: "Lorena Chaves",
        album: "Dança",
        duration: "3:45",
        durationMs: 225000,
        coverImage: IMAGES.albumDanca,
        spotifyUrl: "https://open.spotify.com/intl-pt/track/6327e83uw050FViHyIFBL5",
        lyrics: "Vem dançar comigo ao pôr do sol\nNo ritmo do nosso coração\nCada passo que damos juntos\nÉ mais um verso dessa canção..."
      },
      {
        id: "pelo-tempo-que-durar",
        title: "Pelo Tempo Que Durar",
        artist: "Marisa Monte",
        album: "Infinito Particular",
        duration: "4:00",
        durationMs: 240000,
        coverImage: IMAGES.albumPeloTempo,
        spotifyUrl: "https://open.spotify.com/intl-pt/track/5sJJQxIfys0imGd4WhILm8",
        lyrics: "Pelo tempo que durar\nVou te amar de todo jeito\nPelo tempo que durar\nVou cuidar do que é perfeito..."
      },
      {
        id: "platao-neruda",
        title: "De Platão Pra Neruda",
        artist: "Lorena Chaves",
        album: "De Platão Pra Neruda",
        duration: "3:55",
        durationMs: 235000,
        coverImage: IMAGES.albumPlatao,
        spotifyUrl: "https://open.spotify.com/intl-pt/track/6BtPO7BbSD36sZMqYY7rxl",
        lyrics: "De Platão pra Neruda\nDe filósofo a poeta\nO amor sempre muda\nMas contigo se completa..."
      },
      {
        id: "levo-comigo",
        title: "Levo Comigo",
        artist: "Restart",
        album: "Restart",
        duration: "3:40",
        durationMs: 220000,
        coverImage: IMAGES.albumLevo,
        spotifyUrl: "https://open.spotify.com/intl-pt/track/6BcqNZ7D3gI0ALivZMAvux",
        lyrics: "Levo comigo tudo que você me deu\nGuardo no peito esse amor que nasceu\nLevo comigo cada momento vivido\nCada sorriso, cada sonho dividido..."
      },
      {
        id: "2-much",
        title: "2 Much",
        artist: "Justin Bieber",
        album: "Justice",
        duration: "2:52",
        durationMs: 172000,
        coverImage: IMAGES.albumJustice,
        spotifyUrl: "https://open.spotify.com/intl-pt/track/0oaY19dUwZimIgzn3ZZLZO",
        lyrics: "When I look in your eyes\nI'm captured, completely\nI can't help but smile\nI love you completely\n\nI just can't get enough\nI just can't get enough\nYou're so much more than enough\nSo much more than enough"
      },
      {
        id: "to-the-moon",
        title: "To the Moon",
        artist: "Little To Nothing",
        album: "To the Moon",
        duration: "4:10",
        durationMs: 250000,
        coverImage: IMAGES.albumToTheMoon,
        spotifyUrl: "https://open.spotify.com/intl-pt/track/47aiTSjeAGOofQXyAMwRVZ",
        lyrics: "To the moon and back\nI'd travel just for you\nThrough the stars and galaxies\nMy love remains so true..."
      },
      // ADICIONE MAIS MÚSICAS AQUI - COPIE O FORMATO ACIMA
    ]
  },
  {
    id: "musica-especial",
    name: "Algo Especial Para Você",
    description: "Feito com muito amor",
    coverImage: IMAGES.smiling,
    isSpecial: true,
    requiresPassword: true,
    tracks: [
      {
        id: "musica-surpresa",
        title: "Clique aqui",
        artist: "Com amor",
        album: "Especial",
        duration: "3:47",
        durationMs: 227000,
        coverImage: IMAGES.smiling,
        spotifyUrl: "#",
        // Esta música abre no YouTube pois não está no Spotify
        youtubeUrl: "https://youtu.be/KBUFvzslIoA",
        lyrics: "Esta música é uma pequeno pedaço da imensidão do amor que sinto por você \n\nTudo feito aqui carrega o meu amor\nTenho esperado o momento pra te mostrar isso\nEspero que esteja preparada."
      }
    ]
  }
]

// Frases do questionário antes de acessar a música especial
export const specialPhrases = [
  "Você é exatamente o que eu precisava",
  "Você clareou minha vida.",
  "A Harmonia Perfeita de todas as qualidades.",
  "Quanto mais eu te observo, mais eu percebo a ARte que é você.",
  "E tudo te trouxe até aqui pra você entender o porquê desse site ser um spotify.",
  "Está pronta?"
]

// Informações do perfil da artista
export const artistProfile = {
  name: "Minha Aninha",
  displayName: "Minha Aninha",
  verified: true,
  monthlyListeners: "1",
  followers: 1,
  bio: "A cantora mais perfeita do mundo. Com a voz mais incrível que já vi. Eu sou seu fã 00!",
  profileImage: IMAGES.profilePhoto,
  headerImage: IMAGES.coupleBeach,
  galleryImages: [
    IMAGES.smiling,
    IMAGES.coupleLake,
    IMAGES.selfieBlue,
    IMAGES.coupleNight,
  ],
  topTracks: [
    {
      id: "coracoes-em-ti",
      title: "Corações em Ti",
      artist: "Minha Aninha",
      album: "Especial",
      duration: "4:30",
      durationMs: 270000,
      coverImage: IMAGES.profilePhoto,
      spotifyUrl: "#",
      lyrics: coracoesEmTiLyrics,
      plays: "999.999.999"
    }
  ]
}

// Senha para acessar a música especial
export const SPECIAL_PASSWORD = "minhaninha"

// Helper para obter todas as músicas (para busca)
export function getAllTracks(): Track[] {
  const allTracks: Track[] = []
  playlists.forEach(playlist => {
    playlist.tracks.forEach(track => {
      if (!allTracks.find(t => t.id === track.id)) {
        allTracks.push(track)
      }
    })
  })
  return allTracks
}
