"use client";
import { createContext, RefObject, useContext, useRef } from "react";

type SectionRefs = {
   section1Ref: RefObject<HTMLElement> | RefObject<null>;
   section2Ref: RefObject<HTMLElement> | RefObject<null>;
   section3Ref: RefObject<HTMLElement> | RefObject<null>;
   section4Ref: RefObject<HTMLElement> | RefObject<null>;
};

// Kalau nilai default-nya null
export const SectionRefContext = createContext<SectionRefs | null>(null);

export const SectionRefProvider = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   const section1Ref = useRef(null);
   const section2Ref = useRef(null);
   const section3Ref = useRef(null);
   const section4Ref = useRef(null);

   return (
      <SectionRefContext.Provider
         value={{
            section1Ref,
            section2Ref,
            section3Ref,
            section4Ref,
         }}
      >
         {children}
      </SectionRefContext.Provider>
   );
};

// Custom hook biar lebih clean
export const useSectionRefs = () => {
   const context = useContext(SectionRefContext);
   if (!context) {
      throw new Error(
         "useSectionRefs must be used within a SectionRefProvider",
      );
   }
   return context;
};
