import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function GuiasPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F3EC] text-[#26241F]">
      <Navbar />
      <main className="flex-1 py-16 px-6 max-w-4xl mx-auto w-full text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C96438] block mb-2">
          RECURSOS DEL VIAJERO
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#26241F] mb-6">
          Guías de Viaje
        </h1>
        <p className="text-base md:text-lg text-[#26241F]/70 max-w-xl mx-auto mb-12">
          Toda la información práctica y detallada para viajar de forma responsable y bien informado.
        </p>

        <div className="py-20 bg-white rounded-3xl border border-[#E8E2D8] shadow-sm">
          <span className="text-5xl block mb-6">📖</span>
          <h3 className="font-serif text-2xl font-bold text-[#26241F]">
            Guías informativas en camino
          </h3>
          <p className="mt-2 text-sm text-[#26241F]/60 max-w-xs mx-auto">
            Estamos compilando guías detalladas con presupuestos reales, mapas de rutas oficiales y recomendaciones locales.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
