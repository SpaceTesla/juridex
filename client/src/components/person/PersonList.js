import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PersonList = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/persons')
      .then(response => {
        setPersons(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading persons: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Person List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Person ID</th>
            <th className="py-2">First Name</th>
            <th className="py-2">Last Name</th>
            <th className="py-2">Date of Birth</th>
            <th className="py-2">Gender</th>
            <th className="py-2">Address</th>
            <th className="py-2">Contact Info</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {persons.map(person => (
            <tr key={person.PersonID} className="text-center">
              <td className="py-2">{person.PersonID}</td>
              <td className="py-2">{person.FirstName}</td>
              <td className="py-2">{person.LastName}</td>
              <td className="py-2">{person.DateOfBirth}</td>
              <td className="py-2">{person.Gender}</td>
              <td className="py-2">{person.Address}</td>
              <td className="py-2">{person.ContactInfo}</td>
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

export default PersonList;
