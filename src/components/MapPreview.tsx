"use client";

import React, { useState } from "react";

export default function MapPreview() {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const markers = [
    { id: "iquitos", name: "Iquitos (Amazonas)", x: "65%", y: "20%", desc: "Selva y biodiversidad" },
    { id: "lima", name: "Lima (Costa)", x: "35%", y: "55%", desc: "Gastronomía frente al mar" },
    { id: "cusco", name: "Cusco (Sierra)", x: "62%", y: "68%", desc: "Historia e Imperio Inca" },
    { id: "arequipa", name: "Arequipa (Sierra)", x: "58%", y: "82%", desc: "Cañones y volcanes" },
    { id: "paracas", name: "Paracas (Costa)", x: "39%", y: "65%", desc: "Fauna marina y desierto" },
  ];

  return (
    <div className="w-full bg-[#F7F3EC] rounded-3xl border border-[#E8E2D8] p-8 md:p-10 shadow-[0_4px_20px_rgba(38,36,31,0.02)] flex flex-col lg:flex-row gap-10 items-center justify-between">
      
      {/* Left side: Copy */}
      <div className="w-full lg:w-5/12 flex flex-col items-start text-left">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C96438] block mb-2">
          EXPLORA EL PERÚ
        </span>
        <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#26241F] leading-tight tracking-tight">
          ¿No sabes a dónde ir?<br />
          Explora el mapa
        </h3>
        <p className="mt-4 text-sm md:text-base leading-relaxed text-[#26241F]/70">
          Haz clic en los marcadores interactivos para descubrir destinos mágicos en las regiones de la costa, la sierra y la selva peruana.
        </p>
        <a
          href="#"
          className="mt-6 text-sm font-bold text-[#193D32] hover:text-[#C96438] inline-flex items-center gap-2 border-b-2 border-[#193D32] hover:border-[#C96438] pb-0.5 transition-all"
        >
          Ver mapa interactivo
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>

      {/* Right side: Styled Silhouetted Map */}
      <div className="w-full lg:w-6/12 flex justify-center relative select-none">
        
        {/* Map Container */}
        <div className="relative w-full max-w-[340px] aspect-[4/5] bg-white/40 rounded-3xl p-6 border border-[#E8E2D8]/30 flex items-center justify-center">
          
          {/* Peru stylized SVG outline */}
          <svg
            className="w-full h-full text-[#31594A]/10 fill-current"
            viewBox="0 0 200 250"
          >
            {/* Artistic stylized Peru silhouette */}
            <path
              d="M100 20 C105 15, 115 15, 120 22 C125 30, 135 25, 140 35 C145 45, 155 50, 150 65 C145 80, 160 85, 155 95 C150 105, 135 110, 130 120 C125 130, 132 135, 128 145 C124 155, 132 165, 125 178 C118 190, 122 200, 115 212 C108 225, 100 235, 88 238 C80 240, 75 230, 78 220 C82 210, 78 202, 70 195 C62 188, 65 175, 58 165 C52 155, 45 150, 38 142 C30 135, 32 125, 25 118 C18 110, 22 100, 28 92 C34 85, 42 82, 45 72 C48 62, 55 58, 62 50 C70 42, 78 45, 82 35 C86 25, 95 25, 100 20 Z"
            />
            {/* Connecting decorative route lines */}
            <path
              d="M78 145 Q88 152, 112 162 T120 185"
              fill="none"
              stroke="#31594A"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="opacity-40"
            />
            <path
              d="M78 145 Q62 120, 110 65"
              fill="none"
              stroke="#31594A"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="opacity-40"
            />
          </svg>

          {/* Interactive Markers */}
          {markers.map((marker) => (
            <div
              key={marker.id}
              className="absolute"
              style={{ left: marker.x, top: marker.y }}
            >
              {/* Pulsing ring */}
              <span className="absolute -inset-2 rounded-full bg-[#C96438]/20 animate-ping opacity-75" />
              
              {/* Pin point */}
              <button
                onClick={() => setActiveMarker(activeMarker === marker.id ? null : marker.id)}
                onMouseEnter={() => setActiveMarker(marker.id)}
                onMouseLeave={() => setActiveMarker(null)}
                className={`relative w-4.5 h-4.5 rounded-full border-2 border-white shadow-md flex items-center justify-center transition-all ${
                  activeMarker === marker.id ? "bg-[#C96438] scale-125" : "bg-[#193D32] hover:bg-[#C96438]"
                } cursor-pointer`}
                type="button"
                aria-label={`Marker for ${marker.name}`}
              />

              {/* Tooltip */}
              {activeMarker === marker.id && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 bg-white text-[#26241F] text-xs font-semibold rounded-xl p-3 shadow-xl border border-[#E8E2D8] z-30 pointer-events-none transition-all animate-fade-in">
                  <span className="block font-bold text-[#193D32]">{marker.name}</span>
                  <span className="block text-[#26241F]/60 font-medium mt-1">{marker.desc}</span>
                </div>
              )}
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
