import React, { useEffect, useState } from 'react';
import { fetchWitnesses } from '../../services/api'; // Adjust the path as necessary

const WitnessList = () => {
  const [witnesses, setWitnesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const witnessesData = await fetchWitnesses(); // Fetch witnesses using the API function
        setWitnesses(witnessesData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading witnesses: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Witness List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Witness ID</th>
            <th className="py-2">Case ID</th>
            <th className="py-2">Crime ID</th>
            <th className="py-2">First Name</th>
            <th className="py-2">Last Name</th>
            <th className="py-2">Statement</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {witnesses.map(witness => (
            <tr key={witness.WitnessID} className="text-center">
              <td className="py-2">{witness.WitnessID}</td>
              <td className="py-2">{witness.CaseID}</td>
              <td className="py-2">{witness.CrimeID}</td>
              <td className="py-2">{witness.FirstName}</td>
              <td className="py-2">{witness.LastName}</td>
              <td className="py-2">{witness.Statement}</td>
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

export default WitnessList;
