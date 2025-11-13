import express from "express";
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

const app = express();
app.use(express.json());
const cors = require("cors");

const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port localhost:${PORT}`);
});
