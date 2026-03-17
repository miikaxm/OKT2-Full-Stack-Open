import { ALL_BOOKS } from "../queries"
import { useQuery } from '@apollo/client/react'
import { useState } from "react"



const Books = (props) => {
  if (!props.show) {
    return null
  }

  const [filter, setFilter] = useState('')
  const { loading, error, data } = useQuery(ALL_BOOKS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const books = data.allBooks

  const filteredBooks = filter
  ? books.filter((b) => b.genres.includes(filter))
  : books

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setFilter('refactoring')}>refactoring</button>
      <button onClick={() => setFilter('agile')}>agile</button>
      <button onClick={() => setFilter('patterns')}>patterns</button>
      <button onClick={() => setFilter('design')}>design</button>
      <button onClick={() => setFilter('crime')}>crime</button>
      <button onClick={() => setFilter('classic')}>classic</button>
      <button onClick={() => setFilter('')}>all genres</button>
    </div>
  )
}

export default Books
