import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import TeamLine from "../features/team-line/TeamLine";

const teams = {
  phi: [1, 1, 6, 3, 6, 13, 11, 12, 13, 12, 16, 19, 18, 16, 16, 15, 15, 12],
  ne: [2, 2, 5, 7, 5, 4, 2, 2, 3, 4, 6, 5, 4, 4, 6, 7, 6, 6],
  min: [3, 3, 4, 8, 11, 10, 7, 7, 8, 8, 8, 10, 9, 12, 14, 13, 13, 14],
  no: [4, 11, 11, 5, 4, 3, 4, 4, 4, 1, 1, 1, 1, 2, 1, 1, 1, 1],
  lar: [5, 4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 3, 5, 4, 4],
  pit: [6, 8, 13, 11, 15, 11, 8, 9, 7, 7, 5, 4, 7, 8, 11, 8, 10, 13],
  jac: [7, 5, 2, 4, 3, 5, 15, 20, 21, 21, 25, 25, 28, 28, 29, 30, 29, 29],
  atl: [8, 9, 8, 10, 16, 23, 19, 18, 17, 13, 18, 20, 23, 25, 26, 23, 20, 17],
  gb: [9, 6, 7, 13, 12, 14, 13, 10, 14, 15, 11, 15, 16, 20, 20, 20, 18, 21],
  lac: [10, 13, 15, 18, 17, 12, 6, 5, 6, 6, 4, 7, 6, 5, 4, 2, 3, 5],
  car: [11, 10, 12, 6, 8, 6, 10, 8, 5, 5, 7, 9, 12, 14, 18, 19, 21, 18],
  kc: [12, 7, 3, 2, 2, 2, 3, 3, 2, 3, 3, 3, 3, 3, 2, 3, 5, 3],
  ten: [13, 24, 21, 20, 13, 15, 20, 22, 22, 19, 13, 16, 19, 17, 13, 14, 14, 15],
  hou: [14, 17, 26, 31, 28, 26, 22, 16, 15, 9, 10, 8, 8, 6, 8, 6, 7, 7],
  det: [15, 27, 28, 22, 23, 20, 21, 19, 19, 20, 22, 23, 24, 24, 21, 25, 26, 22],
  bal: [16, 12, 16, 12, 7, 9, 5, 6, 9, 16, 15, 12, 13, 10, 10, 9, 8, 9],
  sf: [17, 19, 19, 26, 25, 31, 28, 29, 31, 28, 31, 30, 30, 31, 30, 28, 28, 28],
  dal: [18, 23, 20, 25, 22, 25, 18, 21, 20, 22, 19, 17, 14, 11, 9, 12, 12, 11],
  chi: [19, 18, 17, 16, 9, 8, 12, 14, 12, 10, 9, 6, 5, 7, 5, 4, 2, 2],
  sea: [20, 21, 25, 21, 21, 19, 17, 17, 16, 17, 17, 11, 10, 9, 7, 11, 9, 8],
  was: [21, 14, 22, 17, 18, 17, 16, 13, 11, 14, 12, 14, 15, 19, 25, 22, 23, 24],
  cin: [22, 20, 9, 14, 10, 7, 9, 11, 10, 11, 14, 18, 20, 23, 24, 21, 24, 25],
  den: [23, 15, 14, 19, 19, 21, 25, 23, 23, 23, 23, 22, 17, 15, 17, 18, 19, 19],
  nyg: [24, 28, 30, 28, 29, 29, 30, 30, 30, 30, 29, 26, 27, 26, 23, 26, 22, 23],
  oak: [25, 26, 27, 30, 30, 30, 32, 31, 32, 32, 32, 31, 31, 32, 31, 31, 31, 31],
  ari: [26, 31, 31, 32, 32, 32, 31, 32, 29, 29, 30, 32, 32, 30, 32, 32, 32, 32],
  ind: [27, 29, 23, 23, 26, 28, 29, 27, 25, 24, 21, 13, 11, 13, 12, 10, 11, 10],
  mia: [28, 25, 18, 9, 14, 16, 14, 15, 18, 18, 20, 21, 22, 18, 15, 17, 17, 20],
  tb: [29, 16, 10, 15, 20, 18, 24, 24, 24, 25, 26, 28, 26, 22, 22, 24, 25, 26],
  buf: [30, 32, 32, 29, 31, 27, 27, 28, 28, 31, 27, 27, 25, 27, 28, 27, 27, 27],
  nyj: [31, 22, 24, 27, 27, 24, 23, 25, 26, 26, 28, 29, 29, 29, 27, 29, 30, 30],
  cle: [32, 30, 29, 24, 24, 22, 26, 26, 27, 27, 24, 24, 21, 21, 19, 16, 16, 16],
};

