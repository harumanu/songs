import React from "react";
import { classNames } from "../utils";
import { useAppDispatch, useAppSelector } from "../hooks";
import Badge from "./ui/Badge";
import { deselectGenre, selectGenre } from "../reducers/genres";

function GenreList({ className }: { className: string }) {
  // This is a very naive approach to listing the genres of the songs.
  // I'm just taking whatever songs are currently in the store and mapping the genres
  // out using their sting based names. This is not sacalable at all, but it works for
  // this barebones example.
  //
  // A more robust approach would obviously involve storing the genres as separate
  // documents in the db.
  // I thought about an intermediate solution where the genres were picked out and
  // stored separately in redux, but I figured that would just add a lot of boilerplate
  // code to achieve basically the same thing I'm doing in a couple of lines here since
  // the data would still be coming from the songs endpoint.

  const dispatch = useAppDispatch();
  const songs = useAppSelector((state) => state.songs.songs);
  const selectedGenres = useAppSelector((state) => state.genres.selectedGenres);
  const genres = Array.from(new Set(songs.map((s) => s.genre)));

  const onSelectGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      dispatch(deselectGenre(genre));
    } else {
      dispatch(selectGenre(genre));
    }
  };

  return (
    <aside className={classNames("p-12 bg-zinc-800 rounded-lg", className)}>
      <h3 className="text-xl font-bold mb-6">Filter</h3>
      <div>
        {genres.sort().map((genre: string) => {
          const selected = selectedGenres.includes(genre);
          return (
            <div key={genre}>
              <Badge
                key={genre}
                selected={selected}
                title={genre}
                onClick={() => {
                  onSelectGenre(genre);
                }}
              />
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default GenreList;
