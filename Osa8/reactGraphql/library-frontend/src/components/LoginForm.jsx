import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setMessage, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      setMessage({ message: error.graphQLErrors[0].message, type: "error" });
      setTimeout(() => {
        setMessage({ message: null, type: null });
      }, 3000);
    },
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);

      setMessage({ message: "Login successful!", type: "success" });
      setTimeout(() => {
        setMessage({ message: null, type: null });
      }, 3000);
      setUsername("");
      setPassword("");
      navigate("/authors");
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
