import { Gender, PatientFormValues } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const checkName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const checkOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const checkSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) throw new Error("Incorrect or missing ssn");
  return ssn;
};

const checkDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date))
    throw new Error("Incorrect or missing date of birth");
  return date;
};

const checkGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

export const checkNewPatient = (object: any): PatientFormValues => {
  return {
    name: checkName(object.name),
    occupation: checkOccupation(object.occupation),
    ssn: checkSsn(object.ssn),
    dateOfBirth: checkDateOfBirth(object.dateOfBirth),
    gender: checkGender(object.gender),
  };
};
