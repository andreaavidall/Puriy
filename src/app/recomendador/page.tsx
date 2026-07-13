"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { savePreferences } from "../../lib/storage";
import { Preferences } from "../../types/preferences";

function RecomendadorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Step state
  const [step, setStep] = useState(1);

  // Form states
  const [origen, setOrigen] = useState("Lima");
  const [presupuesto, setPresupuesto] = useState(600);
  const [dias, setDias] = useState("3");
  const [acompanante, setAcompanante] = useState("Amigos");
  const [intereses, setIntereses] = useState<string[]>(["Naturaleza"]);
  const [ritmo, setRitmo] = useState("Equilibrado");

  // Errors state
  const [errorMsg, setErrorMsg] = useState("");

  // Load initial state from query params or default
  useEffect(() => {
    const qSalida = searchParams.get("salida");
    const qPresupuesto = searchParams.get("presupuesto");
    const qDias = searchParams.get("dias");
    const qAcompanante = searchParams.get("acompanante");
    const qInteres = searchParams.get("interes");

    if (qSalida) {
      // Match origen options: Lima, Arequipa, Cusco, Trujillo
      const cleanSalida = qSalida.charAt(0).toUpperCase() + qSalida.slice(1).toLowerCase();
      if (["Lima", "Arequipa", "Cusco", "Trujillo"].includes(cleanSalida)) {
        setOrigen(cleanSalida);
      }
    }

    if (qPresupuesto) {
      const num = parseInt(qPresupuesto.replace(/\D/g, ""), 10);
      if (!isNaN(num) && num >= 100 && num <= 3000) {
        setPresupuesto(num);
      }
    }

    if (qDias) {
      const d = qDias.replace(/\D/g, "");
      if (["1", "2", "3", "4", "5", "6", "7"].includes(d)) {
        setDias(d === "7" ? "7 o más" : d);
      }
    }

    if (qAcompanante) {
      const cleanAcomp = qAcompanante.charAt(0).toUpperCase() + qAcompanante.slice(1).toLowerCase();
      // Match companion options: Sola, Pareja, Amigos, Familia
      const mapAcomp: Record<string, string> = {
        sola: "Sola",
        solo: "Sola",
        pareja: "Pareja",
        amigos: "Amigos",
        familia: "Familia"
      };
      const resolved = mapAcomp[qAcompanante.toLowerCase()];
      if (resolved) {
        setAcompanante(resolved);
      }
    }

    if (qInteres) {
      const cleanInt = qInteres.charAt(0).toUpperCase() + qInteres.slice(1).toLowerCase();
      const validInts = ["Naturaleza", "Aventura", "Cultura", "Gastronomía", "Playa", "Descanso", "Comunidades", "Vida nocturna"];
      const resolvedInt = validInts.find(i => i.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === qInteres.toLowerCase());
      if (resolvedInt) {
        setIntereses([resolvedInt]);
      }
    }
  }, [searchParams]);

  // Handle interests checkbox toggle (max 3 options)
  const handleInterestToggle = (interest: string) => {
    setErrorMsg("");
    if (intereses.includes(interest)) {
      setIntereses(intereses.filter((i) => i !== interest));
    } else {
      if (intereses.length >= 3) {
        setErrorMsg("Solo puedes elegir hasta un máximo de 3 intereses.");
        return;
      }
      setIntereses([...intereses, interest]);
    }
  };

  // Form submit navigation helper
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Final Validations
    if (presupuesto <= 0 || isNaN(presupuesto)) {
      setErrorMsg("El presupuesto debe ser mayor que cero.");
      return;
    }

    if (intereses.length === 0) {
      setErrorMsg("Debes seleccionar al menos un interés.");
      return;
    }

    const searchPref: Preferences = {
      origen,
      presupuesto,
      dias: parseInt(dias.replace(/\D/g, "") || "3", 10),
      acompanante,
      intereses,
      ritmo,
    };

    // Save search preferences in sessionStorage
    savePreferences(searchPref);

    // Redirect to /resultados page
    router.push("/resultados");
  };

  const nextStep = () => {
    setErrorMsg("");
    if (step === 1) {
      if (presupuesto < 100 || presupuesto > 3000 || isNaN(presupuesto)) {
        setErrorMsg("Por favor, ingresa un presupuesto entre S/100 y S/3000.");
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setErrorMsg("");
    setStep(step - 1);
  };

  const origenes = ["Lima", "Arequipa", "Cusco", "Trujillo"];
  const diasOpciones = ["1", "2", "3", "4", "5", "6", "7 o más"];
  const acompanantes = ["Sola", "Pareja", "Amigos", "Familia"];
  const listaIntereses = [
    { name: "Naturaleza", icon: "🌱" },
    { name: "Aventura", icon: "🧗" },
    { name: "Cultura", icon: "🏛️" },
    { name: "Gastronomía", icon: "🍽️" },
    { name: "Playa", icon: "🏖" },
    { name: "Descanso", icon: "🧘" },
    { name: "Comunidades", icon: "👥" },
    { name: "Vida nocturna", icon: "🥂" },
  ];
  const ritmos = ["Relajado", "Equilibrado", "Intenso"];

  return (
    <main className="flex-1 py-12 px-6 max-w-2xl mx-auto w-full">
      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="inline-flex items-center gap-2 text-sm font-bold text-[#193D32] hover:text-[#C96438] focus:outline-none transition-colors mb-8 cursor-pointer"
        type="button"
      >
        <svg className="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
        Volver al inicio
      </button>

      <span className="text-xs font-bold uppercase tracking-wider text-[#C96438] block mb-2">
        ENCUENTRA TU ESCAPADA IDEAL
      </span>
      <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#26241F] mb-2">
        Recomendador de Destinos
      </h1>
      <p className="text-sm text-[#26241F]/60 mb-8">
        Responde estas breves preguntas para diseñar una experiencia a tu medida.
      </p>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-xs font-bold text-[#26241F]/50 uppercase tracking-wider mb-2">
          <span>Paso {step} de 3</span>
          <span>{Math.round((step / 3) * 100)}% Completado</span>
        </div>
        <div className="w-full h-2 bg-[#E8E2D8] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#193D32] transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Error Alert Box */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-2xl p-4 mb-6 text-left flex items-start gap-2 animate-fade-in">
          <span>⚠️</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#E8E2D8] p-8 shadow-sm text-left">
        
        {/* STEP 1: Origen y Presupuesto */}
        {step === 1 && (
          <div className="space-y-8">
            {/* Field 1: Origen */}
            <div>
              <label className="text-sm font-bold uppercase tracking-wider text-[#26241F] block mb-4">
                ¿Desde dónde sales?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {origenes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setOrigen(item)}
                    className={`p-4 rounded-2xl border text-sm font-bold text-center transition-all cursor-pointer ${
                      origen === item
                        ? "border-[#193D32] bg-[#193D32]/5 text-[#193D32]"
                        : "border-[#E8E2D8] hover:border-[#193D32]/50 text-[#26241F]/80"
                    }`}
                  >
                    📍 {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Field 2: Presupuesto */}
            <div>
              <label className="text-sm font-bold uppercase tracking-wider text-[#26241F] block mb-2">
                ¿Cuál es tu presupuesto total por persona?
              </label>
              <span className="text-xs text-[#26241F]/60 block mb-4">
                Elige el presupuesto máximo que deseas gastar para todo tu viaje.
              </span>
              
              {/* Numeric Input */}
              <div className="flex items-center bg-[#F7F3EC] rounded-2xl border border-[#E8E2D8] px-4 py-3 mb-6 w-full max-w-[200px]">
                <span className="font-bold text-[#26241F] mr-2">S/</span>
                <input
                  type="number"
                  min="100"
                  max="3000"
                  value={presupuesto}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setPresupuesto(isNaN(val) ? 0 : val);
                  }}
                  className="bg-transparent font-bold text-lg text-[#26241F] focus:outline-none w-full"
                />
              </div>

              {/* Slider */}
              <div className="flex flex-col gap-2">
                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="50"
                  value={presupuesto || 100}
                  onChange={(e) => setPresupuesto(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-[#E8E2D8] rounded-lg appearance-none cursor-pointer accent-[#193D32]"
                />
                <div className="flex justify-between text-xs font-semibold text-[#26241F]/50 mt-1">
                  <span>Mín: S/100</span>
                  <span>Máx: S/3000</span>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3.5 rounded-full bg-[#193D32] hover:bg-[#31594A] text-white text-sm font-bold shadow-sm transition-colors cursor-pointer"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Días y Acompañante */}
        {step === 2 && (
          <div className="space-y-8">
            {/* Field 3: Días */}
            <div>
              <label className="text-sm font-bold uppercase tracking-wider text-[#26241F] block mb-4">
                ¿Cuántos días tienes disponibles?
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {diasOpciones.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setDias(item)}
                    className={`p-3 rounded-2xl border text-sm font-bold text-center transition-all cursor-pointer ${
                      dias === item
                        ? "border-[#193D32] bg-[#193D32]/5 text-[#193D32]"
                        : "border-[#E8E2D8] hover:border-[#193D32]/50 text-[#26241F]/80"
                    }`}
                  >
                    ⏱️ {item} {item !== "1" ? "días" : "día"}
                  </button>
                ))}
              </div>
            </div>

            {/* Field 4: Acompañante */}
            <div>
              <label className="text-sm font-bold uppercase tracking-wider text-[#26241F] block mb-4">
                ¿Con quién viajas?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {acompanantes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setAcompanante(item)}
                    className={`p-4 rounded-2xl border text-sm font-bold text-center transition-all cursor-pointer ${
                      acompanante === item
                        ? "border-[#193D32] bg-[#193D32]/5 text-[#193D32]"
                        : "border-[#E8E2D8] hover:border-[#193D32]/50 text-[#26241F]/80"
                    }`}
                  >
                    {item === "Sola" ? "👤" : item === "Pareja" ? "💕" : item === "Amigos" ? "🍻" : "👪"} {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Nav Buttons */}
            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3.5 rounded-full border-2 border-[#193D32] text-[#193D32] hover:bg-[#193D32]/5 text-sm font-bold transition-all cursor-pointer"
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3.5 rounded-full bg-[#193D32] hover:bg-[#31594A] text-white text-sm font-bold shadow-sm transition-colors cursor-pointer"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Intereses y Ritmo */}
        {step === 3 && (
          <div className="space-y-8">
            {/* Field 5: Intereses */}
            <div>
              <label className="text-sm font-bold uppercase tracking-wider text-[#26241F] block mb-1">
                ¿Qué buscas en tu viaje?
              </label>
              <span className="text-xs text-[#26241F]/60 block mb-4">
                Elige de 1 a 3 experiencias principales para enfocar tu viaje.
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {listaIntereses.map((item) => {
                  const selected = intereses.includes(item.name);
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => handleInterestToggle(item.name)}
                      className={`p-3 rounded-2xl border text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        selected
                          ? "border-[#193D32] bg-[#193D32]/5 text-[#193D32]"
                          : "border-[#E8E2D8] hover:border-[#193D32]/50 text-[#26241F]/80"
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 6: Ritmo */}
            <div>
              <label className="text-sm font-bold uppercase tracking-wider text-[#26241F] block mb-4">
                ¿Qué ritmo de viaje prefieres?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {ritmos.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setRitmo(item)}
                    className={`p-4 rounded-2xl border text-sm font-bold text-center transition-all cursor-pointer ${
                      ritmo === item
                        ? "border-[#193D32] bg-[#193D32]/5 text-[#193D32]"
                        : "border-[#E8E2D8] hover:border-[#193D32]/50 text-[#26241F]/80"
                    }`}
                  >
                    {item === "Relajado" ? "🧘" : item === "Equilibrado" ? "⚖️" : "⚡"} {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Nav Buttons */}
            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3.5 rounded-full border-2 border-[#193D32] text-[#193D32] hover:bg-[#193D32]/5 text-sm font-bold transition-all cursor-pointer"
              >
                Atrás
              </button>
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-[#C96438] hover:bg-[#E58A52] text-white text-sm font-bold shadow-md shadow-orange-950/15 transition-all cursor-pointer"
              >
                Buscar destinos recomendados
              </button>
            </div>
          </div>
        )}

      </form>
    </main>
  );
}

export default function RecomendadorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F3EC] text-[#26241F]">
      <Navbar />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center py-20">
          <span className="text-sm font-semibold text-[#26241F]/60">Cargando filtros iniciales...</span>
        </div>
      }>
        <RecomendadorContent />
      </Suspense>
      <Footer />
    </div>
  );
}
