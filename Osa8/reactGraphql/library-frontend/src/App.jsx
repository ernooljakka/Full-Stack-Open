import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Recommended from "./components/Recommended";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [token, setToken] = useState(() =>
    localStorage.getItem("library-user-token")
  );
  const [message, setMessage] = useState({ message: null, type: null });

  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <Notification message={message.message} type={message.type} />
      <nav>
        <button>
          <Link to="/authors">Authors</Link>
        </button>
        <button>
          <Link to="/books">Books</Link>
        </button>
        {token && (
          <button>
            <Link to="/add">Add book</Link>
          </button>
        )}
        {token && (
          <button>
            <Link to="/recommended">Recommended</Link>
          </button>
        )}
        {!token && (
          <button>
            <Link to="/login">Login</Link>
          </button>
        )}
        {token && <button onClick={logout}> Logout </button>}
      </nav>

      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/add"
          element={token ? <NewBook /> : <div>Please login to add books</div>}
        />
        <Route
          path="/login"
          element={<LoginForm setMessage={setMessage} setToken={setToken} />}
        />
        <Route
          path="/recommended"
          element={
            token ? (
              <Recommended />
            ) : (
              <div>Please login to see recommended books</div>
            )
          }
        />
        <Route path="/" element={<Authors />} />
      </Routes>
    </div>
  );
};

export default App;
