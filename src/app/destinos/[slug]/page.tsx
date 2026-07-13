"use client";

import React, { use } from "react";
import { useFavorites } from "../../../hooks/useFavorites";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import destinosData from "../../../data/destinos.json";

// Dynamic routing page properties in Next.js 15
interface PageProps {
  params: Promise<{ slug: string }>;
}

interface ItinerarioItem {
  dia: number;
  titulo: string;
  descripcion: string;
}

interface PresupuestoItem {
  concepto: string;
  costo: number;
}

interface Destino {
  id: string;
  nombre: string;
  descripcion: string;
  departamento: string;
  presupuesto: string;
  dias_minimos: number;
  intereses: string[];
  acompanantes: string[];
  imagen: string;
  como_llegar?: string;
  actividades?: string[];
  gastronomia?: string[];
  mejor_epoca?: string;
  ideal_para?: string;
  itinerario_sugerido?: ItinerarioItem[];
  desglose_presupuesto?: PresupuestoItem[];
  fuentes?: string[];
  fecha_actualizacion?: string;
}

const DESTINOS = destinosData as Destino[];

export default function DestinoPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const slug = resolvedParams.slug.toLowerCase();

  // Find destination by ID
  const destino = DESTINOS.find((d) => d.id === slug);

  // If destination does not exist, trigger 404
  if (!destino) {
    notFound();
  }

  const { isFavorite, addFavorite, removeFavorite, loaded } = useFavorites();
  const isFav = isFavorite(destino.id);

  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(destino.id);
    } else {
      addFavorite(destino.id);
    }
  };

  const getPresupuestoReferencial = (cat: string) => {
    const norm = cat.toLowerCase();
    if (norm === "bajo") return "S/150 - S/300";
    if (norm === "medio") return "S/400 - S/600";
    return "S/1000 - S/1500+";
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F3EC] text-[#26241F]">
      <Navbar />

      <main className="flex-1 py-16 px-6 max-w-5xl mx-auto w-full text-left">
        {/* Navigation Breadcrumbs */}
        <nav className="text-xs font-semibold uppercase tracking-wider text-[#26241F]/50 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#C96438] transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/explorar" className="hover:text-[#C96438] transition-colors">Destinos</Link>
          <span>/</span>
          <span className="text-[#26241F] font-bold">{destino.nombre}</span>
        </nav>

        {/* Hero Section Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          {/* Main Photo */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm border-4 border-white bg-[#E8E2D8]">
            <Image
              src={destino.imagen}
              alt={destino.nombre}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Details header */}
          <div className="flex flex-col items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C96438] px-3 py-1 rounded-full bg-[#C96438]/10 mb-4">
              📍 {destino.departamento}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#26241F] leading-tight">
              {destino.nombre}
            </h1>
            
            <div className="mt-6 flex flex-col gap-2.5">
              <span className="text-sm font-semibold text-[#26241F]/70 flex items-center gap-2">
                ⏱️ Días recomendados: <strong className="text-[#26241F]">{destino.dias_minimos} {destino.dias_minimos === 1 ? "día" : "días"} mínimo</strong>
              </span>
              <span className="text-sm font-semibold text-[#26241F]/70 flex items-center gap-2">
                💰 Presupuesto estimado: <strong className="text-[#193D32]">{getPresupuestoReferencial(destino.presupuesto)}</strong>
              </span>
            </div>

            {destino.intereses && destino.intereses.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-1.5">
                {destino.intereses.map((interes) => (
                  <span
                    key={interes}
                    className="text-[10px] font-bold uppercase tracking-wider text-[#26241F]/70 bg-[#E8E2D8]/50 px-2.5 py-1 rounded-lg"
                  >
                    {interes}
                  </span>
                ))}
              </div>
            )}

            {/* Favorite toggle and Return buttons */}
            <div className="mt-8 flex flex-wrap gap-3 w-full">
              {loaded && (
                <button
                  onClick={toggleFavorite}
                  className={`flex-1 min-w-[140px] px-6 py-3 rounded-full border text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isFav
                      ? "bg-red-50 border-red-200 text-[#C96438]"
                      : "bg-white border-[#E8E2D8] hover:border-[#26241F]/30 text-[#26241F]/70"
                  }`}
                  type="button"
                >
                  <svg
                    className={`w-4 h-4 ${isFav ? "fill-[#C96438]" : "fill-none stroke-current"}`}
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {isFav ? "Guardado en favoritos" : "Guardar en favoritos"}
                </button>
              )}

              <button
                onClick={() => router.push("/resultados")}
                className="flex-1 min-w-[140px] px-6 py-3 rounded-full bg-[#193D32] hover:bg-[#31594A] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                type="button"
              >
                Volver a resultados
              </button>
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-12 bg-white rounded-3xl border border-[#E8E2D8] p-8 md:p-12 shadow-sm">
          
          {/* 1. Descripción */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#193D32] mb-4">Sobre el destino</h2>
            <p className="text-base leading-relaxed text-[#26241F]/80">{destino.descripcion}</p>
          </div>

          {/* 2. Cómo llegar */}
          {destino.como_llegar && (
            <div className="border-t border-[#E8E2D8]/50 pt-8">
              <h3 className="font-serif text-xl font-bold text-[#26241F] mb-4">🚗 Cómo llegar</h3>
              <p className="text-sm leading-relaxed text-[#26241F]/70">{destino.como_llegar}</p>
            </div>
          )}

          {/* 3. Mejor época & Ideal para */}
          {(destino.mejor_epoca || destino.ideal_para) && (
            <div className="border-t border-[#E8E2D8]/50 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {destino.mejor_epoca && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#26241F]/50 mb-2">
                    Mejor época para visitar
                  </h4>
                  <p className="text-sm font-semibold text-[#26241F]">{destino.mejor_epoca}</p>
                </div>
              )}
              {destino.ideal_para && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#26241F]/50 mb-2">
                    Ideal para
                  </h4>
                  <p className="text-sm font-semibold text-[#26241F]">{destino.ideal_para}</p>
                </div>
              )}
            </div>
          )}

          {/* 4. Actividades */}
          {destino.actividades && destino.actividades.length > 0 && (
            <div className="border-t border-[#E8E2D8]/50 pt-8">
              <h3 className="font-serif text-xl font-bold text-[#26241F] mb-4">🧗 Qué hacer</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destino.actividades.map((act) => (
                  <li key={act} className="flex items-start gap-2.5 text-sm text-[#26241F]/85">
                    <span className="text-[#C96438] text-base leading-none">•</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 5. Gastronomía */}
          {destino.gastronomia && destino.gastronomia.length > 0 && (
            <div className="border-t border-[#E8E2D8]/50 pt-8">
              <h3 className="font-serif text-xl font-bold text-[#26241F] mb-4">🍽️ Gastronomía recomendada</h3>
              <div className="flex flex-wrap gap-2">
                {destino.gastronomia.map((g) => (
                  <span
                    key={g}
                    className="text-xs font-bold text-[#193D32] bg-[#193D32]/5 border border-[#193D32]/10 px-3 py-1.5 rounded-full"
                  >
                    🍲 {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 6. Itinerario Sugerido */}
          {destino.itinerario_sugerido && destino.itinerario_sugerido.length > 0 && (
            <div className="border-t border-[#E8E2D8]/50 pt-8">
              <h3 className="font-serif text-xl font-bold text-[#26241F] mb-6">📅 Itinerario Sugerido</h3>
              <div className="space-y-6 pl-2 border-l-2 border-[#193D32]/10 ml-2">
                {destino.itinerario_sugerido.map((item) => (
                  <div key={item.dia} className="relative pl-6">
                    {/* Circle bullet */}
                    <div className="absolute -left-[14px] top-1.5 w-6 h-6 rounded-full bg-[#193D32] text-white flex items-center justify-center text-[10px] font-bold">
                      {item.dia}
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#26241F]">
                      Día {item.dia}: {item.titulo}
                    </h4>
                    <p className="text-xs leading-relaxed text-[#26241F]/60 mt-1">
                      {item.descripcion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. Desglose de Presupuesto */}
          {destino.desglose_presupuesto && destino.desglose_presupuesto.length > 0 && (
            <div className="border-t border-[#E8E2D8]/50 pt-8">
              <h3 className="font-serif text-xl font-bold text-[#26241F] mb-4">💰 Desglose Estimado de Costos</h3>
              <div className="overflow-hidden border border-[#E8E2D8] rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F3EC] font-bold text-[#26241F]">
                    <tr>
                      <th className="p-4">Concepto</th>
                      <th className="p-4 text-right">Costo Estimado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E2D8]">
                    {destino.desglose_presupuesto.map((item, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/50">
                        <td className="p-4 font-semibold text-[#26241F]/80">{item.concepto}</td>
                        <td className="p-4 text-right font-bold text-[#193D32]">S/ {item.costo}</td>
                      </tr>
                    ))}
                    <tr className="bg-[#193D32]/5 font-bold">
                      <td className="p-4">Total Sugerido</td>
                      <td className="p-4 text-right text-base text-[#193D32]">
                        S/ {destino.desglose_presupuesto.reduce((sum, item) => sum + item.costo, 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 8. Fuentes y Fecha de actualización */}
          {(destino.fuentes || destino.fecha_actualizacion) && (
            <div className="border-t border-[#E8E2D8]/50 pt-8 flex flex-col sm:flex-row justify-between gap-6 text-[10px] font-semibold text-[#26241F]/40">
              {destino.fuentes && (
                <div>
                  <span className="block uppercase tracking-wider font-bold mb-1">Fuentes oficiales</span>
                  <span>{destino.fuentes.join(" • ")}</span>
                </div>
              )}
              {destino.fecha_actualizacion && (
                <div className="sm:text-right">
                  <span className="block uppercase tracking-wider font-bold mb-1">Última actualización</span>
                  <span>{destino.fecha_actualizacion}</span>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Disclaimer / Aviso Legal */}
        <div className="mt-8 text-center max-w-2xl mx-auto">
          <p className="text-[10px] italic text-[#26241F]/50 font-medium">
            “La compatibilidad se calcula con tus preferencias y la información disponible. Los precios son referenciales.”
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
