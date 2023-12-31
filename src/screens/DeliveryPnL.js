import React from 'react';
// import { Icon } from "leaflet";
import { MapContainer,
   TileLayer,
    // useMap,
  Popup,
Marker } from 'react-leaflet'

export function DeliveryPnL () {
  const position = [51.505, -0.09]

  return (
    <MapContainer className="map" sx={{height:100}}center={position} zoom={13} scrollWheelZoom={false}>
      
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
  );
}