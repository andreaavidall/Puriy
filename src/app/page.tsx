import React from "react";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      {/* Decorative background grid and gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_50%_10%),#fff_40%,#fed7aa_70%,#ffedd5_100%] dark:bg-[radial-gradient(120%_120%_at_50%_10%),#09090b_50%,#2d1b10_80%,#431407_100%]" />
      
      {/* Glowing accent lights */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/20 blur-[100px] dark:bg-orange-600/10" />
      <div className="absolute bottom-10 left-10 -z-10 h-96 w-96 rounded-full bg-rose-500/10 blur-[120px] dark:bg-rose-900/5" />

      {/* Main Container */}
      <div className="w-full max-w-xl text-center">
        {/* Peruvian Sun Icon / Logo */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 p-0.5 shadow-xl shadow-amber-500/10 dark:shadow-orange-950/20 animate-fade-in">
          <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white dark:bg-zinc-950">
            <svg
              className="h-10 w-10 text-amber-500 dark:text-orange-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              {/* Custom abstract sun & mountain path */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 20l4-6 3 4 5-8 3 5"
              />
            </svg>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="bg-gradient-to-b from-zinc-900 via-zinc-850 to-zinc-700 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent dark:from-white dark:via-zinc-100 dark:to-zinc-400 sm:text-7xl">
          Puriy
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg leading-8 text-zinc-650 dark:text-zinc-350 font-medium sm:text-xl">
          Descubre el Perú según tu presupuesto
        </p>

        {/* CTA Button */}
        <div className="mt-10 flex items-center justify-center">
          <button
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-zinc-900 px-8 py-4 text-sm font-semibold text-white shadow-md transition-all duration-305 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-orange-950/20 active:scale-95"
            type="button"
          >
            <span>Descubrir destinos</span>
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-amber-500/10 to-rose-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-center text-xs text-zinc-400 dark:text-zinc-600">
        Puriy © {new Date().getFullYear()} — Explora los tesoros del Perú
      </footer>
    </div>
  );
}
