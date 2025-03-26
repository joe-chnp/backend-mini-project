import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBooks from "../hooks/useBooks";

function AddBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const { addBook } = useBooks();
  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      title,
      author,
      category,
    });
  };

  return (
    <div>
      <h1>Add new book</h1>
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
            <button type="submit">Add</button>
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

export default AddBookPage;