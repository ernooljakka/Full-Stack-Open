import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import Select from "react-select";

const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const UPDATE_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const Authors = (props) => {
  const [birthyear, setBirthyear] = useState("");
  const [name, setName] = useState("");

  if (!props.show) {
    return null;
  }

  const [editAuthor] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const { loading, error, data } = useQuery(ALL_AUTHORS);

  if (loading) {
    return <div> Loading... </div>;
  }

  if (error) {
    return <div> Error happened when fetching authors </div>;
  }

  const authors = data.allAuthors;

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const result = await editAuthor({
        variables: {
          name,
          setBornTo: Number(birthyear),
        },
      });

      setBirthyear("");
      setName("");

      console.log(result.data.editAuthor);
    } catch (e) {
      console.error("Error editing author:", e);
    }
  };

  const authorOptions = authors.map((a) => ({
    value: a.name,
    label: a.name,
  }));

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2> Set birthyear </h2>
      <form onSubmit={handleUpdate}>
        <Select
          options={authorOptions}
          value={authorOptions.find((option) => option.value === name)}
          onChange={(selectedOption) => setName(selectedOption.value)}
          placeholder="Select an author..."
        />
        <br />
        <label>
          born
          <input
            value={birthyear}
            onChange={(e) => setBirthyear(e.target.value)}
          />
        </label>
        <br />
        <button type="submit"> Update </button>
      </form>
    </div>
  );
};

export default Authors;
