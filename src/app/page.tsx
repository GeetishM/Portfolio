"use client";
import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      {loaded && (
        <main style={{ background: "#000", minHeight: "100vh" }}>
          <Navbar />
          <Hero />
          <Journey />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
      )}
      <style>{`
        @media (max-width: 768px) {
          main {
            overflow-x: hidden;
          }
        }
      `}</style>
    </>
  );
}