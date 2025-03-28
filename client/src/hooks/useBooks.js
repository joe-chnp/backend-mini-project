import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

function useBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const { state } = useAuth();

  const getBooks = async () => {
    try {
      const results = await axios.get(
        `http://localhost:4000/books?userId=${state.user.userId}`
      );
      setBooks(results.data.data);
    } catch (error) {
      console.log(error, 'error')
    }
  };

  const getBookById = async (bookId) => {
    try {
      const result = await axios.get(`http://localhost:4000/books/${bookId}`);
      setBook(result.data.data[0]);
    } catch (error) {
      console.log(error, 'error')
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:4000/books/${bookId}`);
      const newBooks = books.filter((book) => {
        return book.book_id !== bookId;
      });
      setBooks(newBooks);
    } catch (error) {
      console.log(error, 'error')
    }
  };

  const addBook = async (data) => {
    try {
      await axios.post(`http://localhost:4000/books?userId=${state.user.userId}`, data);
      navigate("/");
    } catch (error) {
      console.log(error, 'error')
    }
  };

  const editBookById = async (bookId, data) => {
    try {
      await axios.put(`http://localhost:4000/books/${bookId}`, data);
      navigate("/");
    } catch (error) {
      console.log(error, 'error')
    }
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