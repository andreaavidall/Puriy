"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface DestinationCardProps {
  nombre: string;
  tagline: string;
  duracion: string;
  presupuesto: string;
  imagen: string;
}

export default function DestinationCard({
  nombre,
  tagline,
  duracion,
  presupuesto,
  imagen,
}: DestinationCardProps) {
  // Normalize destination name to get a URL-friendly slug
  const slug = nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("puriy-favorites");
      if (stored) {
        const list = JSON.parse(stored) as string[];
        setIsFavorite(list.includes(slug));
      }
    } catch (e) {
      console.error("Error reading localStorage favorites", e);
    }
  }, [slug]);

  const toggleFavorite = (e: React.MouseEvent) => {
    // Crucial: stop propagation so clicking the favorite button doesn't trigger the card's navigation
    e.stopPropagation();
    e.preventDefault();

    try {
      const stored = localStorage.getItem("puriy-favorites");
      let list = stored ? (JSON.parse(stored) as string[]) : [];

      if (list.includes(slug)) {
        list = list.filter((id) => id !== slug);
        setIsFavorite(false);
      } else {
        list.push(slug);
        setIsFavorite(true);
      }

      localStorage.setItem("puriy-favorites", JSON.stringify(list));
    } catch (err) {
      console.error("Error updating localStorage favorites", err);
    }
  };

  return (
    <Link
      href={`/destinos/${slug}`}
      className="group w-full bg-white rounded-3xl border border-[#E8E2D8] overflow-hidden shadow-[0_4px_20px_rgba(38,36,31,0.02)] hover:shadow-[0_12px_32px_rgba(38,36,31,0.06)] hover:translate-y-[-2px] focus:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-[#C96438] focus:ring-offset-2 transition-all duration-300 flex flex-col md:flex-row h-full md:h-52 cursor-pointer"
    >
      {/* Left side: Image and absolute button */}
      <div className="relative w-full md:w-48 lg:w-56 h-48 md:h-full bg-[#E8E2D8] overflow-hidden flex-shrink-0">
        <Image
          src={imagen}
          alt={nombre}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Favorite Button (stops propagation) */}
        <button
          onClick={toggleFavorite}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-[#26241F] hover:text-[#C96438] focus:text-[#C96438] focus:outline-none hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
          type="button"
          aria-label={isFavorite ? `Quitar ${nombre} de favoritos` : `Agregar ${nombre} a favoritos`}
        >
          <svg
            className={`w-5 h-5 ${isFavorite ? "fill-[#C96438] stroke-[#C96438]" : "fill-none stroke-current"}`}
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Right side: Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          {/* Tagline */}
          <span className="text-xs font-bold uppercase tracking-wider text-[#C96438] block mb-1">
            {tagline}
          </span>
          {/* Destination Name */}
          <h3 className="font-serif text-2xl font-bold text-[#26241F] tracking-tight">
            {nombre}
          </h3>
        </div>

        {/* Info & Price */}
        <div className="flex items-end justify-between mt-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-[#26241F]/60 flex items-center gap-1.5">
              <span>⏱️</span> {duracion}
            </span>
            <span className="text-base font-bold text-[#193D32]">
              {presupuesto}
            </span>
          </div>

          {/* Action Button: Circular arrow (cosmetic since card is a Link) */}
          <div
            className="w-11 h-11 rounded-full bg-[#193D32]/5 group-hover:bg-[#C96438] text-[#193D32] group-hover:text-white flex items-center justify-center transition-all duration-300"
            aria-hidden="true"
          >
            <svg
              className="w-5 h-5 stroke-current fill-none transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
