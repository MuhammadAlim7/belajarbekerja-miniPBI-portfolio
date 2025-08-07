"use client";
import React from "react";
import Margin from "../components/Margin";
import TitleSection from "../components/TitleSection";
import RevealAnimation from "../components/RevealAnimation";
import { cn } from "@/lib/utils";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { useSectionRefs } from "../hooks/SectionRefContext";

const contact = [
   {
      name: "Intstagram",
      Icon: Instagram,
      href: "https://ig.me/m/muhammadnuralim7",
   },
   {
      name: "Linkedin",
      Icon: Linkedin,
      href: "https://www.linkedin.com/in/limm7/",
   },
   { name: "Github", Icon: Github, href: "https://github.com/MuhammadAlim7" },
   {
      name: "Fesnuk",
      Icon: Facebook,
      href: "https://www.facebook.com/groups/1032515944638255/user/100080939434916?locale=id_ID",
   },
];

export default function Contact() {
   const { section4Ref } = useSectionRefs();
   return (
      <Margin ref={section4Ref} id="section4" className="h-full">
         <TitleSection title="Contact" description="Get in Touch" />
         <div className="flex w-full flex-col gap-y-4 md:text-center">
            <div className="">
               <div className="flex flex-wrap items-center gap-2 sm:justify-center">
                  {contact.map((data, index) => {
                     return (
                        <RevealAnimation
                           direction="up"
                           delay={0.25 + index * 0.05}
                           key={index}
                        >
                           <IconButton
                              href={data.href}
                              className="bg-layer text-foreground s flex items-center gap-1 rounded-full border sm:px-6 sm:py-5 sm:text-4xl"
                           >
                              <data.Icon className="mx-1 size-5 sm:size-10" />
                              {data.name}
                           </IconButton>
                        </RevealAnimation>
                     );
                  })}
               </div>
            </div>
         </div>
      </Margin>
   );
}
interface IconButtonProps {
   className: string;
   href?: string;
   children: React.ReactNode;
}

function IconButton({ className, href, children }: IconButtonProps) {
   return (
      <Link
         href={href as string}
         target="_blank"
         rel="noopener noreferrer"
         className={cn(
            "border-glassy text-foreground rounded-md border p-2 text-lg font-semibold",
            className,
         )}
      >
         {children}
      </Link>
   );
}
