import React, { useEffect, useRef, useState } from "react";
import AboutMe from "./components/AboutMe";
import Travels from "./components/Travels";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  const scrollContainerRef = useRef(null);
  const horizontalRef = useRef(null);
  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(true);
  const [showAboutDescription, setShowAboutDescription] = useState(false);
  const lastWidthRef = useRef(window.innerWidth);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    const handleScroll = () => {
      const y = window.scrollY;
      const panelWidth = window.innerWidth;
      const nearestIndex = Math.round(y / panelWidth);

      if (horizontalRef.current) {
        horizontalRef.current.style.transform = `translateX(-${y}px)`;
      }

      if (menuRef.current) {
        if (nearestIndex === 0) {
          menuRef.current.style.opacity = "1";
          menuRef.current.style.transform = "translateY(0px)";
        } else {
          menuRef.current.style.opacity = "0";
          menuRef.current.style.transform = "translateY(200px)";
        }
      }

      clearTimeout(window._snapTimeout);
      window._snapTimeout = setTimeout(() => {
        const targetY = nearestIndex * panelWidth;
        const distance = Math.abs(targetY - y);
        if (distance > 8) {
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }, 180);
    };

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const currentIndex = Math.round(window.scrollY / currentWidth);
      if (currentIndex !== 0 || currentWidth !== lastWidthRef.current) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      lastWidthRef.current = currentWidth;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToSection = (index) => {
    const y = index * window.innerWidth;
    window.scrollTo({ top: y, behavior: "smooth" });
    if (index === 0) {
      setShowAboutDescription((prev) => !prev);
    } else {
      setShowAboutDescription(false);
    }
  };

  return (
    <>
      <div className="scroll-track" style={{ height: `${4 * window.innerWidth}px` }}></div>

      <div className="horizontal-wrapper" ref={horizontalRef}>
        <section className="panel">
          <AboutMe showDescription={showAboutDescription} />
        </section>
        <section className="panel travels-container">
          <Travels />
        </section>
        <section className="panel">
          <Projects />
        </section>
        <section className="panel">
          <Contact />
        </section>
      </div>

      <div
        className="menu-links"
        ref={menuRef}
        style={{ pointerEvents: "auto" }}
      >
        <div className="menu-word" onClick={() => scrollToSection(0)}>about me</div>
        <div className="menu-word" onClick={() => scrollToSection(1)}>travels</div>
        <div className="menu-word" onClick={() => scrollToSection(2)}>projects</div>
        <div className="menu-word" onClick={() => scrollToSection(3)}>contact</div>
      </div>
    </>
  );
}

export default App;