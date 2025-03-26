import { useState } from "react";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  return (
    <div>
      <form>
        <h1>Sign up</h1>
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
              type="text"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </label>
        </div>
        <div>
          <label for="firstname">
            First name
            <input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="first name"
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              value={firstname}
            />
          </label>
        </div>
        <div>
          <label for="lastname">
            Last name
            <input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="last name"
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              value={lastname}
            />
          </label>
        </div>

        <div>
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  )
}

export default SignupPage;