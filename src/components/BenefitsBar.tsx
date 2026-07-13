import React from "react";

export default function BenefitsBar() {
  const benefits = [
    { title: "Información real y actualizada", icon: "✨" },
    { title: "Datos abiertos y fuentes oficiales", icon: "📊" },
    { title: "Planifica según tu presupuesto", icon: "💵" },
    { title: "Viaja responsablemente y apoya lo local", icon: "🌿" },
  ];

  return (
    <section className="w-full bg-[#C96438] text-white py-12 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl flex flex-col xl:flex-row items-center justify-between gap-10">
        
        {/* Left Side: 4 Benefits */}
        <div className="w-full xl:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <span className="text-xl flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                {benefit.icon}
              </span>
              <span className="text-sm font-semibold tracking-wide leading-snug">
                {benefit.title}
              </span>
            </div>
          ))}
        </div>

        {/* Divider for larger screens */}
        <div className="hidden xl:block w-px h-16 bg-white/20" />

        {/* Right Side: Quote */}
        <div className="w-full xl:w-4/12 text-center xl:text-left">
          <p className="font-serif italic text-lg md:text-xl font-normal leading-relaxed text-[#F7F3EC]">
            “El mejor viaje no siempre es el más caro, sino el que mejor encaja contigo.”
          </p>
        </div>

      </div>
    </section>
  );
}
