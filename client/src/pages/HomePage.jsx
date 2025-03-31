import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useBooks from '../hooks/useBooks';
import { useAuth } from '../contexts/authentication';

function HomePage({ auth }) {
  const navigate = useNavigate();
  const { books, getBooks, deleteBook, totalPages } = useBooks();
  const { state, logout } = useAuth();
  const [userId, setUserId] = useState(state?.user?.userId)
  const [page, setPage] = useState(1);
  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  const handleMyBooks = () => {
    setUserId(state?.user?.userId)
    getBooks({ userId, page});
  }
  
  useEffect(() => {
    getBooks({ userId, page});
  }, [userId, page]);

  return (
    <div>
      <div>
        <h1>My Bookshelf</h1>
        {
          auth
          ? <>
            <div style={{width: '60vw', display: 'flex', justifyContent: 'space-between'}}>
              <div className='button-container'>
                <button onClick={handleMyBooks}>My Books</button>
                <button onClick={() => navigate("/book/add")}>Add</button>
              </div>
              <div className='button-container'>
                <h3>{state?.user?.firstname}</h3>
                <button className='logout' onClick={() => logout()}>Log out</button>
              </div>
            </div>
          </>
          : <div style={{display: 'flex', gap: '20px', justifyContent: 'center'}}>
            <button onClick={() => navigate("/login")}>Log in</button>
            <button onClick={() => navigate("/signup")}>Sign up</button>  
          </div>
        }
      </div>
      
      {
        auth
        ? <>
        {books.map((book) => {
          return (
          <div className='book'>
            <div style={{width: '80px', height: '100px', display: 'flex', alignItems: 'center', background: 'lightgrey', borderRadius: '5px'}}>
              <img src='/book.png'/>
            </div>
            <div className='book-info'>
              <h2 className='info'>{book?.title}</h2>
              <h3 className='info'>{book?.author}</h3>
              <h3 className='info'>{book?.category}</h3>
            </div>
            <div className='button-container'>
              <button onClick={() => navigate(`/book/edit/${book.book_id}`)}>Edit</button>
              <button onClick={() => deleteBook(book.book_id)}>Delete</button>
            </div>
          </div>
          )
        })}
        </>
        : <>
          <h2>Please log in</h2>
        </>
      }

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
       
        {pages.map((p) => (
          <button style={p ===  page ? {background: '#213547', color: '#f9f9f9'} : {}} onClick={() => setPage(p)}>{p}</button>
        ))}

        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      
    </div>
  )
}

export default HomePage
