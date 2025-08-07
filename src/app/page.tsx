import Hero from "@/app/pages/Hero";
import Background from "@/app/components/Background";
import Bar from "@/app/components/Bar";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

export default function Home() {
   return (
      <main>
         <Background />
         <Hero />
         <About />
         <Bar />
         <Projects />
         <Contact />
      </main>
   );
}
