import React, { useEffect, useState } from 'react';
import { fetchPoliceOfficers, createPoliceOfficer, updatePoliceOfficer } from '../../services/api'; // Adjust the path as necessary

const OfficerList = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newOfficerData, setNewOfficerData] = useState({
    FirstName: '',
    LastName: '',
    BadgeNumber: '',
    Rank: '',
    Department: '',
  });
  const [selectedOfficer, setSelectedOfficer] = useState(null);

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

  const handleCreate = async () => {
    setLoading(true);
    try {
      await createPoliceOfficer(newOfficerData);
      const officersData = await fetchPoliceOfficers();
      setOfficers(officersData);
      setNewOfficerData({
        FirstName: '',
        LastName: '',
        BadgeNumber: '',
        Rank: '',
        Department: '',
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (officerId) => {
    setLoading(true);
    try {
      await updatePoliceOfficer(officerId, selectedOfficer);
      const officersData = await fetchPoliceOfficers();
      setOfficers(officersData);
      setSelectedOfficer(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewOfficerInputChange = (e) => {
    const { name, value } = e.target;
    setNewOfficerData((prevNewOfficerData) => ({
      ...prevNewOfficerData,
      [name]: value,
    }));
  };

  const handleSelectedOfficerInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedOfficer((prevSelectedOfficer) => ({
      ...prevSelectedOfficer,
      [name]: value,
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading police officers: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Police Officer List</h2>
      <div className="mb-4">
        <div className="flex flex-wrap mb-2">
          <input
            type="text"
            name="FirstName"
            placeholder="First Name"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newOfficerData.FirstName}
            onChange={handleNewOfficerInputChange}
          />
          <input
            type="text"
            name="LastName"
            placeholder="Last Name"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newOfficerData.LastName}
            onChange={handleNewOfficerInputChange}
          />
          <input
            type="text"
            name="BadgeNumber"
            placeholder="Badge Number"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newOfficerData.BadgeNumber}
            onChange={handleNewOfficerInputChange}
          />
          <input
            type="text"
            name="Rank"
            placeholder="Rank"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newOfficerData.Rank}
            onChange={handleNewOfficerInputChange}
          />
          <input
            type="text"
            name="Department"
            placeholder="Department"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newOfficerData.Department}
            onChange={handleNewOfficerInputChange}
          />
          <button className="bg-green-500 text-white px-4 py-2" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
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
                <button className="text-yellow-500 hover:underline" onClick={() => setSelectedOfficer(officer)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedOfficer && (
        <div className="mt-4 p-4 border border-gray-200 bg-gray-50">
          <h3 className="text-xl font-bold mb-2">Edit Officer</h3>
          <input
            type="text"
            name="FirstName"
            placeholder="First Name"
            className="p-2 border border-gray-300 mb-2"
            value={selectedOfficer.FirstName}
            onChange={handleSelectedOfficerInputChange}
          />
          <input
            type="text"
            name="LastName"
            placeholder="Last Name"
            className="p-2 border border-gray-300 mb-2"
            value={selectedOfficer.LastName}
            onChange={handleSelectedOfficerInputChange}
          />
          <input
            type="text"
            name="BadgeNumber"
            placeholder="Badge Number"
            className="p-2 border border-gray-300 mb-2"
            value={selectedOfficer.BadgeNumber}
            onChange={handleSelectedOfficerInputChange}
          />
          <input
            type="text"
            name="Rank"
            placeholder="Rank"
            className="p-2 border border-gray-300 mb-2"
            value={selectedOfficer.Rank}
            onChange={handleSelectedOfficerInputChange}
          />
          <input
            type="text"
            name="Department"
            placeholder="Department"
            className="p-2 border border-gray-300 mb-2"
            value={selectedOfficer.Department}
            onChange={handleSelectedOfficerInputChange}
          />
          <button
            className="bg-yellow-500 text-white px-4 py-2"
            onClick={() => handleUpdate(selectedOfficer.OfficerID)}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default OfficerList;
