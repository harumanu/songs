import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

function Input({
  register,
  name,
  placeholder,
  required = false,
}: {
  register: UseFormRegister<FieldValues>;
  name: string;
  placeholder?: string;
  required: boolean;
}) {
  return (
    <div>
      <label className="block mb-1" htmlFor={name}>
        {placeholder} {required ? "*" : ""}
      </label>
      <input
        placeholder={placeholder}
        className="p-4 bg-zinc-600 text-white-200 rounded-lg block w-full mb-5"
        {...register(name, { required })}
      />
    </div>
  );
}

export default Input;
