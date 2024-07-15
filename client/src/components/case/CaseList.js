import React, { useEffect, useState } from 'react';
import { fetchCases, createCase, updateCase } from '../../services/api'; // Adjust the path as necessary

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCaseData, setNewCaseData] = useState({
    CrimeID: '',
    CourtDate: '',
    JudgeName: '',
    Verdict: '',
    Sentence: '',
    OfficerID: '',
  });
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const casesData = await fetchCases(); // Fetch all cases using the API function
        setCases(casesData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreate = async () => {
    setLoading(true);
    try {
      console.log('Creating new case with data:', newCaseData);
      await createCase(newCaseData);
      const casesData = await fetchCases();
      console.log('Fetched cases after creation:', casesData);
      setCases(casesData);
      setNewCaseData({
        CrimeID: '',
        CourtDate: '',
        JudgeName: '',
        Verdict: '',
        Sentence: '',
        OfficerID: '',
      });
    } catch (error) {
      setError(error);
      console.error('Error creating new case:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateCase(selectedCase.CaseID, selectedCase);
      const casesData = await fetchCases();
      setCases(casesData);
      setSelectedCase(null);
    } catch (error) {
      setError(error);
      console.error('Error updating case:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewCaseInputChange = (e) => {
    const { name, value } = e.target;
    setNewCaseData((prevNewCaseData) => ({
      ...prevNewCaseData,
      [name]: value,
    }));
  };

  const handleSelectedCaseInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCase((prevSelectedCase) => ({
      ...prevSelectedCase,
      [name]: value,
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading court cases: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Court Case List</h2>
      <div className="mb-4">
        <div className="flex flex-wrap mb-2">
          <input
            type="text"
            name="CrimeID"
            placeholder="Crime ID"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newCaseData.CrimeID}
            onChange={handleNewCaseInputChange}
          />
          <input
            type="text"
            name="CourtDate"
            placeholder="Court Date"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newCaseData.CourtDate}
            onChange={handleNewCaseInputChange}
          />
          <input
            type="text"
            name="JudgeName"
            placeholder="Judge Name"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newCaseData.JudgeName}
            onChange={handleNewCaseInputChange}
          />
          <input
            type="text"
            name="Verdict"
            placeholder="Verdict"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newCaseData.Verdict}
            onChange={handleNewCaseInputChange}
          />
          <input
            type="text"
            name="Sentence"
            placeholder="Sentence"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newCaseData.Sentence}
            onChange={handleNewCaseInputChange}
          />
          <input
            type="text"
            name="OfficerID"
            placeholder="Officer ID"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newCaseData.OfficerID}
            onChange={handleNewCaseInputChange}
          />
          <button className="bg-green-500 text-white px-4 py-2" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
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
          {cases.map((courtCase) => (
            <tr key={courtCase.CaseID} className="text-center">
              <td className="py-2">{courtCase.CaseID}</td>
              <td className="py-2">{courtCase.CrimeID}</td>
              <td className="py-2">{courtCase.CourtDate}</td>
              <td className="py-2">{courtCase.JudgeName}</td>
              <td className="py-2">{courtCase.Verdict}</td>
              <td className="py-2">{courtCase.Sentence}</td>
              <td className="py-2">{courtCase.OfficerID}</td>
              <td className="py-2">
                <button
                  className="text-yellow-500 hover:underline"
                  onClick={() => setSelectedCase(courtCase)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCase && (
        <div className="mt-4 p-4 border border-gray-200 bg-gray-50">
          <h3 className="text-xl font-bold mb-2">Edit Case</h3>
          <input
            type="text"
            name="CrimeID"
            placeholder="Crime ID"
            className="p-2 border border-gray-300 mb-2"
            value={selectedCase.CrimeID}
            onChange={handleSelectedCaseInputChange}
          />
          <input
            type="text"
            name="CourtDate"
            placeholder="Court Date"
            className="p-2 border border-gray-300 mb-2"
            value={selectedCase.CourtDate}
            onChange={handleSelectedCaseInputChange}
          />
          <input
            type="text"
            name="JudgeName"
            placeholder="Judge Name"
            className="p-2 border border-gray-300 mb-2"
            value={selectedCase.JudgeName}
            onChange={handleSelectedCaseInputChange}
          />
          <input
            type="text"
            name="Verdict"
            placeholder="Verdict"
            className="p-2 border border-gray-300 mb-2"
            value={selectedCase.Verdict}
            onChange={handleSelectedCaseInputChange}
          />
          <input
            type="text"
            name="Sentence"
            placeholder="Sentence"
            className="p-2 border border-gray-300 mb-2"
            value={selectedCase.Sentence}
            onChange={handleSelectedCaseInputChange}
          />
          <input
            type="text"
            name="OfficerID"
            placeholder="Officer ID"
            className="p-2 border border-gray-300 mb-2"
            value={selectedCase.OfficerID}
            onChange={handleSelectedCaseInputChange}
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

export default CaseList;
