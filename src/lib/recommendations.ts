import { Destination, RecommendationResult } from "../types/destination";
import { Preferences } from "../types/preferences";

// Inferred rhythms of the destinations
const RITMOS_INFERIDOS: Record<string, string[]> = {
  "machu-picchu": ["intenso", "equilibrado"],
  huacachina: ["relajado", "intenso"],
  paracas: ["relajado", "equilibrado"],
  "canon-del-colca": ["intenso", "equilibrado"],
};

// Numeric pricing references for destinations matching categories
const CATEGORY_PRICES: Record<string, { base: number; rec: number }> = {
  bajo: { base: 150, rec: 300 },
  medio: { base: 400, rec: 600 },
  alto: { base: 1000, rec: 1500 },
};

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function getNormalizedCompanion(companion: string): string {
  const norm = normalizeText(companion);
  if (norm === "sola" || norm === "solo") return "solo";
  return norm;
}

export function calculateRecommendation(
  destino: Destination,
  pref: Preferences
): RecommendationResult {
  let score = 0;
  const razones: string[] = [];
  let presupuestoAjustado = false;
  let advertencia: string | null = null;

  // 1. PRESUPUESTO (35 puntos)
  const priceRange = CATEGORY_PRICES[destino.presupuesto.toLowerCase()] || { base: 200, rec: 400 };
  if (pref.presupuesto >= priceRange.rec) {
    score += 35;
    razones.push("Entra dentro de tu presupuesto.");
  } else if (pref.presupuesto >= priceRange.base) {
    score += 20;
    presupuestoAjustado = true;
    razones.push("Ajustado a tu presupuesto disponible.");
    advertencia = "El presupuesto es algo ajustado para este destino. Considera llevar un presupuesto adicional.";
  } else {
    score += 0;
    presupuestoAjustado = true;
    razones.push("Excede tu presupuesto planificado.");
    advertencia = "Tu presupuesto estimado es menor al mínimo sugerido para este destino.";
  }

  // 2. DÍAS (20 puntos)
  if (pref.dias >= destino.dias_minimos) {
    score += 20;
    razones.push("Coincide con los días que tienes.");
  } else {
    score += 0;
    razones.push("Requiere más días de los disponibles.");
  }

  // 3. INTERESES (25 puntos)
  const destInteresesNorm = destino.intereses.map(normalizeText);
  const prefInteresesNorm = pref.intereses.map(normalizeText);
  
  // Find matching interests
  const matches = prefInteresesNorm.filter((pi) =>
    destInteresesNorm.some((di) => di.includes(pi) || pi.includes(di))
  );

  const interestScore = pref.intereses.length > 0 
    ? (matches.length / pref.intereses.length) * 25 
    : 0;
  
  score += Math.round(interestScore);

  if (matches.length > 0) {
    razones.push(`Tiene experiencias de ${matches.slice(0, 2).join(" y ")}.`);
  } else {
    razones.push(`Ofrece experiencias de ${destino.intereses.slice(0, 2).join(" y ")}.`);
  }

  // 4. ACOMPAÑANTE (10 puntos)
  const userAcompNorm = getNormalizedCompanion(pref.acompanante);
  const destAcompNorm = destino.acompanantes.map(normalizeText);

  if (destAcompNorm.includes(userAcompNorm)) {
    score += 10;
  }
  
  // Translate to Spanish reader-friendly reason
  const companionLabel = pref.acompanante.toLowerCase();
  if (companionLabel === "sola") {
    razones.push("Es ideal para viajar de forma independiente.");
  } else if (companionLabel === "pareja") {
    razones.push("Es perfecto para una escapada en pareja.");
  } else {
    razones.push(`Es ideal para viajar con ${companionLabel}.`);
  }

  // 5. RITMO (10 puntos)
  const userRitmoNorm = normalizeText(pref.ritmo);
  const destRitmos = RITMOS_INFERIDOS[destino.id] || ["equilibrado"];
  if (destRitmos.includes(userRitmoNorm)) {
    score += 10;
  } else {
    score += 5; // Partial match points
  }

  // Ensure exactly 3 reasons are returned by taking the top 3 most positive ones
  const finalRazones = razones.slice(0, 3);
  if (finalRazones.length < 3) {
    finalRazones.push(`Ubicado en el departamento de ${destino.departamento}.`);
  }

  return {
    destino,
    compatibilityScore: Math.min(100, score),
    razones: finalRazones,
    presupuestoAjustado,
    advertencia,
  };
}
