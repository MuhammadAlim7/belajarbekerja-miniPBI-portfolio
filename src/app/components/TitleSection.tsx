import React from "react";
import { cn } from "@/lib/utils";
import RevealAnimation from "./RevealAnimation";

interface SectionTittleProps {
   title: string;
   description: string;
}

export default function TitleSection({
   title,
   description,
   className,
}: SectionTittleProps & React.ComponentProps<"div">) {
   return (
      <div
         className={cn(
            "grid max-w-2xl gap-y-1 sm:mx-auto sm:text-center",
            className,
         )}
      >
         <RevealAnimation>
            <h2 className="text-secondary text-lg font-medium">{title}</h2>
         </RevealAnimation>
         <RevealAnimation>
            <p className="text-3xl font-bold tracking-tight">{description}</p>
         </RevealAnimation>
      </div>
   );
}
