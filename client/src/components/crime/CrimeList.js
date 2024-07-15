import React, { useEffect, useState } from 'react';
import {
  fetchCrimes,
  createCrime,
  updateCrime,
} from '../../services/api'; // Adjust the path as necessary
import MapModal from './MapModal';

const CrimeList = () => {
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [newCrimeData, setNewCrimeData] = useState({
    CrimeType: '',
    Description: '',
    DateOfCrime: '',
    Location: '',
    Latitude: '',
    Longitude: '',
  });
  const [selectedCrime, setSelectedCrime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const crimesData = await fetchCrimes();
        setCrimes(crimesData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewMap = (latitude, longitude) => {
    setSelectedCoordinates({ latitude, longitude });
    setIsMapOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapOpen(false);
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      await createCrime(newCrimeData);
      const crimesData = await fetchCrimes();
      setCrimes(crimesData);
      setNewCrimeData({
        CrimeType: '',
        Description: '',
        DateOfCrime: '',
        Location: '',
        Latitude: '',
        Longitude: '',
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (crimeId) => {
    setLoading(true);
    try {
      await updateCrime(crimeId, selectedCrime);
      const crimesData = await fetchCrimes();
      setCrimes(crimesData);
      setSelectedCrime(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewCrimeInputChange = (e) => {
    const { name, value } = e.target;
    setNewCrimeData((prevNewCrimeData) => ({
      ...prevNewCrimeData,
      [name]: value,
    }));
  };

  const handleSelectedCrimeInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCrime((prevSelectedCrime) => ({
      ...prevSelectedCrime,
      [name]: value,
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading crimes: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Crime List</h2>
      <div className="mb-4">
        <div className="flex flex-wrap mb-2">
          <input
            type="text"
            name="CrimeType"
            placeholder="Crime Type"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newCrimeData.CrimeType}
            onChange={handleNewCrimeInputChange}
          />
          <input
            type="text"
            name="Description"
            placeholder="Description"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newCrimeData.Description}
            onChange={handleNewCrimeInputChange}
          />
          <input
            type="date"
            name="DateOfCrime"
            placeholder="Date Of Crime"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newCrimeData.DateOfCrime}
            onChange={handleNewCrimeInputChange}
          />
          <input
            type="text"
            name="Location"
            placeholder="Location"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newCrimeData.Location}
            onChange={handleNewCrimeInputChange}
          />
          <input
            type="text"
            name="Latitude"
            placeholder="Latitude"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newCrimeData.Latitude}
            onChange={handleNewCrimeInputChange}
          />
          <input
            type="text"
            name="Longitude"
            placeholder="Longitude"
            className="p-2 border border-gray-300 mr-2 mb-2"
            value={newCrimeData.Longitude}
            onChange={handleNewCrimeInputChange}
          />
          <button className="bg-green-500 text-white px-4 py-2" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
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
                <button
                  className="text-blue-500 hover:underline mr-2"
                  onClick={() => handleViewMap(crime.Latitude, crime.Longitude)}
                >
                  View
                </button>
                <button
                  className="text-yellow-500 hover:underline"
                  onClick={() => setSelectedCrime(crime)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCrime && (
        <div className="mt-4 p-4 border border-gray-200 bg-gray-50">
          <h3 className="text-xl font-bold mb-2">Edit Crime</h3>
          <input
            type="text"
            name="CrimeType"
            placeholder="Crime Type"
            className="p-2 border border-gray-300 mb-2"
            value={selectedCrime.CrimeType}
            onChange={handleSelectedCrimeInputChange}
          />
          <input
            type="text"
            name="Description"
            placeholder="Description"
            className="p-2 border border-gray-300 mb-2"
            value={selectedCrime.Description}
            onChange={handleSelectedCrimeInputChange}
          />
          <input
            type="date"
            name="DateOfCrime"
            placeholder="Date Of Crime"
            className="p-2 border border-gray-300 mb-2"
            value={selectedCrime.DateOfCrime}
            onChange={handleSelectedCrimeInputChange}
          />
          <input
            type="text"
            name="Location"
            placeholder="Location"
            className="p-2 border border-gray-300 mb-2"
            value={selectedCrime.Location}
            onChange={handleSelectedCrimeInputChange}
          />
          <input
            type="text"
            name="Latitude"
            placeholder="Latitude"
            className="p-2 border border-gray-300 mb-2"
            value={selectedCrime.Latitude}
            onChange={handleSelectedCrimeInputChange}
          />
          <input
            type="text"
            name="Longitude"
            placeholder="Longitude"
            className="p-2 border border-gray-300 mb-2"
            value={selectedCrime.Longitude}
            onChange={handleSelectedCrimeInputChange}
          />
          <button
            className="bg-yellow-500 text-white px-4 py-2"
            onClick={() => handleUpdate(selectedCrime.CrimeID)}
          >
            Update
          </button>
        </div>
      )}
      <MapModal
        isOpen={isMapOpen}
        onClose={handleCloseMap}
        latitude={selectedCoordinates.latitude}
        longitude={selectedCoordinates.longitude}
      />
    </div>
  );
};

export default CrimeList;
