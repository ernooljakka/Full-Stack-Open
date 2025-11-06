import { ME, ALL_BOOKS_BY_GENRE } from "../queries";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

const Recommended = () => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const { data: userData } = useQuery(ME);
  const { data } = useQuery(ALL_BOOKS_BY_GENRE);

  const user = userData?.me;

  useEffect(() => {
    if (data && user) {
      const filtered = data.allBooks.filter((b) =>
        b.genres.includes(user.favoriteGenre)
      );
      setRecommendedBooks(filtered);
    }
  }, [data, user]);

  return (
    <div>
      <p> Recommendations </p>
      <p> Books in your favorite genre: {user?.favoriteGenre} </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
