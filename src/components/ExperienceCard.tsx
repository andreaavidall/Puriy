import React from "react";
import Image from "next/image";

interface ExperienceCardProps {
  nombre: string;
  precio: string;
  icon: string;
  imagen: string;
}

export default function ExperienceCard({
  nombre,
  precio,
  icon,
  imagen,
}: ExperienceCardProps) {
  return (
    <div className="group relative w-full aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_4px_16px_rgba(38,36,31,0.02)] hover:shadow-[0_12px_24px_rgba(38,36,31,0.06)] hover:translate-y-[-2px] transition-all duration-300 border border-[#E8E2D8]/50">
      
      {/* Background Image */}
      <Image
        src={imagen}
        alt={nombre}
        fill
        className="object-cover transition-transform duration-750 group-hover:scale-105"
      />
      
      {/* Visual Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300 group-hover:from-black/90" />

      {/* Floating Small Circle Icon */}
      <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-[#193D32] text-sm font-semibold">
        {icon}
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
        <h4 className="font-serif text-lg md:text-xl font-bold leading-tight tracking-tight">
          {nombre}
        </h4>
        <span className="text-xs font-semibold text-white/70 mt-2 block uppercase tracking-wider">
          Precio referencial
        </span>
        <span className="text-sm font-bold text-[#E58A52] mt-0.5 block">
          {precio}
        </span>
      </div>

    </div>
  );
}
