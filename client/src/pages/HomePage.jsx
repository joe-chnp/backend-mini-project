import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useBooks from '../hooks/useBooks';

function HomePage({ auth }) {
  console.log('homepage');
  const navigate = useNavigate();
  const { books, getBooks, deleteBook } = useBooks();

  useEffect(() => {
    if (!auth) {
      return;
    }
    getBooks();
  }, []);

  return (
    <div>
      <div>
        <h1>My Bookshelf</h1>
        <input type='text' placeholder='search'/>
        {
          auth
          ? <button>Log out</button>
          : <>
            <button onClick={() => navigate("/login")}>Log in</button>
            <button onClick={() => navigate("/signup")}>Sign up</button>
          </>
        }
      </div>
      <button onClick={() => navigate("/book/add")}>Add</button>
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
        <div className='book'>
          <div style={{width: '100px', height: '150px', background: 'red'}}/>
          <div className='book-info'>
            <h2 className='title'>book title</h2>
            <h3 className='info'>author</h3>
            <h3 className='info'>category</h3>
          </div>
        </div>
      </>
      }
      
    </div>
  )
}

export default HomePage
