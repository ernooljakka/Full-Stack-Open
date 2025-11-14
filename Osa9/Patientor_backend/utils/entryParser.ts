import { NewEntry, HealthCheckRating } from "../types";

const parseString = (value: unknown, field: string): string => {
  if (!value || typeof value !== "string") {
    throw new Error(`Incorrect or missing ${field}`);
  }
  return value;
};

const parseDate = (value: unknown, field: string): string => {
  if (!value || typeof value !== "string" || isNaN(Date.parse(value))) {
    throw new Error(`Incorrect or missing ${field}`);
  }
  return value;
};

const parseHealthCheckRating = (value: unknown): HealthCheckRating => {
  if (value === undefined || value === null || isNaN(Number(value))) {
    throw new Error("Incorrect or missing healthCheckRating");
  }
  return Number(value) as HealthCheckRating;
};

const parseDiagnosisCodes = (codes: unknown): string[] | undefined => {
  if (!codes) return undefined;
  if (!Array.isArray(codes) || !codes.every((c) => typeof c === "string")) {
    throw new Error("Incorrect diagnosisCodes");
  }
  return codes as string[];
};

export const toNewEntry = (object: any): NewEntry => {
  const baseEntry = {
    description: parseString(object.description, "description"),
    date: parseDate(object.date, "date"),
    specialist: parseString(object.specialist, "specialist"),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };

  switch (object.type) {
    case "HealthCheck":
      return {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };

    case "Hospital":
      return {
        ...baseEntry,
        type: "Hospital",
        discharge: {
          date: parseDate(object.discharge?.date, "discharge.date"),
          criteria: parseString(
            object.discharge?.criteria,
            "discharge.criteria"
          ),
        },
      };

    case "OccupationalHealthcare":
      return {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseString(object.employerName, "employerName"),
        sickLeave: object.sickLeave
          ? {
              startDate: parseDate(
                object.sickLeave.startDate,
                "sickLeave.startDate"
              ),
              endDate: parseDate(object.sickLeave.endDate, "sickLeave.endDate"),
            }
          : undefined,
      };

    default:
      throw new Error(`Unknown entry type: ${object.type}`);
  }
};
