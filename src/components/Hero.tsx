import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#F7F3EC] pt-12 pb-24 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Copy */}
        <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
          <h1 className="font-serif text-5xl md:text-6xl font-bold leading-[1.1] text-[#26241F] tracking-tight">
            Descubre tu<br />
            próxima aventura<br />
            <span className="font-serif italic font-normal text-[#C96438] block mt-1">
              en el Perú
            </span>
          </h1>
          <p className="mt-8 text-base md:text-lg leading-relaxed text-[#26241F]/80 max-w-xl">
            Cuéntanos tu presupuesto, tus días disponibles y la experiencia que buscas. 
            Puriy te ayuda a encontrar destinos que realmente encajan contigo.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/recomendador"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#193D32] hover:bg-[#31594A] focus:bg-[#31594A] text-white text-base font-bold shadow-md shadow-emerald-950/10 focus:outline-none focus:ring-2 focus:ring-[#C96438] focus:ring-offset-2 transition-all active:scale-98 cursor-pointer"
            >
              Encontrar mi destino
            </Link>
            <Link
              href="/explorar"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-[#193D32] text-[#193D32] hover:bg-[#193D32]/5 focus:bg-[#193D32]/5 focus:outline-none focus:ring-2 focus:ring-[#C96438] focus:ring-offset-2 transition-all active:scale-98 cursor-pointer"
            >
              Explorar el Perú
            </Link>
          </div>
        </div>

        {/* Right Side: Image and Overlay */}
        <div className="lg:col-span-6 flex justify-center relative">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 bg-[#E8E2D8]/40 -z-10 rounded-full blur-3xl transform translate-x-10 translate-y-10" />
          
          <div className="relative w-full max-w-lg aspect-[4/5] md:aspect-[4/5] overflow-hidden rounded-t-[120px] rounded-b-2xl shadow-xl border-4 border-white">
            <Image
              src="/hero-peru.png"
              alt="Paisaje natural del Perú"
              fill
              priority
              className="object-cover object-center transform scale-102 hover:scale-105 transition-transform duration-700"
            />

            {/* Elegant glassmorphic floating note */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/20 shadow-lg text-center">
              <span className="font-serif italic text-base text-[#193D32] font-semibold">
                “Viaja para descubrir lugares que no esperabas”
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
