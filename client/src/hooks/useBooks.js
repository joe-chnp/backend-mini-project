import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import { jwtDecode } from 'jwt-decode';

function useBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const { state, setState } = useAuth();

  const getBooks = async (input) => {
    const { userId, page } = input;
    const token = localStorage.token;
    if (token && !userId) {
      const userDataFromToken = jwtDecode(token);
      setState({ ...state, user:userDataFromToken });
    }
    try {
      const params = new URLSearchParams();
      params.append("userId", userId);
      params.append("page", page);
      const results = await axios.get(
        `http://localhost:4000/books?${params.toString()}`
      );
      setBooks(results.data.data);
      setTotalPages(results.data.total_pages);
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
    totalPages,
  }
}

export default useBooks;