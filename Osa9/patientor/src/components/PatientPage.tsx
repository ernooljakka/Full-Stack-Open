import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Patient, Diagnosis } from "../types";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | undefined>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      const response = await axios.get<Patient>(
        `http://localhost:3000/api/patients/${id}`
      );
      setPatient(response.data);
      console.log(response.data);
    };

    const fetchDiagnoses = async () => {
      const response = await axios.get<Diagnosis[]>(
        "http://localhost:3000/api/diagnoses"
      );
      setDiagnoses(response.data);
      console.log(response.data);
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
      <p>
        {patient.entries[0].date} {patient.entries[0].description}
      </p>
      <ul>
        {patient.entries[0].diagnosisCodes?.map((dc, index) => {
          const diagnose = diagnoses?.filter((d) => d.code === dc)[0];
          return (
            <li key={index}>
              {dc} {diagnose?.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PatientPage;
