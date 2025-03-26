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
          <div>
            <label>
              Title
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
            </label>
          </div>
          <div>
            <label>
              Author
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
            </label>
          </div>
          <div>
            <label>
              Category
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
            </label>
          </div>

          <div>
            <button type="submit">Update</button>
          </div>
          </form>
        </div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default EditBookPage;