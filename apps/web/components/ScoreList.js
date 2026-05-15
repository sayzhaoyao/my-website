import { getScoreItems } from "../lib/strapi";

export function ScoreList({ tool }) {
  const items = getScoreItems(tool);

  if (!items.length) {
    return <p>Scores are pending editorial review.</p>;
  }

  return (
    <div className="score-list">
      {items.map((item) => (
        <div className="score-row" key={item.key}>
          <span>{item.label}</span>
          <strong>{item.value}/5</strong>
          <div className="score-track" aria-hidden="true">
            <span style={{ width: `${(item.value / 5) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
