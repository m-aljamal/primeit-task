import React from "react";
import { IInput } from "../Types";

const Input = ({ register, placeholder, error }: IInput) => {
  return (
    <div>
      <input
        {...register}
        placeholder={placeholder}
        className={`input ${error && " focus:ring-red-600"}`}
      />
      {error && (
        <div className="flex gap-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
};
export default Input;
