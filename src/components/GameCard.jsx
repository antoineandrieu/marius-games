export default function GameCard({ game }) {
  return (
    <a href={game.href} className={`game-card ${game.id}`}>
      <div className="game-visual">
        <span className="game-emoji">{game.emoji}</span>
      </div>
      <div className="game-content">
        <div className="game-title">{game.title}</div>
        <div className="game-description">{game.description}</div>
        <div className="play-button">▶ Jouer</div>
      </div>
    </a>
  )
}
