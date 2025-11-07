import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import isNotNumber from "./utils";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (!height || !weight || isNaN(heightNum) || isNaN(weightNum)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(heightNum, weightNum);

  return res.json({
    weight: weightNum,
    height: heightNum,
    bmi,
  });
});

app.post("/calculate", (req, res): void => {
  const body = req.body as { target: number; daily_exercises: number[] };
  const { target, daily_exercises } = body;

  if (!target || isNaN(Number(target))) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  if (!Array.isArray(daily_exercises)) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  for (const e of daily_exercises) {
    if (isNotNumber(Number(e))) {
      res
        .status(400)
        .send({ error: "Every daily exercise amount must be a number" });
      return;
    }
  }

  const result = calculateExercises(daily_exercises, target);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port localhost:${PORT}`);
});
