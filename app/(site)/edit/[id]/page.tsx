"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

type UpdateBlogParams = {
  title: string;
  description: string;
  id: string;
};
const updateNote = async (data: UpdateBlogParams) => {
  const res = fetch(`http://localhost:3000/api/blog/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({ title: data.title, description: data.description }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const deleteNote = async (id: string) => {
  const res = fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const getNoteById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();
  return data.user;
};

const EditNote = ({ params }: { params: { id: string } }) => {
  // console.log(params.id);

  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    toast.loading("Fetching Blog Details 🚀", { id: "1" });
    getNoteById(params.id)
      .then((data) => {
        if (titleRef.current && descRef.current) {
          titleRef.current.value = data.title;
          descRef.current.value = data.description;
          toast.success("Fetching Complete", { id: "1" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching blog", { id: "1" });
      });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descRef.current) {
      toast.loading("Sending Request...");
      await updateNote({
        title: titleRef.current?.value,
        description: descRef.current?.value,
        id: params.id,
      });
      toast.success("Note added successfully...");
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleDelete = async () => {
    toast.loading("Deleting Note", { id: "2" });
    await deleteNote(params.id);
    toast.success("Note Deleted...", { id: "2" });
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <Fragment>
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl font-bold p-3">Edit Note 🚀</p>

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

            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-800 text-white rounded-lg  hover:bg-blue-600 hover:text-white">
              Update
            </button>
          </form>
          <button
            onClick={handleDelete}
            className="font-semibold px-4 py-2 shadow-xl bg-red-700 text-white rounded-lg mb-5 hover:bg-slate-800 hover:text-red-600"
          >
            Delete
          </button>
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

export default EditNote;
