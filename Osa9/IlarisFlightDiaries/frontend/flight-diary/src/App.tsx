import axios from "axios";
import type { DiaryEntry } from "../types";
import { useState, useEffect } from "react";
import AddDiaryEntryForm from "./components/AddDiaryEntryForm";

const apiUrl = "http://localhost:3000/api/diaries";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get<DiaryEntry[]>(apiUrl);
        setDiaries(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiaries();
  }, []);

  return (
    <div>
      <h1> Add new entry </h1>
      <AddDiaryEntryForm onAdd={(entry) => setDiaries([...diaries, entry])} />
      <h1> Diary Entries </h1>
      {diaries.map((d) => (
        <div key={d.id}>
          <h3> {d.date} </h3>
          <p> Visibility: {d.visibility} </p>
          <p> Weather: {d.weather} </p>
        </div>
      ))}
    </div>
  );
};

export default App;
