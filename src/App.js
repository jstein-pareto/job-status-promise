import { useCallback, useEffect, useMemo, useState } from "react";
import { getJobStatus, getFilePartStatuses } from "./helpers";
import { StatusTable } from "./StatusTable";
import "./styles.css";

// NOTE: filePartsStatuses is the thing that is not working for me...

export default function App() {
  const [results, setResults] = useState([]);
  const [rows, setRows] = useState([]);
  const [filePartsStatuses, setFilePartsStatuses] = useState({});

  const mockContext = useMemo(
    () => ({
      jobId: 12,
      jobFullFiles: [
        { fileId: "a", fileStatus: 2 },
        { fileId: "b", fileStatus: 6 },
        { fileId: "c", fileStatus: 5 }
      ]
    }),
    []
  );
  const { jobId, jobFullFiles } = mockContext;

  const createRows = useCallback(() => {
    const newRows = results.map(({ fileId, fileStatus }) => {
      // need filePartsStatuses to be ready here!
      const jobStatus = getJobStatus(fileId, fileStatus, filePartsStatuses);
      // console.log("jobStatus: ", jobStatus);
      return [fileId, jobStatus];
    });
    // console.log(newRows);
    setRows(newRows);
  }, [results, filePartsStatuses]);

  useEffect(() => {
    const newResults = jobFullFiles;
    setResults(newResults);
  }, [jobFullFiles]);

  useEffect(() => {
    createRows();
  }, [results, createRows]);

  useEffect(() => {
    async function fetchData() {
      const fileIds = jobFullFiles.map(({ fileId }) => fileId);
      const newStatuses = await getFilePartStatuses(fileIds);
      console.log("newStatuses: ", newStatuses);
      setFilePartsStatuses(newStatuses);
    }
    fetchData();
  }, [results, jobId, jobFullFiles]);

  return (
    <div className="App">
      <StatusTable columns={["id", "status"]} rows={rows} />
    </div>
  );
}
