import { Entry, Diagnosis } from "../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const box: React.CSSProperties = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "1rem",
  marginBottom: "1rem",
  background: "rgba(167, 102, 29, 0.13)",
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <div style={box}>
          <h4>{entry.date}</h4>
          <p>{entry.description}</p>
          <p>
            <strong>Health rating:</strong> {entry.healthCheckRating}
          </p>

          {entry.diagnosisCodes?.length && (
            <ul>
              {entry.diagnosisCodes.map((code) => {
                const diagnose = diagnoses.find((d) => d.code === code);
                console.log(diagnose);

                return (
                  <li key={code}>
                    {code} {diagnose ? diagnose.name : ""}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      );

    case "Hospital":
      return (
        <div style={box}>
          <h4>{entry.date}</h4>
          <p>{entry.description}</p>
          <p>
            <strong>Discharge:</strong> {entry.discharge.date} –{" "}
            {entry.discharge.criteria}
          </p>

          {entry.diagnosisCodes?.length && (
            <ul>
              {entry.diagnosisCodes.map((code) => {
                const diagnose = diagnoses.find((d) => d.code === code);
                return (
                  <li key={code}>
                    {code} {diagnose ? diagnose.name : ""}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      );

    case "OccupationalHealthcare":
      return (
        <div style={box}>
          <h4>
            {entry.date} — <i>{entry.employerName}</i>
          </h4>
          <p>{entry.description}</p>

          {entry.sickLeave && (
            <p>
              <strong>Sick leave:</strong> {entry.sickLeave.startDate} →{" "}
              {entry.sickLeave.endDate}
            </p>
          )}

          {entry.diagnosisCodes?.length && (
            <ul>
              {entry.diagnosisCodes.map((code) => {
                const diagnose = diagnoses.find((d) => d.code === code);

                return (
                  <li key={code}>
                    {code} {diagnose ? diagnose.name : ""}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      );

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
