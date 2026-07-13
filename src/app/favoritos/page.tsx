"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DestinationCard from "../../components/DestinationCard";

// Mock list of all potential destinations matching both destinos.json and landing page mock list
const ALL_DESTINATIONS = [
  { id: "oxapampa", nombre: "Oxapampa", tagline: "Ideal para desconectar", duracion: "3 días / 2 noches", presupuesto: "Desde S/540 por persona", imagen: "/destinos/colca.png" },
  { id: "paracas", nombre: "Paracas", tagline: "Playa y naturaleza", duracion: "3 días / 2 noches", presupuesto: "Desde S/580 por persona", imagen: "/destinos/paracas.png" },
  { id: "lunahuana", nombre: "Lunahuaná", tagline: "Aventura y gastronomía", duracion: "2 días / 1 noche", presupuesto: "Desde S/350 por persona", imagen: "/destinos/huacachina.png" },
  { id: "machu-picchu", nombre: "Machu Picchu", tagline: "Arqueología y aventura", duracion: "3 días / 2 noches", presupuesto: "Desde S/1200 por persona", imagen: "/destinos/machu-picchu.png" },
  { id: "huacachina-oasis", nombre: "Huacachina", tagline: "Aventura y relajación", duracion: "1 día", presupuesto: "Desde S/150 por persona", imagen: "/destinos/huacachina.png" },
  { id: "canon-del-colca", nombre: "Cañón del Colca", tagline: "Aventura y naturaleza", duracion: "2 días / 1 noche", presupuesto: "Desde S/400 por persona", imagen: "/destinos/colca.png" },
];

export default function FavoritosPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("puriy-favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error loading favorites from localStorage", e);
    }
    setLoaded(true);
  }, []);

  const favoriteDestinations = ALL_DESTINATIONS.filter((d) => favorites.includes(d.id));

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F3EC] text-[#26241F]">
      <Navbar />
      <main className="flex-1 py-16 px-6 max-w-7xl mx-auto w-full">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C96438] block mb-2">
          MIS VIAJES
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#26241F] mb-6">
          Mis Favoritos
        </h1>
        <p className="text-base md:text-lg text-[#26241F]/70 max-w-2xl mb-12">
          Guarda los destinos que más te interesen para planificar tu próxima escapada.
        </p>

        {!loaded ? (
          <div className="text-center py-16">
            <span className="text-sm font-semibold text-[#26241F]/60">Cargando tus favoritos...</span>
          </div>
        ) : favoriteDestinations.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {favoriteDestinations.map((destino) => (
              <DestinationCard
                key={destino.id}
                nombre={destino.nombre}
                tagline={destino.tagline}
                duracion={destino.duracion}
                presupuesto={destino.presupuesto}
                imagen={destino.imagen}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E8E2D8] shadow-sm max-w-xl mx-auto">
            <span className="text-5xl block mb-6">❤️</span>
            <h3 className="font-serif text-2xl font-bold text-[#26241F] tracking-tight">
              Aún no tienes favoritos
            </h3>
            <p className="mt-2 text-sm text-[#26241F]/60 max-w-xs mx-auto">
              Haz clic en el icono de corazón de cualquier tarjeta de destino para guardarlo aquí.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
