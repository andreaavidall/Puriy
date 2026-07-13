import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DestinationCard from "../../components/DestinationCard";
import destinos from "../../data/destinos.json";

export default function ExplorarPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F3EC] text-[#26241F]">
      <Navbar />
      <main className="flex-1 py-16 px-6 max-w-7xl mx-auto w-full">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C96438] block mb-2">
          EXPLORA EL PERÚ
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#26241F] mb-6">
          Todos los Destinos
        </h1>
        <p className="text-base md:text-lg text-[#26241F]/70 max-w-2xl mb-12">
          Descubre los tesoros que el Perú tiene para ofrecer. Filtra y encuentra tu próxima aventura según tus preferencias.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {destinos.map((destino) => (
            <DestinationCard
              key={destino.id}
              nombre={destino.nombre}
              tagline={destino.intereses.join(" / ")}
              duracion={`${destino.dias_minimos} días`}
              presupuesto={`Presupuesto: ${destino.presupuesto.toUpperCase()}`}
              imagen={destino.imagen}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
