import { ME } from "../queries"
import { useQuery } from "@apollo/client/react"
import { BOOKS_BY_GENRE } from "../queries"

const Recommend = ({ show }) => {
  const { loading: userLoading, error: userError, data: userData } = useQuery(ME)
  const currentUser = userData?.me
  const genre = currentUser?.favoriteGenre
  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre }
  })

  if (!show) return null
  if (userLoading) return <p>loading...</p>
  if (userError) return <p>error</p>
  if (booksLoading) return <p>loading books...</p>
  if (booksError) return <p>error loading books</p>

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{genre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksData.booksByGenre.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend