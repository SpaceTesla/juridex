import React, { useEffect, useState } from 'react';
import { fetchRecords, createRecord, updateRecord } from '../../services/api'; // Adjust the path as necessary

const RecordList = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRecordData, setNewRecordData] = useState({
    PersonID: '',
    CrimeID: '',
    DateOfRecord: '',
    RecordStatus: '',
  });
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const recordsData = await fetchRecords();
        setRecords(recordsData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateRecord = async () => {
    setLoading(true);
    try {
      await createRecord(newRecordData);
      const recordsData = await fetchRecords();
      setRecords(recordsData);
      setNewRecordData({
        PersonID: '',
        CrimeID: '',
        DateOfRecord: '',
        RecordStatus: '',
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRecord = async (personId, crimeId) => {
    setLoading(true);
    try {
      await updateRecord(personId, crimeId, selectedRecord);
      const recordsData = await fetchRecords();
      setRecords(recordsData);
      setSelectedRecord(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectedInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedRecord((prevSelectedRecord) => ({
      ...prevSelectedRecord,
      [name]: value,
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading criminal records: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Criminal Record List</h2>
      <div className="mb-4">
        <div className="flex flex-wrap mb-2">
          <input
            type="text"
            name="PersonID"
            placeholder="Person ID"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newRecordData.PersonID}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="CrimeID"
            placeholder="Crime ID"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newRecordData.CrimeID}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="DateOfRecord"
            placeholder="Date of Record"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newRecordData.DateOfRecord}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="RecordStatus"
            placeholder="Record Status"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newRecordData.RecordStatus}
            onChange={handleInputChange}
          />
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={handleCreateRecord}>
            Create
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-2 px-4">Person ID</th>
            <th className="py-2 px-4">Crime ID</th>
            <th className="py-2 px-4">Date of Record</th>
            <th className="py-2 px-4">Record Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {records.map(record => (
            <tr key={`${record.PersonID}-${record.CrimeID}`} className="border-b border-gray-200">
              <td className="py-2 px-4">{record.PersonID}</td>
              <td className="py-2 px-4">{record.CrimeID}</td>
              <td className="py-2 px-4">{record.DateOfRecord}</td>
              <td className="py-2 px-4">{record.RecordStatus}</td>
              <td className="py-2 px-4">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                  onClick={() => setSelectedRecord(record)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRecord && (
        <div className="mt-4 p-4 border border-gray-200 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Edit Record</h3>
          <input
            type="text"
            name="PersonID"
            placeholder="Person ID"
            className="p-2 border border-gray-300 mb-2 rounded"
            value={selectedRecord.PersonID}
            onChange={handleSelectedInputChange}
          />
          <input
            type="text"
            name="CrimeID"
            placeholder="Crime ID"
            className="p-2 border border-gray-300 mb-2 rounded"
            value={selectedRecord.CrimeID}
            onChange={handleSelectedInputChange}
          />
          <input
            type="date"
            name="DateOfRecord"
            placeholder="Date of Record"
            className="p-2 border border-gray-300 mb-2 rounded"
            value={selectedRecord.DateOfRecord}
            onChange={handleSelectedInputChange}
          />
          <input
            type="text"
            name="RecordStatus"
            placeholder="Record Status"
            className="p-2 border border-gray-300 mb-2 rounded"
            value={selectedRecord.RecordStatus}
            onChange={handleSelectedInputChange}
          />
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            onClick={() => handleUpdateRecord(selectedRecord.PersonID, selectedRecord.CrimeID)}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default RecordList;
