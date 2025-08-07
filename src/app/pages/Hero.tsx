"use client";

import React from "react";
import { cn } from "@/lib/utils";
import RevealAnimation from "../components/RevealAnimation";
import { useSectionRefs } from "../hooks/SectionRefContext";

export default function Hero() {
   const { section1Ref } = useSectionRefs();
   return (
      <section
         ref={section1Ref}
         id="section1"
         className="z-10 h-screen px-6 pt-14 lg:px-8"
      >
         <div className="z-10 mx-auto flex h-full max-w-2xl py-48 md:items-center md:py-0">
            <div className="flex flex-col gap-y-4 md:text-center">
               <div className="">
                  <RevealAnimation>
                     <div className="flex items-center md:justify-center">
                        <RevealAnimation>
                           <a className="relative z-10 text-5xl leading-[0.8] font-extrabold sm:text-6xl">
                              Hi! I'm
                           </a>
                        </RevealAnimation>

                        <RevealAnimation direction="right" delay={0.5}>
                           <IconButton className="bg-foreground text-background sm:align-[12px]text-xl ml-2 flex items-center gap-1 rounded-full px-2.5 py-1.5 text-center align-[8px] font-semibold sm:px-5 sm:py-2.5 sm:text-3xl">
                              Frontend-Web Dev
                           </IconButton>
                        </RevealAnimation>
                     </div>
                  </RevealAnimation>
                  <RevealAnimation>
                     <div className="flex flex-wrap gap-x-2 text-5xl leading-none font-extrabold sm:text-6xl md:justify-center">
                        {/* Muhammad Nur Alim */}
                        <RevealAnimation delay={0.1}>Muhammad</RevealAnimation>
                        <RevealAnimation delay={0.15}>Nur</RevealAnimation>
                        <RevealAnimation delay={0.2}>Alim</RevealAnimation>
                     </div>
                  </RevealAnimation>
               </div>
               <RevealAnimation delay={0.3}>
                  <p className="font text-secondary line-clamp-4 text-lg leading-8 font-medium">
                     Haloo aku lim, aku seorang frontend web developer. aku
                     mahasiswa ekonomi tapi juga bisa ngoding hehe.. 😎
                  </p>
               </RevealAnimation>
            </div>
         </div>
      </section>
   );
}

function IconButton({ className, ...props }: React.ComponentProps<"button">) {
   return (
      <button
         className={cn(
            "border-glassy text-foreground rounded-md border p-2 text-sm font-semibold",
            className,
         )}
         {...props}
      ></button>
   );
}
