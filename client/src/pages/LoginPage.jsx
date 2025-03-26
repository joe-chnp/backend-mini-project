import { useState } from "react";

function LoginPage() {
  console.log('login');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form>
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