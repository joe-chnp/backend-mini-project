import { useState } from "react";
import { useAuth } from "../contexts/authentication";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      username,
      password,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <div className="form">
          <label for="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter username here"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
        </div>
        <div className="form">
          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password here"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage;