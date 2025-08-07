import { cn } from "@/lib/utils";
import React from "react";

export default function Margin({
   children,
   className,
   ...props
}: React.ComponentProps<"section">) {
   return (
      <section
         className={cn("relative z-10 py-24 sm:py-32", className)}
         {...props}
      >
         <div className="mx-auto grid max-w-7xl gap-y-16 px-6 sm:gap-y-20 lg:gap-y-24 lg:px-8">
            {children}
         </div>
      </section>
   );
}
