import { useState } from 'react'

const Blogform = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    // tyhjennetään kentät
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input
          type="text"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
          placeholder='write title here'
        />
      </div>

      <div>
        author:
        <input
          type="text"
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
          placeholder='write author here'
        />
      </div>

      <div>
        url:
        <input
          type="text"
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
          placeholder='write url here'
        />
      </div>

      <button type="submit">create</button>
    </form>
  )
}

export default Blogform
