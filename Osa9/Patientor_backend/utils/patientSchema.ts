import { z } from "zod";
import { Gender, PatientFormValues } from "../types";

export const patientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  occupation: z.string().min(1, "Occupation is required"),
  ssn: z.string().min(1, "SSN is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(Gender),
});

export const checkNewPatient = (object: unknown): PatientFormValues => {
  return patientSchema.parse(object);
};
