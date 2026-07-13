"use client";

import React, { useEffect, useState } from "react";
import { useFavorites } from "../../hooks/useFavorites";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getPreferences } from "../../lib/storage";
import { calculateRecommendation } from "../../lib/recommendations";
import { Preferences } from "../../types/preferences";
import { RecommendationResult, Destination } from "../../types/destination";
import destinosData from "../../data/destinos.json";

// Cast JSON data to Destination array
const DESTINOS = destinosData as Destination[];

export default function ResultadosPage() {
  const router = useRouter();
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [loaded, setLoaded] = useState(false);

  const { addFavorite, removeFavorite, isFavorite, loaded: favsLoaded } = useFavorites();

  useEffect(() => {
    // 1. Read preferences from sessionStorage
    const pref = getPreferences();
    if (!pref) {
      // If none exist, redirect to /recomendador
      router.push("/recomendador");
      return;
    }
    setPreferences(pref);

    // 3. Run Recommendation Engine
    const results = DESTINOS.map((d) => calculateRecommendation(d, pref));

    // Sort by compatibilityScore descending
    results.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    // Take max 6 items
    setRecommendations(results.slice(0, 6));
    setLoaded(true);
  }, [router]);

  // Handle Favorites toggle
  const toggleFavorite = (slug: string) => {
    if (isFavorite(slug)) {
      removeFavorite(slug);
    } else {
      addFavorite(slug);
    }
  };

  const getPresupuestoReferencial = (cat: string) => {
    const norm = cat.toLowerCase();
    if (norm === "bajo") return "S/150 - S/300";
    if (norm === "medio") return "S/400 - S/600";
    return "S/1000 - S/1500+";
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F3EC] text-[#26241F]">
      <Navbar />

      <main className="flex-1 py-16 px-6 max-w-7xl mx-auto w-full">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C96438] block mb-2">
              TUS RESULTADOS
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#26241F]">
              Tus Destinos Recomendados
            </h1>
            <p className="mt-3 text-sm md:text-base text-[#26241F]/60 max-w-xl">
              Hemos procesado tu perfil de viaje en base al presupuesto, duración e intereses.
            </p>
          </div>
          <Link
            href="/recomendador"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border-2 border-[#193D32] hover:bg-[#193D32]/5 text-[#193D32] text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#C96438] cursor-pointer"
          >
            Modificar búsqueda
          </Link>
        </div>

        {/* Selected Criteria Quick Summary */}
        {preferences && (
          <div className="bg-[#E8E2D8]/30 rounded-3xl border border-[#E8E2D8]/60 p-5 mb-10 text-left flex flex-wrap items-center gap-x-8 gap-y-2 text-xs font-semibold text-[#26241F]/70">
            <span>📍 Salida: <strong className="text-[#26241F]">{preferences.origen}</strong></span>
            <span>💰 Presupuesto: <strong className="text-[#193D32]">S/{preferences.presupuesto}</strong></span>
            <span>⏱️ Duración: <strong className="text-[#26241F]">{preferences.dias} {preferences.dias === 1 ? "día" : "días"}</strong></span>
            <span>👥 Acompañante: <strong className="text-[#26241F]">{preferences.acompanante}</strong></span>
            <span>🌱 Ritmo: <strong className="text-[#26241F]">{preferences.ritmo}</strong></span>
            <span className="flex-1 md:text-right text-[#C96438]">
              Intereses: {preferences.intereses.join(", ")}
            </span>
          </div>
        )}

        {/* Results Grid */}
        {!loaded ? (
          <div className="text-center py-20">
            <span className="text-sm font-semibold text-[#26241F]/60">Calculando compatibilidad...</span>
          </div>
        ) : recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recommendations.map(({ destino, compatibilityScore, razones, presupuestoAjustado, advertencia }) => {
              // Ensure correct file extension for public image assets
              const imagePath = destino.imagen.replace(".jpg", ".png");
              const isFav = isFavorite(destino.id);

              return (
                <div
                  key={destino.id}
                  className="bg-white rounded-3xl border border-[#E8E2D8] overflow-hidden shadow-sm flex flex-col justify-between text-left h-full group border-b-4 hover:border-b-[#C96438] transition-all duration-300"
                >
                  <div>
                    {/* Image Area with Compatibility Score Badge */}
                    <div className="relative w-full aspect-[16/10] bg-[#E8E2D8] overflow-hidden">
                      <Image
                        src={imagePath}
                        alt={destino.nombre}
                        fill
                        priority
                        className="object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#193D32] text-white text-xs font-bold shadow-md">
                          ⚡ {compatibilityScore}% Compatible
                        </span>
                      </div>
                      
                      {/* Region Tag */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-bold text-[#26241F] shadow-sm">
                          📍 {destino.departamento}
                        </span>
                      </div>
                    </div>

                    {/* Content details */}
                    <div className="p-6 md:p-8 space-y-6">
                      <div>
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#26241F]">
                          {destino.nombre}
                        </h3>
                        <p className="text-xs text-[#26241F]/60 mt-1 line-clamp-2">
                          {destino.descripcion}
                        </p>
                      </div>

                      {/* Key stats: Budget & Days */}
                      <div className="grid grid-cols-2 gap-4 border-y border-[#E8E2D8]/50 py-4">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-[#26241F]/50 uppercase tracking-wider">
                            Presupuesto Referencial
                          </span>
                          <span className="text-base font-bold text-[#193D32] mt-0.5">
                            {getPresupuestoReferencial(destino.presupuesto)}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-[#26241F]/50 uppercase tracking-wider">
                            Días Recomendados
                          </span>
                          <span className="text-base font-bold text-[#26241F] mt-0.5">
                            {destino.dias_minimos} {destino.dias_minimos === 1 ? "día" : "días"} mínimo
                          </span>
                        </div>
                      </div>

                      {/* Destination interests tag pills */}
                      <div>
                        <span className="text-[10px] font-bold text-[#26241F]/50 uppercase tracking-wider block mb-2">
                          Experiencias Incluidas
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {destino.intereses.map((int) => (
                            <span
                              key={int}
                              className="text-[10px] font-bold uppercase tracking-wider text-[#26241F]/70 bg-[#F7F3EC] border border-[#E8E2D8]/40 px-2.5 py-1 rounded-lg"
                            >
                              {int}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 3 Reasons list */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-[#26241F]/50 uppercase tracking-wider block">
                          Razones de tu Compatibilidad
                        </span>
                        <ul className="space-y-2 text-xs font-semibold text-[#26241F]/80">
                          {razones.map((razon, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#C96438]">✓</span>
                              <span>{razon}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Adjusted Budget Warning banner */}
                      {presupuestoAjustado && advertencia && (
                        <div className="bg-orange-50 border border-orange-200 text-orange-800 text-xs font-semibold rounded-2xl p-4 flex items-start gap-2.5">
                          <span className="text-base">⚠️</span>
                          <span className="text-left leading-relaxed">{advertencia}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions buttons footer */}
                  <div className="p-6 md:p-8 pt-0 border-t border-[#E8E2D8]/40 flex gap-3">
                    <Link
                      href={`/destinos/${destino.id}`}
                      className="flex-1 inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#193D32] hover:bg-[#31594A] text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
                    >
                      Ver destino
                    </Link>
                    {favsLoaded && (
                      <button
                        onClick={() => toggleFavorite(destino.id)}
                        className={`px-4 py-3 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                          isFav
                            ? "bg-red-50 border-red-200 text-[#C96438]"
                            : "border-[#E8E2D8] hover:border-[#26241F]/30 text-[#26241F]/70"
                        }`}
                        type="button"
                        aria-label="Guardar destino"
                      >
                        <svg
                          className={`w-4 h-4 ${isFav ? "fill-[#C96438]" : "fill-none stroke-current"}`}
                          viewBox="0 0 24 24"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span className="ml-1 text-xs font-bold">{isFav ? "Guardado" : "Guardar"}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E8E2D8] shadow-sm max-w-xl mx-auto px-6">
            <span className="text-5xl block mb-6">🏝️</span>
            <h3 className="font-serif text-2xl font-bold text-[#26241F]">
              No hay coincidencias
            </h3>
            <p className="mt-2 text-sm text-[#26241F]/60 max-w-xs mx-auto mb-8">
              Considera ampliar tu presupuesto o tu cantidad de días disponibles.
            </p>
            <Link
              href="/recomendador"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#193D32] hover:bg-[#31594A] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Modificar búsqueda
            </Link>
          </div>
        )}

        {/* Disclaimer / Aclaración */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-xs italic text-[#26241F]/50 font-medium">
            “La compatibilidad se calcula con tus preferencias y la información disponible. Los precios son referenciales.”
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
