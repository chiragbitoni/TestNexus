"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./page.css";

export default function Reports() {
  const [testRuns, setTestRuns] = useState([]);

  useEffect(() => {
    async function getTestResults() {
      const res = await fetch("http://localhost:3000/api/test-results", { cache: "force-cache" });
      if (!res.ok) {
        throw new Error("Failed to fetch test results");
      }
      const data = await res.json();
      setTestRuns(data);
    }
    getTestResults();
  }, []);

  const runCards = () => {
    return testRuns.map((run: any, index: number) => (
      <Link href={`/report/${index}`} key={index} className="card-link">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Execution Time: {run["Execution Date"]}</h5>
            <p className="card-text">Total Time: {run["Total Time"]}</p>
            <p className="card-text">Test Cases: {run["Test Cases"].length}</p>
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <div className="button-container">
      <div className="label-button-wrapper">
        <label>Run Tests:</label>
        <button className="btn btn-primary">Run Test</button>
      </div>
      <hr />
      {runCards()}
    </div>
  );
}
