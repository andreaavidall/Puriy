import React from "react";

export default function SearchBar() {
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
            defaultValue="Lima, Perú"
            className="mt-1 text-sm font-semibold text-[#26241F] bg-transparent focus:outline-none placeholder-zinc-400"
          />
        </div>

        {/* Field 2: Presupuesto */}
        <div className="flex-1 lg:px-6 lg:border-r border-[#E8E2D8] flex flex-col justify-center">
          <label className="text-xs font-bold uppercase tracking-wider text-[#26241F]/50">
            ¿Cuál es tu presupuesto?
          </label>
          <input
            type="text"
            defaultValue="S/600"
            className="mt-1 text-sm font-semibold text-[#26241F] bg-transparent focus:outline-none"
          />
        </div>

        {/* Field 3: Días */}
        <div className="flex-1 lg:px-6 lg:border-r border-[#E8E2D8] flex flex-col justify-center">
          <label className="text-xs font-bold uppercase tracking-wider text-[#26241F]/50">
            ¿Cuántos días tienes?
          </label>
          <select
            defaultValue="3 días"
            className="mt-1 text-sm font-semibold text-[#26241F] bg-transparent focus:outline-none cursor-pointer appearance-none"
          >
            <option>1 día</option>
            <option>2 días</option>
            <option>3 días</option>
            <option>4-7 días</option>
            <option>8+ días</option>
          </select>
        </div>

        {/* Field 4: Acompañante */}
        <div className="flex-1 lg:px-6 lg:border-r border-[#E8E2D8] flex flex-col justify-center">
          <label className="text-xs font-bold uppercase tracking-wider text-[#26241F]/50">
            ¿Con quién viajas?
          </label>
          <select
            defaultValue="Amigos"
            className="mt-1 text-sm font-semibold text-[#26241F] bg-transparent focus:outline-none cursor-pointer appearance-none"
          >
            <option>Solo</option>
            <option>Pareja</option>
            <option>Amigos</option>
            <option>Familia</option>
          </select>
        </div>

        {/* Field 5: Experiencia */}
        <div className="flex-1 lg:px-6 flex flex-col justify-center">
          <label className="text-xs font-bold uppercase tracking-wider text-[#26241F]/50">
            ¿Qué buscas?
          </label>
          <select
            defaultValue="Naturaleza"
            className="mt-1 text-sm font-semibold text-[#26241F] bg-transparent focus:outline-none cursor-pointer appearance-none"
          >
            <option>Naturaleza</option>
            <option>Aventura</option>
            <option>Cultura</option>
            <option>Gastronomía</option>
            <option>Playa</option>
            <option>Descanso</option>
          </select>
        </div>

        {/* Action Button: Circular Terracota */}
        <div className="flex items-center justify-center lg:pl-4">
          <button
            className="w-14 h-14 rounded-full bg-[#C96438] hover:bg-[#E58A52] text-white flex items-center justify-center shadow-md shadow-orange-900/10 hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            type="button"
            aria-label="Buscar"
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