const homeGames = {
  ari: [1, 3, 4, 6, 9, 13, 14, 15],
  atl: [2, 4, 7, 8, 12, 13, 14, 16],
  bal: [2, 4, 6, 9, 11, 13, 15, 17],
  buf: [3, 4, 7, 8, 9, 12, 14, 17],
  car: [1, 2, 5, 6, 9, 11, 13, 15, 17],
  chi: [1, 4, 5, 7, 8, 10, 12, 14, 16],
  cin: [2, 5, 7, 8, 10, 12, 13, 15, 17],
  cle: [1, 3, 6, 10, 11, 12, 14, 16],
  dal: [1, 3, 5, 7, 10, 13, 15, 17],
  den: [2, 4, 6, 7, 9, 13, 16, 17],
  det: [2, 4, 7, 8, 11, 13, 15, 17],
  gb: [2, 3, 4, 6, 7, 10, 14, 15],
  hou: [2, 4, 5, 8, 9, 12, 13, 14, 17],
  ind: [3, 4, 7, 8, 10, 11, 13, 16],
  jac: [1, 3, 6, 8, 9, 13, 14, 17],
  kc: [3, 5, 6, 8, 9, 11, 13, 15, 17],
  oak: [1, 2, 5, 9, 10, 11, 14, 15],
  lac: [1, 3, 5, 6, 9, 11, 15, 16],
  lar: [2, 4, 6, 8, 11, 12, 14, 17],
  mia: [1, 2, 4, 6, 9, 11, 13, 16],
  min: [1, 3, 6, 8, 11, 14, 16, 17],
  ne: [1, 3, 6, 8, 12, 14, 16, 17],
  no: [1, 4, 5, 8, 10, 12, 14, 15],
  nyg: [2, 4, 5, 7, 9, 13, 15, 17],
  nyj: [1, 2, 6, 7, 10, 12, 14, 16],
  phi: [1, 3, 5, 9, 10, 11, 12, 14, 16],
  pit: [2, 4, 5, 8, 9, 10, 13, 15],
  sf: [3, 5, 8, 10, 11, 12, 15, 16],
  sea: [1, 3, 5, 7, 9, 13, 16, 17],
  tb: [1, 3, 6, 10, 11, 14, 16, 17],
  ten: [2, 5, 7, 8, 10, 12, 15, 16],
  was: [2, 3, 5, 7, 11, 12, 15, 16],
};

export const getStaticProps = async () => {
  return {
    props: { teams, homeGames },
  };
};

const ArrowheadPage: NextPage = (props) => {
  const [highlighted, setHighlighted] = useState(null);

  return (
    <div>
      <Head>
        <title>Arrowhead</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>NFL Power Rankings: 2019</h1>
      <svg
        style={{
          width: "100%",
          minWidth: "800px",
          maxWidth: "2000px",
          minHeight: "600px",
          maxHeight: "80vh",
        }}
        viewBox="0, 0, 1180, 800"
      >
        {Object.entries(teams).map(([teamId, data]) => (
          <TeamLine
            key={teamId}
            teamId={teamId}
            data={data}
            homeGames={homeGames[teamId]}
            onMouseEnter={setHighlighted}
          />
        ))}
        {!!highlighted && (
          <TeamLine
            highlighted
            homeGames={homeGames[highlighted]}
            teamId={highlighted}
            data={teams[highlighted]}
            onMouseEnter={() => {}}
          />
        )}
      </svg>
    </div>
  );
};

export default ArrowheadPage;