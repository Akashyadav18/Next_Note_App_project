const fetchBlog = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    next: {
      revalidate: 10,
    },
  });
  const data = await res.json();
  return data.users;
};

export async function GET(request: string) {
  const data = await fetchBlog();
}
