import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import pinIconUrl from '../../assets/images/Pin.png'; // Adjust the path as necessary

const MapModal = ({ isOpen, onClose, latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (isOpen && mapRef.current) {
      const map = L.map(mapRef.current).setView([latitude, longitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      const pinIcon = L.icon({
        iconUrl: pinIconUrl,
        iconSize: [20, 31], // Reduced size of the icon
        iconAnchor: [8, 27], // Adjusted anchor point for the reduced size
        popupAnchor: [1, -18] // point from which the popup should open relative to the iconAnchor
      });

      L.marker([latitude, longitude], { icon: pinIcon })
        .addTo(map)
        .bindPopup('Crime location')
        .openPopup();
    }
  }, [isOpen, latitude, longitude]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-3/4 h-3/4 relative">
        <button 
          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-700" 
          onClick={onClose}
        >
          &times;
        </button>
        <div ref={mapRef} id="map" className="w-full h-full rounded"></div>
      </div>
    </div>
  );
};

export default MapModal;
