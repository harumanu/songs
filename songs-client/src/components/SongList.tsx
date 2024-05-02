import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { IoAddCircleSharp } from "react-icons/io5";
import {
  ISong,
  requestFetchSongs,
  requestRemoveSong,
  selectSongsByActiveGenres,
} from "../reducers/songs";
import AddSong from "./AddSong";
import SongListItem from "./SongListItem";
import Button from "./ui/Button";
import GenreList from "./GenreList";

function SongList() {
  const dispatch = useAppDispatch();
  const songs = useAppSelector(selectSongsByActiveGenres);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editSong, setEditSong] = useState<ISong | null>(null);

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
    setEditSong(null);
  };

  useEffect(() => {
    dispatch(requestFetchSongs());
  }, []);

  const onDelete = (song: ISong) => {
    dispatch(requestRemoveSong(song));
  };

  const onEdit = (song: ISong) => {
    setEditSong(song);
    openAddModal();
  };

  return (
    <div className="mx-12">
      <div className="flex mb-5">
        <Button onClick={openAddModal}>
          <IoAddCircleSharp className="mr-1" />
          Add song
        </Button>
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-12">
        <GenreList className="col-span-1 lg:col-span-2" />
        <div className="gap-4 xs:grid-cols-1 sm:grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:grid-cols-3 col-span-1 lg:col-span-10">
          {songs.map((song) => (
            <SongListItem
              key={song._id}
              song={song}
              onDelete={() => onDelete(song)}
              onEdit={() => onEdit(song)}
            />
          ))}
        </div>
      </div>
      <AddSong
        isOpen={addModalOpen}
        close={closeAddModal}
        song={editSong}
        isEditing={!!editSong}
      />
    </div>
  );
}

export default SongList;
