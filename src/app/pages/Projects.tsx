"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { data, dataTypes, formatDate } from "@/lib/project";
import { cn } from "@/lib/utils";
import RevealAnimation from "../components/RevealAnimation";
import TitleSection from "@/app/components/TitleSection";
import Margin from "../components/Margin";
import Image from "next/image";
import { Drawer } from "../components/Drawer";
import { useSectionRefs } from "../hooks/SectionRefContext";

export default function Projects() {
   const [selectedItem, setSelectedItem] = useState<dataTypes | null>(null);
   const { section3Ref } = useSectionRefs();

   return (
      <>
         <Margin ref={section3Ref} id="section3" className="bg-layer">
            <TitleSection title="Projects" description="My Creation" />
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:max-w-6xl lg:grid-cols-3">
               {data
                  .sort(
                     (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime(),
                  )
                  .map((item, i) => (
                     <RevealAnimation
                        key={i}
                        delay={0.25 + i * 0.05}
                        className="flex max-w-xl flex-col items-start justify-between"
                     >
                        <div className="relative grid w-full gap-y-4">
                           <RevealAnimation
                              delay={0.1}
                              className="group bg-darker relative z-10 overflow-hidden rounded-xl"
                           >
                              <RevealAnimation delay={0.15} className="w-full">
                                 <div className="translate-y-8 scale-[0.875]">
                                    {/* {isLoading && <ImgSkeleton />} */}
                                    <motion.div
                                       onClick={() => {
                                          setSelectedItem(item);
                                       }}
                                       whileHover={
                                          selectedItem ? {} : { rotate: 2 }
                                       }
                                       animate={{
                                          y: selectedItem === item ? 400 : 0,
                                       }}
                                       transition={{
                                          type: "spring",
                                          damping: 18,
                                          stiffness: 100,
                                          rotate: { duration: 0.2 },
                                       }}
                                       className={cn(
                                          "cursor-pointer overflow-hidden rounded-lg shadow-2xl/20",
                                       )}
                                    >
                                       <Image
                                          height={720}
                                          width={1280}
                                          src={`/images/${item.images}`}
                                          alt=""
                                          className="aspect-video object-cover"
                                       />
                                    </motion.div>
                                 </div>
                              </RevealAnimation>
                           </RevealAnimation>

                           <div className="">
                              <h3 className="text-xl leading-6 font-semibold">
                                 {item.title}
                              </h3>
                              <span className="text-secondary mr-1 text-sm font-medium text-nowrap">
                                 {formatDate(item.date)}
                              </span>
                           </div>

                           <div className="left-0 flex flex-wrap gap-x-2 gap-y-2 transition-all">
                              {item.languages.map((language, idx) => (
                                 <RevealAnimation
                                    key={idx}
                                    delay={0.25 + idx * 0.05}
                                 >
                                    <div className="bg-darker text-secondary flex items-center justify-center rounded-xl px-3.5 py-1.5 text-sm font-medium">
                                       {language.name}
                                    </div>
                                 </RevealAnimation>
                              ))}
                           </div>
                        </div>
                     </RevealAnimation>
                  ))}
            </div>
         </Margin>

         <Drawer
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
         />
      </>
   );
}
