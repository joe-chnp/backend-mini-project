import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBooks from "../hooks/useBooks";
import { useParams } from "react-router-dom";

function EditBookPage() {
  const params = useParams();
  const { book, getBookById, editBookById } = useBooks();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getBookById(params.bookId);
  }, []);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setCategory(book.category);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editBookById(params.bookId, {
      title,
      author,
      category,
    });
  };

  return (
    <div>
      <h1>Edit book</h1>
        <div>
          <form onSubmit={handleSubmit}>
          <div className="form">
            <label>Title</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter title here"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            />
          </div>
          <div className="form">
            <label>Author</label>
            <input
              id="author"
              name="author"
              type="text"
              placeholder="Enter author here"
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
              value={author}
            />
          </div>
          <div className="form">
            <label>Category</label>
            <input
              id="category"
              name="category"
              type="text"
              placeholder="Enter category here"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={category}
            /> 
          </div>

          <div className="button-container">
            <button type="submit">Update</button>
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Back to Home
            </button>
          </div>
          </form>
        </div>
    </div>
  );
}

export default EditBookPage;