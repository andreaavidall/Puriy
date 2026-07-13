import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AcercaDePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F3EC] text-[#26241F]">
      <Navbar />
      <main className="flex-1 py-16 px-6 max-w-4xl mx-auto w-full text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C96438] block mb-2">
          SOBRE NOSOTROS
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#26241F] mb-6">
          Acerca de Puriy
        </h1>
        <p className="text-base md:text-lg text-[#26241F]/70 max-w-xl mx-auto mb-12">
          Puriy es un vocablo quechua que significa "caminar" o "viajar". Queremos ayudarte a recorrer el Perú de forma auténtica, adaptada y responsable.
        </p>

        <div className="py-20 bg-white rounded-3xl border border-[#E8E2D8] shadow-sm">
          <span className="text-5xl block mb-6">🇵🇪</span>
          <h3 className="font-serif text-2xl font-bold text-[#26241F]">
            Nuestra Misión
          </h3>
          <p className="mt-2 text-sm text-[#26241F]/60 max-w-sm mx-auto">
            Hacer que descubrir el Perú sea accesible para todos los bolsillos, promoviendo el turismo consciente, descentralizado y de comercio justo local.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
