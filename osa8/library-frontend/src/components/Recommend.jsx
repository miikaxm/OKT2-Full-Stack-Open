import { ME } from "../queries"
import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS } from "../queries"

const Recommend = ({ show }) => {
  if (!show) {
    return null
  }
  const { loading: userLoading, error: userError, data: userData } = useQuery(ME)
  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(ALL_BOOKS)

  if (userLoading || booksLoading) return <p>loading...</p>
  if (userError || booksError) return <p>error</p>

  const currentUser = userData.me
  const books = booksData.allBooks

  const recommendedBooks = books.filter((b) =>
    b.genres.includes(currentUser.favoriteGenre)
  )
  

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{currentUser.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((b) => (
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