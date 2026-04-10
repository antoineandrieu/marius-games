import Background from './components/Background'
import GameCard from './components/GameCard'
import './App.css'

const games = [
  {
    id: 'pong',
    title: 'PONG',
    emoji: '🏓',
    href: '/pong/index.html',
    description: 'Le classique jeu de tennis de table revisité avec un style néon futuriste. Solo ou à deux joueurs.'
  },
  {
    id: 'skiclub',
    title: 'SKICLUB',
    emoji: '⛷️',
    href: '/skiclub/index.html',
    description: 'Descendez les pistes enneigées et slalomez entre les portes dans ce jeu de ski alpin aux couleurs des JO d\'hiver.'
  },
  {
    id: 'airhockey',
    title: 'AIR HOCKEY',
    emoji: '🏒',
    href: '/airhockey/index.html',
    description: 'Le hockey sur air comme dans la vraie vie ! Solo vs IA ou à deux joueurs. Souris, tactile ou clavier.'
  },
  {
    id: 'multiplication',
    title: 'MULTIPLICATION',
    emoji: '✖️',
    href: '/multiplication/index.html',
    description: 'Entraîne-toi aux tables de multiplication ! Atteins le score de 100. Une seule erreur et c\'est perdu !'
  }
]

export default function App() {
  return (
    <>
      <Background />
      <div className="title-container">
        <h1><span className="title-3d">MARIUS GAMES</span></h1>
        <div className="subtitle">Collection de Jeux</div>
      </div>
      <nav className="games-container">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </nav>
    </>
  )
}
