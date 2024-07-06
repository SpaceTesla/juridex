import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CrimeList = () => {
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/crimes')
      .then(response => {
        setCrimes(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading crimes: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Crime List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Crime ID</th>
            <th className="py-2">Crime Type</th>
            <th className="py-2">Description</th>
            <th className="py-2">Date Of Crime</th>
            <th className="py-2">Location</th>
            <th className="py-2">Latitude</th>
            <th className="py-2">Longitude</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {crimes.map(crime => (
            <tr key={crime.CrimeID} className="text-center">
              <td className="py-2">{crime.CrimeID}</td>
              <td className="py-2">{crime.CrimeType}</td>
              <td className="py-2">{crime.Description}</td>
              <td className="py-2">{crime.DateOfCrime}</td>
              <td className="py-2">{crime.Location}</td>
              <td className="py-2">{crime.Latitude}</td>
              <td className="py-2">{crime.Longitude}</td>
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

export default CrimeList;
