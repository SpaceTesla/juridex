import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CrimeList from '../components/crime/CrimeList';
import PersonList from '../components/person/PersonList';
import RecordList from '../components/record/RecordList';
import OfficerList from '../components/Officer/OfficerList';
import CaseList from '../components/case/CaseList';
import WitnessList from '../components/Witness/WitnessList'; // Ensure this path is correct

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <section>
          <h3 className="text-xl font-bold mb-4">Crimes</h3>
          <CrimeList />
        </section>
        <section>
          <h3 className="text-xl font-bold mb-4">Persons</h3>
          <PersonList />
        </section>
        <section>
          <h3 className="text-xl font-bold mb-4">Records</h3>
          <RecordList />
        </section>
        <section>
          <h3 className="text-xl font-bold mb-4">Officers</h3>
          <OfficerList />
        </section>
        <section>
          <h3 className="text-xl font-bold mb-4">Cases</h3>
          <CaseList />
        </section>
        <section>
          <h3 className="text-xl font-bold mb-4">Witnesses</h3>
          <WitnessList />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
