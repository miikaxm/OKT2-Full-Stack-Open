import {
  useApolloClient,
  useQuery,
  useSubscription
} from '@apollo/client/react'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginFrom'
import Recommend from './components/Recommend'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log('SUBSCRIPTION DATA:', data)
      alert(`Book added: ${data.data.bookAdded.title}`)
    },
  })

  const onLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors show={page === 'authors'} />

        <Books show={page === 'books'} />

        <LoginForm setToken={setToken} show={page === 'login'} />
      </div>
    )
  }

  return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={onLogout}>logout</button>
        </div>

        <Authors show={page === 'authors'} />
        <Books show={page === 'books'} />
        <NewBook show={page === 'add'} />
        <Recommend show={page === 'recommend'} />
      </div>
    )
  
}

export default App
