import React, { useState } from "react";
import { ISong } from "../reducers/songs";
import Button from "./ui/Button";
import { IoDiscSharp } from "react-icons/io5";
import ConfirmDialog from "./ui/ConfirmDialog";

function SongListItem({
  song,
  onDelete,
  onEdit,
}: {
  song: ISong;
  onDelete: (arg : ISong) => void;
  onEdit: (arg : ISong) => void;
}) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const { _id, artist, title, album, genre } = song;

  const onConfirmDelete = () => {
    onDelete(song);
  };

  const onCancelDelete = () => {
    setConfirmDialogOpen(false);
  };
  return (
    <div key={_id} className="p-6 bg-zinc-800 rounded-lg">
      <ConfirmDialog
        title="Delete song"
        content="Are you sure you want to delete this song?"
        confirmLabel="Delete"
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
        isOpen={confirmDialogOpen}
      />
      <div className="rounded w-full h-[200px] bg-zinc-700 mb-6 flex items-center justify-center">
        <IoDiscSharp fontSize={140} className="opacity-25" />
      </div>
      <div className="text-xl">
        {artist} - {title}
      </div>
      <div className="text-white/80">{album}</div>
      <div className="text-white/40">{genre}</div>
      <div className="flex mt-5">
        <Button className="mr-2" onClick={() => onEdit(song)}>
          Edit
        </Button>
        <Button outline onClick={() => setConfirmDialogOpen(true)}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default SongListItem;
