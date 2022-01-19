import { getTeamLine, getTeamWeeklyCoordinates } from "./utils";
import styles from "./TeamLine.module.scss";

export default function TeamLine({
  teamId,
  data,
  highlighted = false,
  homeGames = [],
  onMouseEnter,
}) {
  const points = getTeamWeeklyCoordinates(data);
  const linePath = getTeamLine(data);

  return (
    <g
      className={`${styles.team} ${styles[teamId]} ${
        !!highlighted ? styles.highlighted : null
      }`}
      onMouseEnter={() => onMouseEnter(teamId)}
    >
      {!highlighted && (
        <>
          <text y={25 * data[0] - 9} x={60} textAnchor="end">
            {teamId.toUpperCase()}
          </text>
          <text y={25 * data[17] - 9} x={1120} textAnchor="start">
            {teamId.toUpperCase()}
          </text>
        </>
      )}
      {points.map(([x, y], i) => (
        <Point
          key={`${teamId}-wk-${i}`}
          highlighted={highlighted}
          cx={x}
          cy={y}
        />
      ))}
      <path d={linePath} />
      {homeGames.map((i) => {
        return (
          <circle
            key={`${points[i][0]}|${points[i][1]}`}
            r={highlighted ? 8 : 3}
            cx={points[i][0]}
            cy={points[i][1]}
            style={{ fill: "white" }}
          />
        );
      })}
      {!!highlighted &&
        points.map(([x, y], i) => (
          <text
            key={`${data[i]}-${x}-${y + 1}-highlighted-text`}
            x={x}
            y={y + 1}
            textAnchor="middle"
            alignmentBaseline="middle"
            style={{ fill: "white", fontSize: "12px" }}
          >
            {data[i]}
          </text>
        ))}
    </g>
  );
}

function Point({ highlighted, ...props }) {
  return <circle r={highlighted ? 12 : 6} {...props} />;
}
