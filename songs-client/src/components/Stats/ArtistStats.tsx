import React from "react";
import { IStats } from "../../reducers/stats";

function ArtistStats({ stats }: { stats: IStats }) {
  return (
    <div className="p-10 bg-zinc-800 rounded mb-5">
      <h2 className="text-2xl font-bold mb-5">Artist statistics</h2>
      <table className="w-full text-left">
        <thead>
          <th className="p-2">Artist</th>
          <th className="p-2"># of songs</th>
          <th className="p-2"># of albums</th>
        </thead>
        <tbody>
          {stats.artistStats.map((stat) => {
            return (
              <tr key={stat.artist} className="odd:bg-zinc-700/50">
                <td className="p-2">{stat.artist}</td>
                <td className="p-2">{stat.numberOfSongs}</td>
                <td className="p-2">{stat.numberOfAlbums}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ArtistStats;
