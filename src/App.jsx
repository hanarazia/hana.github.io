import React, { useEffect, useRef, useState } from "react";
import AboutMe from "./components/AboutMe";
import Travels from "./components/Travels";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  const horizontalRef = useRef(null);
  const menuRef = useRef(null);

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const [isMobile, setIsMobile] = useState(() => {
    return window.innerWidth <= 768 || isTouchDevice || isSafari;
  });

  const [showAboutDescription, setShowAboutDescription] = useState(false);

  useEffect(() => {
    if (isSafari) {
      document.body.classList.add("safari");
    }

    const checkIsMobile = () => {
      const updatedMobile = window.innerWidth <= 768 || isTouchDevice || isSafari;
      setIsMobile(updatedMobile);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    const handleMobileScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (isMobile && menuRef.current) {
        if (scrollY < viewportHeight * 0.8) {
          menuRef.current.style.opacity = "1";
          menuRef.current.style.transform = "translateY(0)";
        } else {
          menuRef.current.style.opacity = "0";
          menuRef.current.style.transform = "translateY(200px)";
        }
      }
    };

    if (!isMobile) {
      const handleScroll = () => {
        const y = window.scrollY;
        const panelWidth = window.innerWidth;
        const nearestIndex = Math.min(3, Math.round(y / panelWidth));

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
        window.scrollTo({ top: 0, behavior: "auto" });
        const scrollTrack = document.querySelector('.scroll-track');
        if (scrollTrack) scrollTrack.style.height = `${4 * window.innerWidth}px`;

        if (window.innerWidth <= 768) {
          document.getElementById("panel-0")?.scrollIntoView({ behavior: "auto" });
        }
      };

      handleResize();
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    } else {
      window.addEventListener("scroll", handleMobileScroll);
      return () => {
        window.removeEventListener("resize", checkIsMobile);
        window.removeEventListener("scroll", handleMobileScroll);
      };
    }
  }, [isMobile]);

  const scrollToSection = (index) => {
    if (!isMobile) {
      const y = index * window.innerWidth;
      window.scrollTo({ top: y, behavior: "smooth" });

      if (index === 0) {
        setShowAboutDescription(prev => !prev);
      } else {
        setShowAboutDescription(false);
      }
    } else {
      const element = document.getElementById(`panel-${index}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });

        if (index === 0) {
          setShowAboutDescription(prev => !prev);
        } else {
          setShowAboutDescription(false);
        }
      }
    }
  };

  return (
    <>
      {!isMobile && (
        <div className="scroll-track" style={{ height: `${4 * window.innerWidth}px` }}></div>
      )}

      <div
        className={isMobile ? "vertical-wrapper" : "horizontal-wrapper"}
        ref={horizontalRef}
      >
        <section className="panel" id="panel-0">
          <AboutMe showDescription={showAboutDescription} />
        </section>
        <section className="panel travels-container" id="panel-1">
          <Travels />
        </section>
        <section className="panel" id="panel-2">
          <Projects />
        </section>
        <section className="panel" id="panel-3">
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
