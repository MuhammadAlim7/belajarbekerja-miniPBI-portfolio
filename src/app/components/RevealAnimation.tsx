"use client";

import {
   AnimatePresence,
   motion,
   useInView,
   UseInViewOptions,
   Variants,
} from "motion/react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

type MarginType = UseInViewOptions["margin"];

interface BlurFadeProps {
   id?: string;
   children: React.ReactNode;
   className?: string;
   variant?: {
      hidden: { y: number };
      visible: { y: number };
   };
   delay?: number;
   offset?: number;
   direction?: "up" | "down" | "left" | "right";
   inView?: boolean;
   inViewMargin?: MarginType;
   blur?: string;
   atOnce?: boolean | undefined;
}

export default function RevealAnimation({
   id,
   children,
   className,
   variant,
   delay = 0,
   offset = 75,
   direction = "up",
   inView = true,
   inViewMargin = "-50px",
   blur = "6px",
   atOnce = true,
}: BlurFadeProps) {
   const ref = useRef(null);
   const inViewResult = useInView(ref, { once: atOnce, margin: inViewMargin });
   const isInView = !inView || inViewResult;
   const defaultVariants: Variants = {
      hidden: {
         ...(direction === "left" || direction === "right"
            ? { x: direction === "right" ? -offset : offset }
            : { y: direction === "down" ? -offset : offset }),
         opacity: 0,
         filter: `blur(${blur})`,
         transition: {
            delay: 0,
         },
      },
      visible: {
         [direction === "left" || direction === "right" ? "x" : "y"]: 0,
         opacity: 1,
         filter: "blur(0px)",
      },
   };
   const combinedVariants = variant || defaultVariants;
   return (
      <AnimatePresence>
         <motion.div
            id={id}
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
            variants={combinedVariants}
            transition={{
               delay: 0.04 + delay,
               type: "spring",
               damping: 15.5,
               stiffness: 110,
               filter: { delay: 0.04 + delay, duration: 0.4, ease: "easeOut" },
            }}
            className={cn("", className)}
         >
            {children}
         </motion.div>
      </AnimatePresence>
   );
}
