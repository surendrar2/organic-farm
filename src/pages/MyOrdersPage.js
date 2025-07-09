import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MyOrdersPage() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [status, setStatus] = useState('Preparing');

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    if (savedOrders.length === 0) {
      alert('No orders found!');
      return;
    }

    const timer = setTimeout(() => setStatus('Out for Delivery'), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status !== 'Out for Delivery') return;

    mapRef.current = L.map('map').setView([12.9716, 77.5946], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapRef.current);

    // ✅ Correct delivery boy icon
    const deliveryBoyIcon = L.icon({
      iconUrl: '/images/delivery-boy.png',
      iconSize: [50, 50],
      iconAnchor: [25, 25],
      popupAnchor: [0, -25],
    });

    const marker = L.marker([12.9716, 77.5946], { icon: deliveryBoyIcon }).addTo(mapRef.current);
    marker.bindPopup('Your Delivery Boy 🚴').openPopup();
    markerRef.current = marker;

    let lat = 12.9716;
    let lng = 77.5946;

    const interval = setInterval(() => {
      lat += 0.0005;
      lng += 0.0005;
      marker.setLatLng([lat, lng]);
      mapRef.current.setView([lat, lng]);
    }, 2000);

    return () => clearInterval(interval);
  }, [status]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>My Orders</h2>
      <p>Status: {status}</p>

      {status === 'Out for Delivery' && (
        <>
          <h3>Track your delivery:</h3>
          <div id="map" style={{ height: '400px', width: '100%', marginTop: '20px' }}></div>
        </>
      )}
    </div>
  );
}

