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
    { position: [50.8672, 4.3759], name: "STIB/MIVB - 92" },
    { position: [50.8659, 4.3786], name: "STIB/MIVB - 55" }
  ];

  const busStops = [
    { position: [50.8670, 4.3765], name: "STIB/MIVB - 66" },
    { position: [50.8660, 4.3790], name: "STIB/MIVB - 59" }
  ];

  const metroStops = [
    { position: [50.8645, 4.3770], name: "STIB/MIVB - 6" },
    { position: [50.8680, 4.3760], name: "STIB/MIVB - 2" }
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

      {metroStops.map((stop, index) => (
        <Marker key={`metro-${index}`} position={stop.position}>
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
