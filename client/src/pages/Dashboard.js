import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { 
  fetchCrimes, 
  fetchPoliceOfficers, 
  fetchPersons, 
  fetchWitnesses,
  fetchCases,
  fetchRecords
} from '../services/api';
import CrimeList from '../components/crime/CrimeList';
import PoliceOfficerList from '../components/officer/OfficerList';
import PersonList from '../components/person/PersonList';
import WitnessList from '../components/Witness/WitnessList';
import CaseList from '../components/case/CaseList';
import RecordList from '../components/record/RecordList';

const Dashboard = () => {
  const { authData, logoutHandler } = useAuth();
  const [crimes, setCrimes] = useState([]);
  const [policeOfficers, setPoliceOfficers] = useState([]);
  const [persons, setPersons] = useState([]);
  const [witnesses, setWitnesses] = useState([]);
  const [cases, setCases] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const crimeData = await fetchCrimes();
        setCrimes(crimeData);

        const officerData = await fetchPoliceOfficers();
        setPoliceOfficers(officerData);

        const personData = await fetchPersons();
        setPersons(personData);

        const witnessData = await fetchWitnesses();
        setWitnesses(witnessData);

        const caseData = await fetchCases();
        setCases(caseData);

        const recordData = await fetchRecords();
        setRecords(recordData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    getData();
  }, []);

  if (!authData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <button 
        onClick={logoutHandler}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Logout
      </button>
      <h2 className="text-2xl font-bold mb-4">Crimes</h2>
      <CrimeList crimes={crimes} />
      <h2 className="text-2xl font-bold mb-4">Police Officers</h2>
      <PoliceOfficerList policeOfficers={policeOfficers} />
      <h2 className="text-2xl font-bold mb-4">Persons</h2>
      <PersonList persons={persons} />
      <h2 className="text-2xl font-bold mb-4">Witnesses</h2>
      <WitnessList witnesses={witnesses} />
      <h2 className="text-2xl font-bold mb-4">Cases</h2>
      <CaseList cases={cases} />
      <h2 className="text-2xl font-bold mb-4">Criminal Records</h2>
      <RecordList records={records} />
    </div>
  );
};

export default Dashboard;
