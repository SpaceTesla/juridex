import React, { useEffect, useState } from 'react';
import { fetchCases } from '../../services/api'; // Adjust the path as necessary

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const casesData = await fetchCases(); // Fetch cases using the API function
        setCases(casesData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading court cases: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Court Case List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Case ID</th>
            <th className="py-2">Crime ID</th>
            <th className="py-2">Court Date</th>
            <th className="py-2">Judge Name</th>
            <th className="py-2">Verdict</th>
            <th className="py-2">Sentence</th>
            <th className="py-2">Officer ID</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases.map(courtCase => (
            <tr key={courtCase.CaseID} className="text-center">
              <td className="py-2">{courtCase.CaseID}</td>
              <td className="py-2">{courtCase.CrimeID}</td>
              <td className="py-2">{courtCase.CourtDate}</td>
              <td className="py-2">{courtCase.JudgeName}</td>
              <td className="py-2">{courtCase.Verdict}</td>
              <td className="py-2">{courtCase.Sentence}</td>
              <td className="py-2">{courtCase.OfficerID}</td>
              <td className="py-2">
                <button className="text-blue-500 hover:underline">View</button>
                <button className="text-red-500 hover:underline ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaseList;