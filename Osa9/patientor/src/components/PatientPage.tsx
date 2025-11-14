import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Patient, Diagnosis } from "../types";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./addEntryForm";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | undefined>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const { id } = useParams<{ id: string }>();

  const diagnoseCodes: string[] = diagnoses.map((d) => d.code);

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      const response = await axios.get<Patient>(
        `http://localhost:3000/api/patients/${id}`
      );
      setPatient(response.data);
    };

    const fetchDiagnoses = async () => {
      const response = await axios.get<Diagnosis[]>(
        "http://localhost:3000/api/diagnoses"
      );
      setDiagnoses(response.data);
    };
    fetchPatient();
    fetchDiagnoses();
  }, [id]);

  if (!patient) return <div>Loading patient...</div>;

  return (
    <div>
      <h2>{patient.name}</h2>
      <p> ssn: {patient.ssn} </p>
      <p> occupation {patient.occupation} </p>
      <h3>Entries</h3>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
      <AddEntryForm
        patientId={patient.id}
        setPatient={setPatient}
        patient={patient}
        diagnoseCodes={diagnoseCodes}
      />
    </div>
  );
};

export default PatientPage;
