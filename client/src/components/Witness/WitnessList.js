import React, { useEffect, useState } from 'react';
import { fetchWitnesses, createWitness, updateWitness } from '../../services/api'; // Adjust the path as necessary

const WitnessList = () => {
  const [witnesses, setWitnesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newWitnessData, setNewWitnessData] = useState({
    CaseID: '',
    CrimeID: '',
    FirstName: '',
    LastName: '',
    Statement: '',
  });
  const [selectedWitness, setSelectedWitness] = useState(null);

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

  const handleCreate = async () => {
    setLoading(true);
    try {
      console.log('Creating new witness with data:', newWitnessData);
      await createWitness(newWitnessData);
      const witnessesData = await fetchWitnesses();
      console.log('Fetched witnesses after creation:', witnessesData);
      setWitnesses(witnessesData);
      setNewWitnessData({
        CaseID: '',
        CrimeID: '',
        FirstName: '',
        LastName: '',
        Statement: '',
      });
    } catch (error) {
      setError(error);
      console.error('Error creating new witness:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateWitness(selectedWitness.WitnessID, selectedWitness);
      const witnessesData = await fetchWitnesses();
      setWitnesses(witnessesData);
      setSelectedWitness(null);
    } catch (error) {
      setError(error);
      console.error('Error updating witness:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewWitnessInputChange = (e) => {
    const { name, value } = e.target;
    setNewWitnessData((prevNewWitnessData) => ({
      ...prevNewWitnessData,
      [name]: value,
    }));
  };

  const handleSelectedWitnessInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedWitness((prevSelectedWitness) => ({
      ...prevSelectedWitness,
      [name]: value,
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading witnesses: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Witness List</h2>
      <div className="mb-4">
        <div className="flex flex-wrap mb-2">
          <input
            type="text"
            name="CaseID"
            placeholder="Case ID"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newWitnessData.CaseID}
            onChange={handleNewWitnessInputChange}
          />
          <input
            type="text"
            name="CrimeID"
            placeholder="Crime ID"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newWitnessData.CrimeID}
            onChange={handleNewWitnessInputChange}
          />
          <input
            type="text"
            name="FirstName"
            placeholder="First Name"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newWitnessData.FirstName}
            onChange={handleNewWitnessInputChange}
          />
          <input
            type="text"
            name="LastName"
            placeholder="Last Name"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newWitnessData.LastName}
            onChange={handleNewWitnessInputChange}
          />
          <input
            type="text"
            name="Statement"
            placeholder="Statement"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newWitnessData.Statement}
            onChange={handleNewWitnessInputChange}
          />
          <button className="bg-green-500 text-white px-4 py-2" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
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
          {witnesses.map((witness) => (
            <tr key={witness.WitnessID} className="text-center">
              <td className="py-2">{witness.WitnessID}</td>
              <td className="py-2">{witness.CaseID}</td>
              <td className="py-2">{witness.CrimeID}</td>
              <td className="py-2">{witness.FirstName}</td>
              <td className="py-2">{witness.LastName}</td>
              <td className="py-2">{witness.Statement}</td>
              <td className="py-2">
                <button
                  className="text-yellow-500 hover:underline"
                  onClick={() => setSelectedWitness(witness)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedWitness && (
        <div className="mt-4 p-4 border border-gray-200 bg-gray-50">
          <h3 className="text-xl font-bold mb-2">Edit Witness</h3>
          <input
            type="text"
            name="CaseID"
            placeholder="Case ID"
            className="p-2 border border-gray-300 mb-2"
            value={selectedWitness.CaseID}
            onChange={handleSelectedWitnessInputChange}
          />
          <input
            type="text"
            name="CrimeID"
            placeholder="Crime ID"
            className="p-2 border border-gray-300 mb-2"
            value={selectedWitness.CrimeID}
            onChange={handleSelectedWitnessInputChange}
          />
          <input
            type="text"
            name="FirstName"
            placeholder="First Name"
            className="p-2 border border-gray-300 mb-2"
            value={selectedWitness.FirstName}
            onChange={handleSelectedWitnessInputChange}
          />
          <input
            type="text"
            name="LastName"
            placeholder="Last Name"
            className="p-2 border border-gray-300 mb-2"
            value={selectedWitness.LastName}
            onChange={handleSelectedWitnessInputChange}
          />
          <input
            type="text"
            name="Statement"
            placeholder="Statement"
            className="p-2 border border-gray-300 mb-2"
            value={selectedWitness.Statement}
            onChange={handleSelectedWitnessInputChange}
          />
          <button
            className="bg-yellow-500 text-white px-4 py-2"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default WitnessList;
