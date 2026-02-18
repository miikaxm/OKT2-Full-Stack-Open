const Blogs = ({ blogs }) => {
  return (
    <>
      {blogs.map(blog => (
        <p key={blog.id}>
          Otsikko: {blog.title} <br /> Tekijä: {blog.author} <br /> URL: {blog.url} <br /> Tykkäykset: {blog.likes}
        </p>
      ))}
    </>
  )
}

export default Blogs
