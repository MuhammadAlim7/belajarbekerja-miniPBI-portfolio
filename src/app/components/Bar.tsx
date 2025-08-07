"use client";
import React, { useEffect, useRef, useState } from "react";
import {
   AnimatePresence,
   motion,
   MotionValue,
   useMotionValue,
   useSpring,
   useTransform,
} from "motion/react";
import {
   Code,
   Home,
   Moon,
   Sun,
   LucideProps,
   User,
   File,
   MessageSquareMore,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useSectionRefs } from "../hooks/SectionRefContext";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";

export default function Bar() {
   const [mounted, setMounted] = useState(false);
   const { theme, setTheme } = useTheme();
   const { section1Ref, section2Ref, section3Ref, section4Ref } =
      useSectionRefs();

   const handleScroll = (
      ref: React.RefObject<HTMLElement> | React.RefObject<null>,
   ) => {
      ref?.current?.scrollIntoView({ behavior: "smooth" });
   };

   const mouseX = useMotionValue(Infinity);
   const ThemeIcon = theme === "dark" ? Moon : Sun;
   const ThemeName = theme === "dark" ? "Dark" : "Light";

   const navigations = [
      { name: "Home", href: section1Ref, Icon: Home },
      { name: "About", href: section2Ref, Icon: User },
      { name: "Projects", href: section3Ref, Icon: Code },
      { name: "Contact", href: section4Ref, Icon: MessageSquareMore },
   ];

   const handleDownloadAndOpen = () => {
      const fileUrl = "/doc/resume.pdf";

      // 1. Download file dulu
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "resume.pdf"; // paksa browser download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 2. Buka file di tab baru (opsional)
      setTimeout(() => {
         window.open(fileUrl, "_blank");
      }, 100); // kasih delay dikit biar download jalan dulu
   };
   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) return null;

   return (
      <header className="fixed inset-x-0 top-0 z-20">
         <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{
               type: "spring",
               mass: 0.1,
               stiffness: 150,
               damping: 12,
               delay: 2,
            }}
            className="relative z-50 mx-auto max-w-4xl px-6 lg:px-8"
         >
            <div className="relative mx-auto flex w-full items-center">
               <motion.nav
                  onMouseMove={(e) => mouseX.set(e.pageX)}
                  onMouseLeave={() => mouseX.set(Infinity)}
                  className="border-glassy mx-auto my-5 flex items-center gap-1 rounded-full border p-1 px-4 backdrop-blur-lg"
               >
                  {navigations.map((nav) => (
                     <DockIcon
                        key={nav.name}
                        mouseX={mouseX}
                        onClick={() => {
                           handleScroll(nav.href);
                        }}
                     >
                        <IconWithTooltip name={nav.name} Icon={nav.Icon} />
                     </DockIcon>
                  ))}
                  <div className="bg-glassy mx-2 h-6 w-px rounded-full" />

                  <DockIcon mouseX={mouseX} onClick={handleDownloadAndOpen}>
                     <IconWithTooltip name="Resume" Icon={File} />
                  </DockIcon>

                  <div className="bg-glassy mx-2 h-6 w-px rounded-full" />

                  <DockIcon
                     mouseX={mouseX}
                     onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                     }
                  >
                     <IconWithTooltip name={ThemeName} Icon={ThemeIcon} />
                  </DockIcon>
               </motion.nav>
            </div>
         </motion.div>
      </header>
   );
}

interface DockIconProps {
   children: React.ReactNode;
   mouseX: MotionValue<number>;
   onClick?: () => void;
   href?: string;
}

const DockIcon = ({ children, mouseX, onClick }: DockIconProps) => {
   const ref = useRef<HTMLDivElement>(null);
   const isDesktop = useMediaQuery("(min-width: 768px)");

   const distanceCalc = useTransform(mouseX, (val) => {
      const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
      return val - bounds.x - bounds.width / 2;
   });

   const DEFAULT_ICON_SIZE = 40;
   const MAGNIFIED_ICON_SIZE = 60;
   const DISTANCE = 140;

   const widthSync = useTransform(
      distanceCalc,
      [-DISTANCE, 0, DISTANCE],
      [DEFAULT_ICON_SIZE, MAGNIFIED_ICON_SIZE, DEFAULT_ICON_SIZE],
   );

   const width = useSpring(widthSync, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
   });

   return (
      <motion.div
         ref={ref}
         style={{ width: isDesktop ? width : "" }}
         className="flex cursor-pointer items-center justify-center"
         onClick={onClick}
      >
         {children}
      </motion.div>
   );
};

interface IconWithTooltipProps {
   name: string;
   Icon: React.ComponentType<LucideProps>;
}

const IconWithTooltip = ({ name, Icon }: IconWithTooltipProps) => {
   const [isHovered, setIsHovered] = useState(false);

   return (
      <div
         className="relative"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <AnimatePresence>
            {isHovered && (
               <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0 }}
                  className="bg-foreground text-background absolute top-full left-1/2 mt-2 -translate-x-1/2 transform rounded-md px-2 py-1 text-xs font-medium shadow-sm"
               >
                  {name}
               </motion.div>
            )}
         </AnimatePresence>
         <div className="hover:bg-backgroundalt rounded-full p-3 transition-colors">
            <Icon className="size-4.5" />
         </div>
      </div>
   );
};
