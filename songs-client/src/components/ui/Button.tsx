import React from "react";
import { classNames } from "../../utils";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  outline?: boolean;
}

function Button({
  children,
  type = "button",
  onClick,
  outline = false,
  className = "",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={classNames(
        "inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white-100 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        className,
        outline
          ? "bg-transparent border-gray-500 hover:bg-transparent hover:border-gray-400"
          : "",
        disabled ? "bg-zinc-500 hover:bg-zinc-500" : "",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
