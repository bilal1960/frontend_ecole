import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapComponent() {
  const position = [50.866572, 4.377395];
  
  const schoolInfo = {
    name: "Saint peter",
    adresse: "Rue Ernest Laude 29 1030 Schaerbeek",
    phoneNumber: "+32 123 456 789",
    email: "ecolea@example.com",
    type: "secondaire"
  };

  const tramStops = [
    { position: [50.966292, 4.394938], name: "tram - 92" },
    { position: [50.8693488, 4.3727925], name: "tram - 92" },
  ];

  const busStops = [
    { position: [50.86678, 4.378813], name: "BUS - 59" },
    { position: [50.8681912, 4.3770505], name: "BUS - 59" },
    { position: [50.8680575, 4.3792105], name: "BUS  - 56" },


  ];

 

  return (
    <MapContainer center={position} zoom={13} style={{ width: '100%', height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <TileLayer url="https://www.openrailwaymap.org/overlay/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors, &copy; OpenRailwayMap contributors" />
      
      {tramStops.map((stop, index) => (
        <Marker key={`tram-${index}`} position={stop.position}>
          <Popup>{stop.name}</Popup>
        </Marker>
      ))}

      {busStops.map((stop, index) => (
        <Marker key={`bus-${index}`} position={stop.position}>
          <Popup>{stop.name}</Popup>
        </Marker>
      ))}

     

      <Marker position={position}>
        <Popup>
          <div>
            <strong>{schoolInfo.name}</strong><br />
            adresse: {schoolInfo.adresse}<br />
            Téléphone: {schoolInfo.phoneNumber}<br />
            type: {schoolInfo.type} <br/>
            Email: <a href={`mailto:${schoolInfo.email}`}>{schoolInfo.email}</a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;
