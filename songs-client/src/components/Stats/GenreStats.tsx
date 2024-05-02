import React from "react";
import { IStats } from "../../reducers/stats";

function GenreStats({ stats }: { stats: IStats }) {
  return (
    <div className="p-10 bg-zinc-800 rounded mb-5">
      <h2 className="text-2xl font-bold mb-5">Genre statistics</h2>
      <table className="w-full text-left">
        <thead className="pb-2">
          <th className="pb-2">Genre</th>
          <th className="pb-2"># of songs</th>
        </thead>
        <tbody>
          {stats.genreStats.map((stat) => {
            return (
              <tr key={stat.genre} className="odd:bg-zinc-700/50">
                <td className="p-2">{stat.genre}</td>
                <td className="p-2">{stat.numberOfSongs}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default GenreStats;
