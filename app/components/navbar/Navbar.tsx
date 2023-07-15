import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-20 flex justify-around items-center text-white bg-slate-700">
      <h2 className="text-3xl font-semibold">Note App</h2>
      <div className="flex gap-5 text-xl font-medium">
        <Link href={"/"}>Home</Link>
        <Link href={"/login"}>Login</Link>
        <Link href={"/register"}>Register</Link>
        <Link href={"/logout"}>Logout</Link>
      </div>
    </div>
  );
};

export default Navbar;
