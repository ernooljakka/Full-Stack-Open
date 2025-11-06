import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE } from "../queries";
import { useState } from "react";

const Books = () => {
  const [currentGenre, setCurrentGenre] = useState(null);
  const { loading, error, data } = useQuery(ALL_BOOKS);
  const [getBooksByGenre, { data: genreData }] =
    useLazyQuery(ALL_BOOKS_BY_GENRE);

  if (loading) {
    return <div> Loading... </div>;
  }

  if (error) {
    return <div> Error while fetching books </div>;
  }

  const allBooks = data?.allBooks || [];

  let books = genreData?.allBooks || data?.allBooks || [];

  const genres = allBooks.map((b) => b.genres).flat(1);
  const uniqueGenres = [...new Set(genres.map((g) => g.toLowerCase()))];

  const handleFiltering = async (genre) => {
    await getBooksByGenre({
      variables: { genre },
    });
    setCurrentGenre(genre);
  };

  return (
    <div>
      <h2>books</h2>

      {currentGenre && (
        <p>
          Showing books with genre: <b>{currentGenre}</b>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {uniqueGenres.map((genre) => (
        <button onClick={() => handleFiltering(genre)} key={genre}>
          {genre}
        </button>
      ))}
      <button
        onClick={() => {
          getBooksByGenre({ variables: { genre: null } });
          setCurrentGenre(null);
        }}
      >
        All genres
      </button>
    </div>
  );
};

export default Books;
