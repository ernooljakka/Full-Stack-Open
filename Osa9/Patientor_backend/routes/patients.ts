import express from "express";
import patients from "../data/patients";
import { checkNewPatient } from "../utils/patientSchema";
import { Patient, Entry } from "../types";
import { v4 as uuid } from "uuid";
import { z, ZodError } from "zod";
import { toNewEntry } from "../utils/entryParser";

const router = express.Router();

// Omit -- remove one or more fields from interface or type
type NonSensitivePatient = Omit<Patient, "ssn">;

type NewPatient = Omit<Patient, "id" | "entries">;

router.get("/", (_req, res) => {
  const patient: NonSensitivePatient[] = patients.map(
    ({ ssn, ...rest }) => rest
  );
  res.json(patient);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const patient: Patient[] = patients.filter((p) => p.id === id);

  res.json(patient[0]);
});

router.post("/", (req, res) => {
  try {
    const newPatient: NewPatient = checkNewPatient(req.body);
    const addedPatient: Patient = { id: uuid(), entries: [], ...newPatient };
    patients.push(addedPatient);
    res.json(addedPatient);
  } catch (e: any) {
    let errorMessage = "Something went wrong.";
    console.log(z.prettifyError(e));

    if (e instanceof ZodError) {
      errorMessage += z.prettifyError(e);
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patient = patients.find((p) => p.id === req.params.id);
    if (!patient) return res.status(404).send("Patient not found");

    const parsedEntry = toNewEntry(req.body);

    const newEntry: Entry = { id: uuid(), ...parsedEntry };
    patient.entries.push(newEntry);

    return res.json(newEntry);
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
});

export default router;
