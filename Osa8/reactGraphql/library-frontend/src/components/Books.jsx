import { gql, useQuery } from "@apollo/client";

const Books = (props) => {
  if (!props.show) {
    return null;
  }

  const ALL_BOOKS = gql`
    query AllBooks {
      allBooks {
        title
        published
        author
      }
    }
  `;

  const { loading, error, data } = useQuery(ALL_BOOKS);

  if (loading) {
    return <div> Loading... </div>;
  }

  if (error) {
    return <div> Error while fetching books </div>;
  }

  const books = data?.allBooks;

  return (
    <div>
      <h2>books</h2>

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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
