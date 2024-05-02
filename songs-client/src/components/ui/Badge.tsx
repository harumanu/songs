import React, { MouseEventHandler } from "react";
import { classNames } from "../../utils";

function Badge({
  title,
  selected,
  onClick,
}: {
  title: string;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={classNames(
        "px-5 py-2 rounded-full bg-transparent border mb-2 mr-2",
        selected ? "bg-white text-zinc-900" : "",
      )}
      onClick={onClick as MouseEventHandler}
    >
      {title}
    </button>
  );
}

export default Badge;
