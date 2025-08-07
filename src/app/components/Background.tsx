"use client";

import { useEffect, useState } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";
import { Particle } from "@/lib/Particle";

export default function Background() {
   const [mounted, setMounted] = useState(false);
   const { theme } = useTheme();
   const configuration = Particle();

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) return null;

   async function loadParticles() {
      await loadSlim(tsParticles); // load the slim version
      const container = await tsParticles.load({
         id: "particles",
         options: configuration,
      });
      container?.loadTheme?.(theme);
   }

   loadParticles();

   return (
      <div
         id="particles"
         className="fixed inset-0 -z-9999 h-screen w-full overflow-visible bg-cover bg-center bg-no-repeat"
      />
   );
}
