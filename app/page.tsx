"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import User from "./components/User";
import Link from "next/link";

const Dashboard = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/login");
    } else {
      router.push("/");
    }
  });

  return (
    <div className="min-w-full my-10 flex justify-center items-center">
      <div>
        <h1 className="text-xl font-bold ">Home page</h1>
        {/* <h1>Server Side Rendering</h1>
      <pre>
        Hii{JSON.stringify(session?.data)}
        console.log(session?.data);
      </pre> */}
        <div className="text-xl font-semibold m-9">
          {/* <h1>Client side render</h1> */}
          <User />
        </div>

        <div className=" ">
          <button
            onClick={() => signOut()}
            className="  w-30 rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Logout
          </button>

          <Link
            className=" w-50 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slice-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            href={"/dashboard"}
          >
            Back to Note App
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// 1:22
