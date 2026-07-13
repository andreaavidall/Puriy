import React from "react";

export default function Navbar() {
  return (
    <header className="w-full bg-[#F7F3EC] border-b border-[#E8E2D8]">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        {/* Left: Logo & Isotype */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#193D32] text-white">
            {/* Simple path/mountain isotype */}
            <svg
              className="w-5 h-5 stroke-current fill-none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 20l7-12 5 8 4-6" />
              <path d="M2 20h20" />
            </svg>
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#26241F]">
            Puriy
          </span>
        </div>

        {/* Center: Links */}
        <nav className="hidden lg:flex items-center gap-10">
          <a
            href="#"
            className="text-sm font-semibold text-[#26241F] hover:text-[#C96438] transition-colors"
          >
            Explorar
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-[#26241F] hover:text-[#C96438] transition-colors"
          >
            Experiencias
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-[#26241F] hover:text-[#C96438] transition-colors"
          >
            Guías
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-[#26241F] hover:text-[#C96438] transition-colors"
          >
            Inspiración
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-[#26241F] hover:text-[#C96438] transition-colors"
          >
            Acerca de
          </a>
        </nav>

        {/* Right: Favoritos & Action Button */}
        <div className="hidden md:flex items-center gap-6">
          <button
            className="flex items-center gap-2 text-sm font-semibold text-[#26241F] hover:text-[#C96438] transition-colors"
            type="button"
          >
            <svg
              className="w-5 h-5 fill-none stroke-current"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Favoritos
          </button>
          <button
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#193D32] hover:bg-[#31594A] text-white text-sm font-semibold shadow-sm transition-colors cursor-pointer"
            type="button"
          >
            Encuentra tu destino
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden">
          <button
            className="p-2 text-[#26241F] hover:bg-[#E8E2D8] rounded-lg"
            type="button"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
