import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F7F3EC] border-t border-[#E8E2D8] py-16 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand & Quote */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#193D32] text-white flex items-center justify-center">
              <svg
                className="w-4 h-4 stroke-current fill-none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 20l7-12 5 8 4-6" />
              </svg>
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-[#26241F]">
              Puriy
            </span>
          </div>
          <span className="text-xs text-[#26241F]/50 font-medium">
            © {new Date().getFullYear()} Puriy. Todos los derechos reservados.
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <a
            href="#"
            className="text-sm font-semibold text-[#26241F]/70 hover:text-[#C96438] transition-colors"
          >
            Explorar
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-[#26241F]/70 hover:text-[#C96438] transition-colors"
          >
            Experiencias
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-[#26241F]/70 hover:text-[#C96438] transition-colors"
          >
            Favoritos
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-[#26241F]/70 hover:text-[#C96438] transition-colors"
          >
            Fuentes de información
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-[#26241F]/70 hover:text-[#C96438] transition-colors"
          >
            Contacto
          </a>
        </div>

        {/* Final text */}
        <div className="text-center md:text-right">
          <p className="font-serif italic text-sm text-[#31594A] font-semibold">
            “Hecho para descubrir el Perú de otra manera.”
          </p>
        </div>

      </div>
    </footer>
  );
}
