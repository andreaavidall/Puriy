"use client";

import React from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DestinationCard from "../../components/DestinationCard";
import { useFavorites } from "../../hooks/useFavorites";
import destinosData from "../../data/destinos.json";

interface Destino {
  id: string;
  nombre: string;
  descripcion: string;
  departamento: string;
  presupuesto: string;
  dias_minimos: number;
  intereses: string[];
  acompanantes: string[];
  imagen: string;
}

const DESTINOS = destinosData as Destino[];

export default function FavoritosPage() {
  const { favorites, clearFavorites, loaded } = useFavorites();

  const favoriteDestinations = DESTINOS.filter((d) => favorites.includes(d.id));

  const getPresupuestoText = (cat: string) => {
    const norm = cat.toLowerCase();
    if (norm === "bajo") return "Desde S/150 por persona";
    if (norm === "medio") return "Desde S/400 por persona";
    return "Desde S/1000 por persona";
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F3EC] text-[#26241F]">
      <Navbar />
      <main className="flex-1 py-16 px-6 max-w-7xl mx-auto w-full">
        {/* Header and Action button to clear favorites */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C96438] block mb-2">
              MIS VIAJES GUARDADOS
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#26241F]">
              Mis Destinos Favoritos
            </h1>
            <p className="mt-3 text-sm md:text-base text-[#26241F]/60 max-w-xl">
              Aquí tienes guardados los rincones del Perú que más te inspiran para tu próxima escapada.
            </p>
          </div>

          {loaded && favoriteDestinations.length > 0 && (
            <button
              onClick={clearFavorites}
              className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-red-200 hover:bg-red-50 text-red-600 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
              type="button"
            >
              🗑️ Vaciar favoritos
            </button>
          )}
        </div>

        {/* Dynamic Display */}
        {!loaded ? (
          <div className="text-center py-20">
            <span className="text-sm font-semibold text-[#26241F]/60">Cargando favoritos...</span>
          </div>
        ) : favoriteDestinations.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {favoriteDestinations.map((destino) => (
              <DestinationCard
                key={destino.id}
                nombre={destino.nombre}
                tagline={destino.intereses.slice(0, 2).join(" / ")}
                duracion={`${destino.dias_minimos} días`}
                presupuesto={getPresupuestoText(destino.presupuesto)}
                imagen={destino.imagen}
              />
            ))}
          </div>
        ) : (
          /* Premium styled Empty State */
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E8E2D8] shadow-sm max-w-xl mx-auto px-6">
            <div className="w-20 h-20 bg-[#F7F3EC] rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              ❤️
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#26241F] tracking-tight">
              Aún no tienes favoritos guardados
            </h3>
            <p className="mt-3 text-sm text-[#26241F]/60 max-w-xs mx-auto mb-8 leading-relaxed">
              Explora los destinos recomendados o navega por el mapa del Perú, y haz clic en el corazón de cualquier tarjeta para guardarlo aquí.
            </p>
            <Link
              href="/explorar"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#193D32] hover:bg-[#31594A] text-white text-sm font-bold shadow-md shadow-emerald-950/10 transition-all cursor-pointer"
            >
              Explorar destinos
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
