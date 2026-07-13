import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ExperienciasPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F3EC] text-[#26241F]">
      <Navbar />
      <main className="flex-1 py-16 px-6 max-w-4xl mx-auto w-full text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C96438] block mb-2">
          VIVE EL PERÚ
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#26241F] mb-6">
          Experiencias Únicas
        </h1>
        <p className="text-base md:text-lg text-[#26241F]/70 max-w-xl mx-auto mb-12">
          Actividades diseñadas para sumergirte en la cultura, gastronomía y naturaleza del país.
        </p>

        <div className="py-20 bg-white rounded-3xl border border-[#E8E2D8] shadow-sm">
          <span className="text-5xl block mb-6">🗺️</span>
          <h3 className="font-serif text-2xl font-bold text-[#26241F]">
            Página de Experiencias en construcción
          </h3>
          <p className="mt-2 text-sm text-[#26241F]/60 max-w-xs mx-auto">
            Pronto podrás explorar y filtrar una gran variedad de experiencias auténticas guiadas por comunidades locales.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
