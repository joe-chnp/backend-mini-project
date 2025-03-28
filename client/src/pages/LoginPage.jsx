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
        <div>
          <label for="username">
            Username
            <input
              id="username"
              name="username"
              type="text"
              placeholder="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
            />
          </label>
        </div>
        <div>
          <label for="password">
            Password
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </label>
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage;