import type { FormEvent } from "react";
import { useState } from "react";
import axios from "axios";
import type {
  NewDiaryEntry,
  DiaryEntry,
  Weather,
  Visibility,
} from "../../types";

interface AddDiaryEntryFormProps {
  onAdd: (entry: DiaryEntry) => void;
}

const AddDiaryEntryForm = ({ onAdd }: AddDiaryEntryFormProps) => {
  const [weather, setWeather] = useState<Weather>("sunny");
  const [visibility, setVisibility] = useState<Visibility>("great");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");

  const weatherOptions: Array<Weather> = [
    "sunny",
    "rainy",
    "cloudy",
    "stormy",
    "windy",
  ];

  const visibilityOptions: Array<Visibility> = ["great", "good", "ok", "poor"];

  const addNewDiary = async (e: FormEvent) => {
    e.preventDefault();

    const newDiaryEntry: NewDiaryEntry = { date, weather, visibility, comment };

    try {
      const response = await axios.post<DiaryEntry>(
        "http://localhost:3000/api/diaries",
        newDiaryEntry
      );
      onAdd(response.data);

      setDate("");
      setWeather("sunny");
      setVisibility("great");
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={addNewDiary}>
      <div>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        Visibility:
        {visibilityOptions.map((v) => (
          <label key={v}>
            <input
              type="radio"
              value={v}
              checked={visibility === v}
              onChange={() => setVisibility(v)}
            />
            {v}
          </label>
        ))}
      </div>

      <div>
        Weather:
        {weatherOptions.map((w) => (
          <label key={w}>
            <input
              type="radio"
              value={w}
              checked={weather === w}
              onChange={() => setWeather(w)}
            />
            {w}
          </label>
        ))}
      </div>
      <div>
        Comment:
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default AddDiaryEntryForm;
