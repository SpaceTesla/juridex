import React, { useEffect, useState } from 'react';
import { fetchPersons, createPerson, updatePerson } from '../../services/api'; // Adjust the path as necessary

const PersonList = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPersonData, setNewPersonData] = useState({
    FirstName: '',
    LastName: '',
    DateOfBirth: '',
    Gender: '',
    Address: '',
    ContactInfo: '',
  });
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const personsData = await fetchPersons();
        setPersons(personsData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreatePerson = async () => {
    setLoading(true);
    try {
      await createPerson(newPersonData);
      const personsData = await fetchPersons();
      setPersons(personsData);
      setNewPersonData({
        FirstName: '',
        LastName: '',
        DateOfBirth: '',
        Gender: '',
        Address: '',
        ContactInfo: '',
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePerson = async (personId) => {
    setLoading(true);
    try {
      await updatePerson(personId, selectedPerson);
      const personsData = await fetchPersons();
      setPersons(personsData);
      setSelectedPerson(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPersonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectedInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPerson((prevSelectedPerson) => ({
      ...prevSelectedPerson,
      [name]: value,
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading persons: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Person List</h2>
      <div className="mb-4">
        <div className="flex flex-wrap mb-2">
          <input
            type="text"
            name="FirstName"
            placeholder="First Name"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newPersonData.FirstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="LastName"
            placeholder="Last Name"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newPersonData.LastName}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="DateOfBirth"
            placeholder="Date of Birth"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newPersonData.DateOfBirth}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="Gender"
            placeholder="Gender"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newPersonData.Gender}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="Address"
            placeholder="Address"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newPersonData.Address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="ContactInfo"
            placeholder="Contact Info"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newPersonData.ContactInfo}
            onChange={handleInputChange}
          />
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={handleCreatePerson}>
            Create
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-2 px-4">Person ID</th>
            <th className="py-2 px-4">First Name</th>
            <th className="py-2 px-4">Last Name</th>
            <th className="py-2 px-4">Date of Birth</th>
            <th className="py-2 px-4">Gender</th>
            <th className="py-2 px-4">Address</th>
            <th className="py-2 px-4">Contact Info</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {persons.map(person => (
            <tr key={person.PersonID} className="border-b border-gray-200">
              <td className="py-2 px-4">{person.PersonID}</td>
              <td className="py-2 px-4">{person.FirstName}</td>
              <td className="py-2 px-4">{person.LastName}</td>
              <td className="py-2 px-4">{person.DateOfBirth}</td>
              <td className="py-2 px-4">{person.Gender}</td>
              <td className="py-2 px-4">{person.Address}</td>
              <td className="py-2 px-4">{person.ContactInfo}</td>
              <td className="py-2 px-4">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                  onClick={() => setSelectedPerson(person)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPerson && (
        <div className="mt-4 p-4 border border-gray-200 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Edit Person</h3>
          <input
            type="text"
            name="FirstName"
            placeholder="First Name"
            className="p-2 border border-gray-300 mb-2 rounded"
            value={selectedPerson.FirstName}
            onChange={handleSelectedInputChange}
          />
          <input
            type="text"
            name="LastName"
            placeholder="Last Name"
            className="p-2 border border-gray-300 mb-2 rounded"
            value={selectedPerson.LastName}
            onChange={handleSelectedInputChange}
          />
          <input
            type="date"
            name="DateOfBirth"
            placeholder="Date of Birth"
            className="p-2 border border-gray-300 mb-2 rounded"
            value={selectedPerson.DateOfBirth}
            onChange={handleSelectedInputChange}
          />
          <input
            type="text"
            name="Gender"
            placeholder="Gender"
            className="p-2 border border-gray-300 mb-2 rounded"
            value={selectedPerson.Gender}
            onChange={handleSelectedInputChange}
          />
          <input
            type="text"
            name="Address"
            placeholder="Address"
            className="p-2 border border-gray-300 mb-2 rounded"
            value={selectedPerson.Address}
            onChange={handleSelectedInputChange}
          />
          <input
            type="text"
            name="ContactInfo"
            placeholder="Contact Info"
            className="p-2 border border-gray-300 mb-2 rounded"
            value={selectedPerson.ContactInfo}
            onChange={handleSelectedInputChange}
          />
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            onClick={() => handleUpdatePerson(selectedPerson.PersonID)}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonList;
