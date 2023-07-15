"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment, useRef } from "react";
import { toast } from "react-hot-toast";

const postNote = async ({
  title,
  description,
}: {
  title: String;
  description: String;
}) => {
  const res = await fetch("http://localhost:3000/api/blog", {
    method: "POST",
    body: JSON.stringify({ title, description }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return res.json();
};

const AddNote = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descRef.current) {
      toast.loading("Sending Request...");
      await postNote({
        title: titleRef.current?.value,
        description: descRef.current?.value,
      });
      toast.success("Note added successfully...");
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <Fragment>
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl font-bold p-3">Add Note 🚀</p>

          {/* form */}
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="Enter Title"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2 "
            />
            <textarea
              ref={descRef}
              rows={4}
              cols={5}
              placeholder="Enter Description"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-800 text-white rounded-lg m-auto hover:bg-slate-100 hover:text-black">
              Submit
            </button>
          </form>
          <Link
            href={"/dashboard"}
            className="font-semibold px-4 py-2 shadow-xl bg-slate-800 text-white rounded-lg m-auto hover:bg-slate-100 hover:text-black"
          >
            Back
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default AddNote;
