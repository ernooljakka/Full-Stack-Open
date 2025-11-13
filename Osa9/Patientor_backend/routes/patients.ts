import express from "express";
import patients from "../data/patients";
import { checkNewPatient } from "../utils/patientSchema";
import { Patient } from "../types";
import { v4 as uuid } from "uuid";
import { z, ZodError } from "zod";

const router = express.Router();

// Omit -- remove one or more fields from interface or type
type NonSensitivePatient = Omit<Patient, "ssn">;

type NewPatient = Omit<Patient, "id">;

router.get("/", (_req, res) => {
  const nonSensitivePatients: NonSensitivePatient[] = patients.map(
    ({ ssn, ...rest }) => rest
  );
  res.json(nonSensitivePatients);
});

router.post("/", (req, res) => {
  try {
    const newPatient: NewPatient = checkNewPatient(req.body);
    const addedPatient: Patient = { id: uuid(), ...newPatient };
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

export default router;
