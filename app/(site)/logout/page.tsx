"use client";

import { signOut } from "next-auth/react";
import React from "react";

const Logout = () => {
  return (
    <div>
      <button
        onClick={() => signOut()}
        className="flex w-20 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
