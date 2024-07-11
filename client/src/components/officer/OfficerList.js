import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchPoliceOfficers } from '../../services/api'; // Adjust the path as necessary

const OfficerList = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const officersData = await fetchPoliceOfficers(); // Fetch officers using the API function
        setOfficers(officersData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading police officers: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Police Officer List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Officer ID</th>
            <th className="py-2">First Name</th>
            <th className="py-2">Last Name</th>
            <th className="py-2">Badge Number</th>
            <th className="py-2">Rank</th>
            <th className="py-2">Department</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {officers.map(officer => (
            <tr key={officer.OfficerID} className="text-center">
              <td className="py-2">{officer.OfficerID}</td>
              <td className="py-2">{officer.FirstName}</td>
              <td className="py-2">{officer.LastName}</td>
              <td className="py-2">{officer.BadgeNumber}</td>
              <td className="py-2">{officer.Rank}</td>
              <td className="py-2">{officer.Department}</td>
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

export default OfficerList;
