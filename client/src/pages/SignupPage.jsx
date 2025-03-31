import { useState } from "react";
import { useAuth } from "../contexts/authentication"; 

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
      firstname,
      lastname,
    };
    register(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
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
            type="text"
            placeholder="Enter password here"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        <div className="form">
          <label for="firstname">First name</label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            placeholder="Enter first name here"
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            value={firstname}
          />
        </div>
        <div className="form">
          <label for="lastname">Last name</label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Enter last name here"
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            value={lastname}
          />
        </div>

        <div>
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  )
}

export default SignupPage;