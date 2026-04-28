"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { Property } from "@/lib/types";
import styles from "./MapView.module.css";

// Fix default icon path for Leaflet in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const categoryColors: Record<string, string> = {
  luxury: "#e8c97a",
  residential: "#60a5fa",
  commercial: "#34d399",
  land: "#f87171",
};

function createCustomIcon(category: string, isSelected: boolean) {
  const color = categoryColors[category] || "#c9a84c";
  const size = isSelected ? 44 : 36;
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="${isSelected ? 20 : 16}" fill="${color}" opacity="${isSelected ? 1 : 0.9}" stroke="white" stroke-width="3"/>
      <circle cx="22" cy="22" r="6" fill="white"/>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 4],
  });
}

function FlyToSelected({ properties, selectedId }: { properties: Property[]; selectedId: string | null }) {
  const map = useMap();
  useEffect(() => {
    if (!selectedId) return;
    const p = properties.find((x) => x.id === selectedId);
    if (p) map.flyTo([p.lat, p.lng], 14, { duration: 1.2 });
  }, [selectedId, map, properties]);
  return null;
}

interface MapViewProps {
  properties: Property[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  categories: { value: string; label: string; color: string }[];
}

export default function MapView({ properties, selectedId, onSelect }: MapViewProps) {
  return (
    <MapContainer center={[25.7617, -80.1918]} zoom={11} className={styles.map} zoomControl={false}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        maxZoom={20}
      />
      <FlyToSelected properties={properties} selectedId={selectedId} />
      {properties.map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={createCustomIcon(p.category, selectedId === p.id)}
          eventHandlers={{ click: () => onSelect(p.id) }}
        >
          <Popup className={styles.popup}>
            <div className={styles.popupCard}>
              <p className={styles.popupTitle}>{p.title}</p>
              <p className={styles.popupAddr}>
                {p.address}, {p.city}
              </p>
              <p className={styles.popupPrice}>
                {p.status === "for-rent" || p.category === "commercial"
                  ? `$${p.price.toLocaleString()}/mo`
                  : `$${(p.price / 1000000).toFixed(1)}M`}
              </p>
              <Link href={`/properties/${p.id}`} className={styles.popupLink}>
                View Details →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
