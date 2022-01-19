import { curveBumpX, line } from "d3-shape";
import { scaleLinear } from "d3-scale";

const GRAPH_HEIGHT = 800;
const GRAPH_WIDTH = 1180;
const GRAPH_PADDING = 80;
const TOTAL_TEAMS = 32;
const WEEKS_IN_SEASON = 17;
const TEAM_HEIGHT = GRAPH_HEIGHT / TOTAL_TEAMS;

const rankScale = scaleLinear()
  .domain([1, TOTAL_TEAMS])
  .range([TEAM_HEIGHT / 2, GRAPH_HEIGHT - TEAM_HEIGHT / 2]);

const timeScale = scaleLinear()
  .domain([0, WEEKS_IN_SEASON])
  .range([GRAPH_PADDING, GRAPH_WIDTH - GRAPH_PADDING]);

export const getTeamWeeklyCoordinates = (positions) =>
  positions.map((n, i) => [timeScale(i), rankScale(n)]);

export const getTeamLine = line<number>()
  .x((_d, i) => timeScale(i))
  .y((d) => rankScale(d))
  .curve(curveBumpX);
