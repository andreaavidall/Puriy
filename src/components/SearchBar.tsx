"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  // Input states
  const [salida, setSalida] = useState("Lima");
  const [presupuesto, setPresupuesto] = useState("600");
  const [dias, setDias] = useState("3");
  const [acompanante, setAcompanante] = useState("amigos");
  const [interes, setInteres] = useState("naturaleza");

  const handleSearch = () => {
    // Sanitize values
    const cleanSalida = encodeURIComponent(salida.trim() || "Lima");
    const cleanPresupuesto = encodeURIComponent(presupuesto.replace(/\D/g, "") || "600");
    const cleanDias = encodeURIComponent(dias.replace(/\D/g, "") || "3");
    const cleanAcompanante = encodeURIComponent(acompanante.toLowerCase());
    const cleanInteres = encodeURIComponent(interes.toLowerCase());

    // Redirect to /recomendador with query parameters
    router.push(
      `/recomendador?salida=${cleanSalida}&presupuesto=S%2F${cleanPresupuesto}&dias=${cleanDias}&acompanante=${cleanAcompanante}&interes=${cleanInteres}`
    );
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-6 -mt-10 lg:-mt-12 z-20">
      <div className="bg-white rounded-3xl lg:rounded-full p-4 lg:py-4 lg:px-8 shadow-[0_10px_30px_rgba(38,36,31,0.06)] border border-[#E8E2D8] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 lg:gap-0">
        
        {/* Field 1: Origen */}
        <div className="flex-1 lg:px-4 lg:border-r border-[#E8E2D8] flex flex-col justify-center">
          <label className="text-xs font-bold uppercase tracking-wider text-[#26241F]/50">
            ¿Desde dónde sales?
          </label>
          <input
            type="text"
            value={salida}
            onChange={(e) => setSalida(e.target.value)}
            className="mt-1 text-sm font-semibold text-[#26241F] bg-transparent focus:outline-none placeholder-zinc-400 focus:ring-1 focus:ring-[#C96438] rounded p-0.5"
          />
        </div>

        {/* Field 2: Presupuesto */}
        <div className="flex-1 lg:px-6 lg:border-r border-[#E8E2D8] flex flex-col justify-center">
          <label className="text-xs font-bold uppercase tracking-wider text-[#26241F]/50">
            ¿Cuál es tu presupuesto?
          </label>
          <div className="flex items-center mt-1">
            <span className="text-sm font-semibold text-[#26241F] mr-1">S/</span>
            <input
              type="text"
              value={presupuesto}
              onChange={(e) => setPresupuesto(e.target.value)}
              className="text-sm font-semibold text-[#26241F] bg-transparent focus:outline-none w-full focus:ring-1 focus:ring-[#C96438] rounded p-0.5"
            />
          </div>
        </div>

        {/* Field 3: Días */}
        <div className="flex-1 lg:px-6 lg:border-r border-[#E8E2D8] flex flex-col justify-center">
          <label className="text-xs font-bold uppercase tracking-wider text-[#26241F]/50">
            ¿Cuántos días tienes?
          </label>
          <select
            value={dias}
            onChange={(e) => setDias(e.target.value)}
            className="mt-1 text-sm font-semibold text-[#26241F] bg-transparent focus:outline-none cursor-pointer focus:ring-1 focus:ring-[#C96438] rounded p-0.5"
          >
            <option value="1">1 día</option>
            <option value="2">2 días</option>
            <option value="3">3 días</option>
            <option value="5">4-7 días</option>
            <option value="10">8+ días</option>
          </select>
        </div>

        {/* Field 4: Acompañante */}
        <div className="flex-1 lg:px-6 lg:border-r border-[#E8E2D8] flex flex-col justify-center">
          <label className="text-xs font-bold uppercase tracking-wider text-[#26241F]/50">
            ¿Con quién viajas?
          </label>
          <select
            value={acompanante}
            onChange={(e) => setAcompanante(e.target.value)}
            className="mt-1 text-sm font-semibold text-[#26241F] bg-transparent focus:outline-none cursor-pointer focus:ring-1 focus:ring-[#C96438] rounded p-0.5"
          >
            <option value="solo">Solo</option>
            <option value="pareja">Pareja</option>
            <option value="amigos">Amigos</option>
            <option value="familia">Familia</option>
          </select>
        </div>

        {/* Field 5: Experiencia */}
        <div className="flex-1 lg:px-6 flex flex-col justify-center">
          <label className="text-xs font-bold uppercase tracking-wider text-[#26241F]/50">
            ¿Qué buscas?
          </label>
          <select
            value={interes}
            onChange={(e) => setInteres(e.target.value)}
            className="mt-1 text-sm font-semibold text-[#26241F] bg-transparent focus:outline-none cursor-pointer focus:ring-1 focus:ring-[#C96438] rounded p-0.5"
          >
            <option value="naturaleza">Naturaleza</option>
            <option value="aventura">Aventura</option>
            <option value="cultura">Cultura</option>
            <option value="gastronomía">Gastronomía</option>
            <option value="playa">Playa</option>
            <option value="descanso">Descanso</option>
          </select>
        </div>

        {/* Action Button: Circular Terracota */}
        <div className="flex items-center justify-center lg:pl-4">
          <button
            onClick={handleSearch}
            className="w-14 h-14 rounded-full bg-[#C96438] hover:bg-[#E58A52] focus:bg-[#E58A52] text-white flex items-center justify-center shadow-md shadow-orange-900/10 hover:shadow-lg hover:scale-105 focus:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#193D32] focus:ring-offset-2 transition-all cursor-pointer"
            type="button"
            aria-label="Buscar destinos"
          >
            <svg
              className="w-6 h-6 stroke-current fill-none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
