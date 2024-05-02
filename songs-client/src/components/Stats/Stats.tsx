import React, { useEffect } from "react";
import { IStats, requestFetchStats } from "../../reducers/stats";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import OverallStats from "./OverallStats";
import GenreStats from "./GenreStats";
import ArtistStats from "./ArtistStats";
import AlbumStats from "./AlbumStats";

function Stats() {
  const dispatch = useAppDispatch();
  const stats = useAppSelector<RootState, IStats>((state) => state.stats.stats);

  useEffect(() => {
    dispatch(requestFetchStats());
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center flex-col w-[720px]">
        <OverallStats stats={stats} />
        <GenreStats stats={stats} />
        <ArtistStats stats={stats} />
        <AlbumStats stats={stats} />
      </div>
    </div>
  );
}

export default Stats;
