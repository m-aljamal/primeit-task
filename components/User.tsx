import React, { useState } from "react";
import { IUserProps } from "../Types";
import Image from "next/image";
const User = ({ user }: IUserProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-8 shadow-md p-5 border flex items-center gap-10 rounded-md">
      <div>
        {user.avatar && (
          <Image
            alt="avatar"
            src={user.avatar}
            width={100}
            height={100}
            className="rounded-full"
          />
        )}
      </div>
      <div>
        <h2>{user.name}</h2>
        <p className="mt-2">{user.eduType}</p>
        <p className="my-2">Email: {user.email}</p>
        <div className="flex items-center gap-4 ">
          <p>Password: </p>
          <p>{showPassword ? user.password : "*******"}</p>
          <svg
            onClick={() => setShowPassword(!showPassword)}
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default User;
