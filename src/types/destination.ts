export interface Destination {
  id: string;
  nombre: string;
  descripcion: string;
  departamento: string;
  presupuesto: string; // 'bajo' | 'medio' | 'alto'
  dias_minimos: number;
  intereses: string[];
  acompanantes: string[];
  imagen: string;
}

export interface RecommendationResult {
  destino: Destination;
  compatibilityScore: number; // 0 - 100
  razones: string[]; // exactly 3 concrete reasons
  presupuestoAjustado: boolean;
  advertencia: string | null;
}
