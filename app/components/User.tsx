"use client";
import { useSession } from "next-auth/react";
import React from "react";

const User = () => {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Name: {JSON.stringify(session?.user?.name)}</h1>
      <h1>Email: {JSON.stringify(session?.user?.email)}</h1>
    </div>
  );
};

export default User;
