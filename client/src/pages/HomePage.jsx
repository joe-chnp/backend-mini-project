import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useBooks from '../hooks/useBooks';
import { useAuth } from '../contexts/authentication';
import { jwtDecode } from 'jwt-decode';

function HomePage({ auth }) {
  const navigate = useNavigate();
  const { books, getBooks, deleteBook } = useBooks();
  const { state, setState, logout } = useAuth();

  const handleMyBooks = () => {
    getBooks();
  }
  
  useEffect(() => {
    const token = localStorage.token;
    if (token) {
      const userDataFromToken = jwtDecode(token);
      setState({ ...state, user:userDataFromToken });
    }
    getBooks();
  }, []);

  return (
    <div>
      <div>
        <h1>My Bookshelf</h1>
        {/* <input type='text' placeholder='search'/> */}
        {
          auth
          ? <>
            <h3>{state?.user?.firstname}</h3>
            <button onClick={() => logout()}>Log out</button>
            <button onClick={handleMyBooks}>My Books</button>
            <button onClick={() => navigate("/book/add")}>Add</button>
          </>
          : <>
            <button onClick={() => navigate("/login")}>Log in</button>
            <button onClick={() => navigate("/signup")}>Sign up</button>  
          </>
        }
      </div>
      
      {
        auth
        ? <>
        {books.map((book) => {
          return (
          <div className='book'>
            <div style={{width: '100px', height: '150px', background: 'red'}}/>
              <div className='book-info'>
                <h2 className='title'>{book?.title}</h2>
                <h3 className='info'>{book?.author}</h3>
                <h3 className='info'>{book?.category}</h3>
              </div>
            <button onClick={() => navigate(`/book/edit/${book.book_id}`)}>Edit</button>
            <button onClick={() => deleteBook(book.book_id)}>Delete</button>
          </div>
          )
        })}
        </>
        : <>
          <h2>Please log in</h2>
        </>
      }
      
    </div>
  )
}

export default HomePage
