"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Github, X, LucideProps } from "lucide-react";
import { dataTypes, formatDate } from "@/lib/project";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Url } from "next/dist/shared/lib/router/router";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { Drawer as Vaul } from "vaul";

interface DrawerProps {
   selectedItem: dataTypes | null;
   setSelectedItem: React.Dispatch<React.SetStateAction<dataTypes | null>>;
}

export const Drawer = ({
   selectedItem: data,
   setSelectedItem,
}: DrawerProps) => {
   const snapPoints = ["355px", 1];
   const isDesktop = useMediaQuery("(min-width: 768px)");
   const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

   function handleClose() {
      document.body.removeAttribute("style");
      setSelectedItem(null);
   }

   if (isDesktop) {
      if (data) document.body.style.overflow = "hidden";

      return (
         <AnimatePresence>
            {data && (
               <div className="fixed inset-0 z-50 flex items-center justify-center">
                  {/* Backdrop */}
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{
                        ease: "easeInOut",
                        duration: 0.4,
                     }}
                     className="absolute inset-0 bg-black/40 backdrop-blur-md"
                     onClick={handleClose}
                  />

                  {/* Modal Content */}
                  <motion.div
                     initial={{ opacity: 0, y: 450, scale: 0.99 }}
                     animate={{ opacity: 1, y: 0, scale: 1.0 }}
                     exit={{ opacity: 0, y: 450, scale: 0.99 }}
                     transition={{
                        type: "spring",
                        damping: 14,
                        stiffness: 100,
                     }}
                     className="bg-background relative mx-4 h-5/6 w-full max-w-6xl overflow-hidden rounded-xl shadow-xl"
                  >
                     {/* Close Button */}
                     <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-10 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                        aria-label="Close modal"
                     >
                        <X className="h-5 w-5" />
                     </button>

                     {/* Modal Body */}
                     <div className="flex h-full flex-col md:flex-row">
                        {/* Left Side - Image */}
                        <div className="md:w-5/8">
                           <div className="relative size-full bg-black">
                              <Image
                                 src={`/images/${data.images}`}
                                 alt=""
                                 className="size-full object-contain"
                                 fill
                              />
                           </div>
                        </div>

                        {/* Right Side - Content */}
                        <div className="border-outline flex h-full flex-col justify-center border-l p-8 md:w-3/8">
                           <div className="flex h-full flex-col">
                              {/* Title */}
                              <h2 className="text-3xl font-bold">
                                 {data.title}
                              </h2>
                              <span className="text-secondary mr-1 mb-6 text-sm font-medium text-nowrap">
                                 {formatDate(data.date)}
                              </span>

                              {/* Description */}
                              <div className="scrollbar-hidden mb-6 flex-1 overflow-y-auto">
                                 <p className="text-secondary mb-4 leading-relaxed">
                                    {data.description}
                                 </p>
                              </div>
                              {/* Additional Info */}
                              <div className=" ">
                                 <div className="0 flex flex-wrap text-sm">
                                    <span className="mr-1 font-medium text-nowrap">
                                       Tech Stack:
                                    </span>
                                    {data.languages.map((language, index) => (
                                       <span
                                          key={index}
                                          className="text-secondary"
                                       >
                                          {language.name}
                                          {index < data.languages.length - 1 &&
                                             ", "}
                                       </span>
                                    ))}
                                 </div>
                              </div>
                              {/* Action Buttons */}
                              <div className="flex flex-row gap-3 pt-4">
                                 <ActionButton
                                    href={data.sourcecode}
                                    icon={Github}
                                    title="Source Code"
                                    className="bg-gray-900 text-white hover:bg-gray-800"
                                 />
                                 <ActionButton
                                    href={data.livedemo}
                                    icon={LogOut}
                                    title="Live Demo"
                                    className="border-glassy border"
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>
      );
   }

   const open = data !== null;

   return (
      <Vaul.Root
         snapPoints={snapPoints}
         activeSnapPoint={snap}
         setActiveSnapPoint={setSnap}
         open={open}
         onOpenChange={handleClose}
      >
         <Vaul.Overlay className="fixed inset-0 z-30 bg-black/40 backdrop-blur-2xl" />
         <Vaul.Portal>
            <Vaul.Content
               data-testid="content"
               className="border-b-none bg-background border-glassy fixed right-0 bottom-0 left-0 z-30 mx-[-1px] flex h-full max-h-[97%] flex-col rounded-t-[10px] border"
            >
               <div
                  aria-hidden
                  className="bg-outline mx-auto mt-2 h-[3px] w-28 flex-shrink-0 rounded-full"
               />
               <div
                  className={cn(
                     "mx-auto flex w-full max-w-md flex-col p-4 pt-5",
                     {
                        "overflow-y-auto": snap === 1,
                        "overflow-hidden": snap !== 1,
                     },
                  )}
               >
                  <div className="size-full">
                     {data ? (
                        <Image
                           src={`/images/${data.images}`}
                           alt=""
                           className="size-full rounded-lg object-contain"
                           height={720}
                           width={1280}
                        />
                     ) : (
                        <div className="bg-layer size-full rounded-lg object-contain" />
                     )}
                  </div>

                  <Vaul.Title className="mt-2 text-2xl font-bold">
                     {data && data.title}
                  </Vaul.Title>
                  <span className="text-secondary mr-1 mb-4 text-sm font-medium text-nowrap">
                     {data && formatDate(data.date)}
                  </span>

                  <p className="text-secondary mb-4 text-sm leading-relaxed">
                     {data?.description}
                  </p>

                  <div className="0 mb-4 flex flex-wrap text-sm">
                     <span className="mr-1 font-medium text-nowrap">
                        Tech Stack:
                     </span>
                     {data?.languages.map((language, index) => (
                        <span key={index} className="text-secondary">
                           {language.name}
                           {index < data.languages.length - 1 && ", "}
                        </span>
                     ))}
                  </div>
                  <div className="flex flex-row gap-3">
                     {data && (
                        <>
                           <ActionButton
                              href={data.sourcecode}
                              icon={Github}
                              title="Source Code"
                              className="bg-gray-900 text-white hover:bg-gray-800"
                           />
                           <ActionButton
                              href={data.livedemo}
                              icon={LogOut}
                              title="Live Demo"
                              className="border-glassy border"
                           />
                        </>
                     )}
                  </div>
               </div>
            </Vaul.Content>
         </Vaul.Portal>
      </Vaul.Root>
   );
};

interface ActionButtonProps {
   icon?: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
   >;
   title?: string;
   className?: string;
}

function ActionButton({
   href,
   className,
   icon: Icon,
   title,
}: ActionButtonProps & React.ComponentProps<"link">) {
   return (
      <Link
         href={href as Url}
         target="_blank"
         rel="noopener noreferrer"
         onClick={(e) => {
            href == "" ? e.preventDefault() : {};
         }}
         title={href == "" ? "Coming Soon" : title}
         className={cn(
            "flex items-center gap-1 rounded-lg px-2 py-2 text-xs font-medium transition-colors",
            href == "" ? "cursor-not-allowed" : "cursor-pointer",
            className,
         )}
      >
         {Icon && <Icon size={18} />}
         {title}
      </Link>
   );
}
