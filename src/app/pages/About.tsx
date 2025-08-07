"use client";
import React from "react";
import TitleSection from "../components/TitleSection";
import { skilldata } from "@/lib/skill";
import RevealAnimation from "../components/RevealAnimation";
import { motion } from "motion/react";
import Margin from "../components/Margin";
import { useSectionRefs } from "../hooks/SectionRefContext";

export default function About() {
   const { section2Ref } = useSectionRefs();
   return (
      <Margin ref={section2Ref} id="section2" className="bg-layer">
         <TitleSection title="Skills" description="Keahlian" />
         <div className="mx-auto max-w-2xl transition-all duration-300 lg:max-w-6xl">
            <article className="grid auto-rows-fr grid-cols-1 gap-x-8 gap-y-8 transition-all duration-300 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4 lg:gap-y-8">
               {skilldata.map((data, i) => (
                  <RevealAnimation
                     key={i}
                     delay={0.25 + i * 0.05}
                     className="h-full w-full"
                  >
                     <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{
                           type: "spring",
                           mass: 0.1,
                           stiffness: 150,
                           damping: 12,
                        }}
                        className="bg-background border-glassy h-full w-full rounded-lg border p-6 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] backdrop-blur-sm"
                     >
                        <div className="flex gap-6 lg:flex-col">
                           <div>
                              <data.icon
                                 className="fill-foreground h-12 w-12 lg:h-16 lg:w-16"
                                 style={{
                                    filter:
                                       "drop-shadow(5px -5px 40px var(--foreground))",
                                 }}
                              />
                           </div>
                           <div className="my-auto">
                              <a>
                                 <h5 className="text-xl font-semibold tracking-tight sm:text-lg">
                                    {data.title}
                                 </h5>
                              </a>
                           </div>
                        </div>
                        <p className="text-secondary mt-6 text-sm font-normal lg:mt-4">
                           {data.description}
                        </p>
                     </motion.div>
                  </RevealAnimation>
               ))}
            </article>
         </div>
      </Margin>
   );
}
