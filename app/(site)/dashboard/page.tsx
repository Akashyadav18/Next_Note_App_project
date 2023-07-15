import Link from "next/link";

const fetchBlog = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    next: {
      revalidate: 10,
    },
  });
  const data = await res.json();
  return data.users;
};

const Dashboard = async () => {
  const users = await fetchBlog();

  return (
    <main className="min-h-screen">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-4 rounded-lg drop-shadow-lg">
        <h1 className="text-center text-2xl font-bold"> Note App</h1>
      </div>
      {/* search */}
      {/* <Search /> */}

      {/* link */}
      <div className="flex m-5">
        <Link
          href={"/addnote"}
          className="md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto font-bold bg-slate-700 text-white"
        >
          Add new Note
        </Link>
      </div>
      {/* note */}
      <div className="w-full flex flex-col justify-center items-center">
        {users?.map((post: any) => (
          <div className="w-3/4 p-4 rounded-md mx-3 my-2 flex flex-col justify-center bg-slate-700 text-white">
            <div className="flex items-center">
              <div className="mr-auto my-2">
                <h2 className="mr-auto font-semibold text-3xl">{post.title}</h2>
              </div>
              <div>
                <Link
                  href={`/edit/${post.id}`}
                  className="px-4 py-1 mx-5  text-center text-lg bg-slate-900 rounded-md font-semibold text-slate-200"
                >
                  Edit
                </Link>
              </div>
            </div>
            {/* date */}
            <div>
              <p className="text-white">{new Date(post.date).toDateString()}</p>
            </div>
            {/* desc */}
            <div className="my-1 text-2xl ">
              <p>{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
