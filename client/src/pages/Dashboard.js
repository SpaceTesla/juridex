import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CrimeList from '../components/crime/CrimeList';
import PersonList from '../components/person/PersonList';
import RecordList from '../components/record/RecordList';
import OfficerList from '../components/officer/OfficerList';
import CaseList from '../components/case/CaseList';
import WitnessList from '../components/Witness/WitnessList';

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="mb-4">
      <div
        className="flex justify-between items-center cursor-pointer bg-gray-200 p-2 rounded"
        onClick={toggleSection}
      >
        <h3 className="text-xl font-bold">{title}</h3>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div className="mt-2">{children}</div>}
    </section>
  );
};

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [page] = useState({
    crimes: 1,
    persons: 1,
    records: 1,
    officers: 1,
    cases: 1,
    witnesses: 1,
  });
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState({
    crimes: 0,
    persons: 0,
    records: 0,
    officers: 0,
    cases: 0,
    witnesses: 0,
  });

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

  const updateTotalItems = (section, count) => {
    setTotalItems((prevState) => ({
      ...prevState,
      [section]: count,
    }));
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
        <CollapsibleSection title="Crimes">
          <CrimeList
            page={page.crimes}
            itemsPerPage={itemsPerPage}
            updateTotalItems={(count) => updateTotalItems('crimes', count)}
          />
        </CollapsibleSection>
        <CollapsibleSection title="Person">
          <PersonList
            page={page.persons}
            itemsPerPage={itemsPerPage}
            updateTotalItems={(count) => updateTotalItems('persons', count)}
          />
        </CollapsibleSection>
        <CollapsibleSection title="Records">
          <RecordList
            page={page.records}
            itemsPerPage={itemsPerPage}
            updateTotalItems={(count) => updateTotalItems('records', count)}
          />
        </CollapsibleSection>
        <CollapsibleSection title="Officers">
          <OfficerList
            page={page.officers}
            itemsPerPage={itemsPerPage}
            updateTotalItems={(count) => updateTotalItems('officers', count)}
          />
        </CollapsibleSection>
        <CollapsibleSection title="Cases">
          <CaseList
            page={page.cases}
            itemsPerPage={itemsPerPage}
            updateTotalItems={(count) => updateTotalItems('cases', count)}
          />
        </CollapsibleSection>
        <CollapsibleSection title="Witnesses">
          <WitnessList
            page={page.witnesses}
            itemsPerPage={itemsPerPage}
            updateTotalItems={(count) => updateTotalItems('witnesses', count)}
          />
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default Dashboard;
