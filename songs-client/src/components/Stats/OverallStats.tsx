import React from "react";
import { IStats, StatKeys  } from "../../reducers/stats";

function OverallStats({ stats }: { stats: IStats }) {
  const statsBlocks = [
    {
      key: "numberOfArtists",
      label: "ARTISTS",
    },
    {
      key: "numberOfSongs",
      label: "SONGS",
    },
    {
      key: "numberOfAlbums",
      label: "ALBUMS",
    },
    {
      key: "numberOfGenres",
      label: "GENRES",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-4 mb-4 w-full">
      {statsBlocks.map((block) => {
        return (
          <div
            key={block.key}
            className="bg-zinc-800 py-10 text-center rounded-lg"
          >
            <h2 className="text-6xl mb-2">
              {stats.overallStats[block.key as StatKeys]}
            </h2>
            <div className="text-xs">{block.label}</div>
          </div>
        );
      })}
    </div>
  );
}

export default OverallStats;
