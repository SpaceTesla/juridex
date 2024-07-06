import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecordList = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/criminal_records')
      .then(response => {
        setRecords(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading criminal records: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Criminal Record List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Person ID</th>
            <th className="py-2">Crime ID</th>
            <th className="py-2">Date of Record</th>
            <th className="py-2">Record Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={`${record.PersonID}-${record.CrimeID}`} className="text-center">
              <td className="py-2">{record.PersonID}</td>
              <td className="py-2">{record.CrimeID}</td>
              <td className="py-2">{record.DateOfRecord}</td>
              <td className="py-2">{record.RecordStatus}</td>
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

export default RecordList;
