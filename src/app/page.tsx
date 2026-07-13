import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import DestinationCard from "../components/DestinationCard";
import ExperienceCard from "../components/ExperienceCard";
import MapPreview from "../components/MapPreview";
import BenefitsBar from "../components/BenefitsBar";
import Footer from "../components/Footer";

export default function Home() {
  const destinosRecomendados = [
    {
      nombre: "Oxapampa",
      tagline: "Ideal para desconectar",
      duracion: "3 días / 2 noches",
      presupuesto: "Desde S/540 por persona",
      imagen: "/destinos/colca.png",
    },
    {
      nombre: "Paracas",
      tagline: "Playa y naturaleza",
      duracion: "3 días / 2 noches",
      presupuesto: "Desde S/580 por persona",
      imagen: "/destinos/paracas.png",
    },
    {
      nombre: "Lunahuaná",
      tagline: "Aventura y gastronomía",
      duracion: "2 días / 1 noche",
      presupuesto: "Desde S/350 por persona",
      imagen: "/destinos/huacachina.png",
    },
  ];

  const experienciasDestacadas = [
    {
      nombre: "Conoce comunidades locales",
      precio: "Desde S/120 por persona",
      icon: "👥",
      imagen: "/destinos/huacachina.png",
    },
    {
      nombre: "Descubre cataratas escondidas",
      precio: "Desde S/80 por persona",
      icon: "🌊",
      imagen: "/destinos/paracas.png",
    },
    {
      nombre: "Aprende artesanía local",
      precio: "Desde S/60 por persona",
      icon: "🏺",
      imagen: "/destinos/machu-picchu.png",
    },
    {
      nombre: "Haz caminatas entre montañas",
      precio: "Desde S/150 por persona",
      icon: "🏔️",
      imagen: "/destinos/colca.png",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F3EC] text-[#26241F]">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Principal */}
      <Hero />

      {/* 3. Buscador Superpuesto */}
      <SearchBar />

      {/* Spacer between SearchBar and Content */}
      <div className="h-20 md:h-28" />

      {/* 4. Destinos Recomendados */}
      <section className="w-full bg-[#FFFFFF] py-24 px-6 border-y border-[#E8E2D8]/40">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-4 flex flex-col items-start justify-start text-left lg:sticky lg:top-28 h-fit">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C96438] block mb-2">
              RECOMENDADOS PARA TI
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#26241F] leading-tight tracking-tight">
              Destinos que<br />
              combinan contigo
            </h2>
            <p className="mt-6 text-sm md:text-base leading-relaxed text-[#26241F]/70 max-w-sm">
              Seleccionados especialmente en base a tu perfil, tus intereses y el presupuesto estimado para tu viaje.
            </p>
            <Link
              href="/explorar"
              className="mt-8 text-sm font-bold text-[#193D32] hover:text-[#C96438] inline-flex items-center gap-2 border-b-2 border-[#193D32] hover:border-[#C96438] pb-0.5 focus:outline-none focus:ring-2 focus:ring-[#C96438] focus:ring-offset-2 rounded transition-all"
            >
              Ver todos los destinos
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Right Column: Cards List */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {destinosRecomendados.map((destino, idx) => (
              <DestinationCard
                key={idx}
                nombre={destino.nombre}
                tagline={destino.tagline}
                duracion={destino.duracion}
                presupuesto={destino.presupuesto}
                imagen={destino.imagen}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 5. Experiencias */}
      <section className="w-full py-24 px-6 bg-[#F7F3EC]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-4 flex flex-col items-start justify-start text-left lg:sticky lg:top-28 h-fit">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C96438] block mb-2">
              EXPERIENCIAS QUE TE CAMBIAN
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#26241F] leading-tight tracking-tight">
              No solo viajes,<br />
              vive experiencias
            </h2>
            <p className="mt-6 text-sm md:text-base leading-relaxed text-[#26241F]/70 max-w-sm">
              Conéctate con la cultura viva del Perú, explora paisajes inexplorados y apoya a las comunidades locales.
            </p>
            <Link
              href="/experiencias"
              className="mt-8 text-sm font-bold text-[#193D32] hover:text-[#C96438] inline-flex items-center gap-2 border-b-2 border-[#193D32] hover:border-[#C96438] pb-0.5 focus:outline-none focus:ring-2 focus:ring-[#C96438] focus:ring-offset-2 rounded transition-all"
            >
              Ver todas las experiencias
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Right Column: Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {experienciasDestacadas.map((exp, idx) => (
              <ExperienceCard
                key={idx}
                nombre={exp.nombre}
                precio={exp.precio}
                icon={exp.icon}
                imagen={exp.imagen}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 6. Mapa del Perú */}
      <section className="w-full pb-24 px-6 bg-[#F7F3EC]">
        <div className="mx-auto max-w-7xl">
          <MapPreview />
        </div>
      </section>

      {/* 7. Barra de Beneficios */}
      <BenefitsBar />

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}
