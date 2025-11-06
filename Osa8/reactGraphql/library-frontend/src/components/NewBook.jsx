import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ALL_BOOKS, ALL_AUTHORS, ADD_BOOK } from "../queries";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook, { data, loading, error }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();
    console.log("add book...");

    try {
      const result = await addBook({
        variables: {
          title,
          author,
          published: Number(published),
          genres,
        },
      });
      console.log("Added book:", result.data.addBook);

      // Clear the form
      setTitle("");
      setPublished("");
      setAuthor("");
      setGenres([]);
      setGenre("");
    } catch (e) {
      console.error("Error adding book:", e);
    }
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(", ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
