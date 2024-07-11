import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CrimeMap = ({ crimes }) => {
  useEffect(() => {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    crimes.forEach(crime => {
      const { Latitude, Longitude } = crime;
      L.marker([Latitude, Longitude])
        .addTo(map)
        .bindPopup('Crime location')
        .openPopup();
    });

    return () => {
      map.remove(); // Clean up Leaflet reference when component unmounts
    };
  }, [crimes]);

  return <div id="map" style={{ height: '500px', width: '100%' }} />;
};

export default CrimeMap;
