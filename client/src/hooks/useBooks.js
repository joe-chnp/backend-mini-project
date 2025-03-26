import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getBooks = async () => {
    const results = await axios.get(
      `http://localhost:4000/books?userId=2`
    );
    setBooks(results.data.data);
  };

  const getBookById = async (bookId) => {
    const result = await axios.get(`http://localhost:4000/books/${bookId}`);
    setBook(result.data.data[0]);
  };

  const deleteBook = async (bookId) => {
    await axios.delete(`http://localhost:4000/books/${bookId}`);
    const newBooks = books.filter((book) => {
      return book.book_id !== bookId;
    });
    setBooks(newBooks);
  };

  const addBook = async (data) => {
    await axios.post(`http://localhost:4000/books`, data);
    navigate("/");
  };

  const editBookById = async (bookId, data) => {
    await axios.put(`http://localhost:4000/books/${bookId}`, data);
    navigate("/");
  };

  return {
    books,
    book,
    getBooks,
    getBookById,
    deleteBook,
    addBook,
    editBookById,
  }
}

export default useBooks;