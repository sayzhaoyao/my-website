import { getAverageScore } from "../lib/strapi";

export function ScoreBadge({ tool }) {
  const score = getAverageScore(tool);

  if (!score) {
    return <span className="pill">Score pending</span>;
  }

  return <span className="score-badge">{score}/5</span>;
}
