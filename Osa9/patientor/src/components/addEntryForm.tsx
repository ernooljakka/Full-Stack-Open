import { useState } from "react";
import axios from "axios";
import { Entry, Patient } from "../types";
import { Button } from "@mui/material";
import Select, { MultiValue } from "react-select";

interface Props {
  patientId: string;
  patient: Patient;
  setPatient: (patient: Patient) => void;
  diagnoseCodes: string[];
}

const AddEntryForm = ({
  patientId,
  patient,
  setPatient,
  diagnoseCodes,
}: Props) => {
  const [type, setType] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare"
  >("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState("0");

  // Hospital type
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  // Occupational type
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const [error, setError] = useState("");
  const [openForm, setOpenForm] = useState(false);

  const options = diagnoseCodes.map((code) => ({
    value: code,
    label: code,
  }));

  console.log(options);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let newEntry: any = {
        type,
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
      };

      if (type === "HealthCheck") {
        newEntry.healthCheckRating = Number(healthCheckRating);
      } else if (type === "Hospital") {
        newEntry.discharge = {
          date: dischargeDate,
          criteria: dischargeCriteria,
        };
      } else if (type === "OccupationalHealthcare") {
        newEntry.employerName = employerName;
        if (sickLeaveStart && sickLeaveEnd) {
          newEntry.sickLeave = {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd,
          };
        }
      }

      const response = await axios.post<Entry>(
        `http://localhost:3000/api/patients/${patientId}/entries`,
        newEntry
      );

      setPatient({
        ...patient,
        entries: [...patient.entries, response.data],
      });

      setDescription("");
      setDate("");
      setSpecialist("");
      setDiagnosisCodes([]);
      setHealthCheckRating("0");
      setDischargeDate("");
      setDischargeCriteria("");
      setEmployerName("");
      setSickLeaveStart("");
      setSickLeaveEnd("");
      setError("");
      setOpenForm(false);
    } catch (err: any) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div>
      <Button onClick={() => setOpenForm(!openForm)} variant="contained">
        {openForm ? "Cancel" : "Add new Entry"}
      </Button>
      <br />
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {openForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Type: </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
            >
              <option value="HealthCheck">HealthCheck</option>
              <option value="Hospital">Hospital</option>
              <option value="OccupationalHealthcare">
                OccupationalHealthcare
              </option>
            </select>
          </div>

          <div>
            <label>Description: </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Date: </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label>Specialist: </label>
            <input
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
            />
          </div>
          <div>
            <div>
              <p>Select diagnose codes</p>
              <Select
                isMulti
                name="codes"
                options={options}
                onChange={(
                  selected: MultiValue<{ value: string; label: string }>
                ) => {
                  const values = selected.map((s) => s.value);
                  setDiagnosisCodes(values);
                }}
              />
            </div>
          </div>

          {type === "HealthCheck" && (
            <div>
              <label>Health Check Rating (0-3): </label>
              <input
                type="number"
                min="0"
                max="3"
                value={healthCheckRating}
                onChange={(e) => setHealthCheckRating(e.target.value)}
              />
            </div>
          )}

          {type === "Hospital" && (
            <>
              <div>
                <label>Discharge Date: </label>
                <input
                  type="date"
                  value={dischargeDate}
                  onChange={(e) => setDischargeDate(e.target.value)}
                />
              </div>
              <div>
                <label>Discharge Criteria: </label>
                <input
                  value={dischargeCriteria}
                  onChange={(e) => setDischargeCriteria(e.target.value)}
                />
              </div>
            </>
          )}

          {type === "OccupationalHealthcare" && (
            <>
              <div>
                <label>Employer Name: </label>
                <input
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                />
              </div>
              <div>
                <label>Sick Leave Start: </label>
                <input
                  type="date"
                  value={sickLeaveStart}
                  onChange={(e) => setSickLeaveStart(e.target.value)}
                />
              </div>
              <div>
                <label>Sick Leave End: </label>
                <input
                  type="date"
                  value={sickLeaveEnd}
                  onChange={(e) => setSickLeaveEnd(e.target.value)}
                />
              </div>
            </>
          )}

          <Button type="submit" variant="contained" color="primary">
            Add Entry
          </Button>
        </form>
      )}
    </div>
  );
};

export default AddEntryForm;
