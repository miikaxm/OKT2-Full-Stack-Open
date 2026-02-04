const Blogform = ({
  addBlog,
  newTitle,
  setNewTitle,
  newAuthor,
  setNewAuthor,
  newUrl,
  setNewUrl
}) => {
    return(
      <form onSubmit={addBlog}>
      <div>
        <label>
          title:
          <input
           type="text"
           value={newTitle}
           onChange={({ target }) => setNewTitle(target.value)}
           />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
           type="text"
           value={newAuthor}
           onChange={({ target }) => setNewAuthor(target.value)}
           />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
           type="text"
           value={newUrl}
           onChange={({ target }) => setNewUrl(target.value)}
           />
        </label>
      </div>
      <button type='submit'>create</button>
    </form>
    )
  }

export default Blogform