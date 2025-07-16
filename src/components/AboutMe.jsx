import React, { useEffect, useState } from "react";

const AboutMe = ({ showDescription }) => {
  const fullText = [
    "UCSC Computer Science graduate with a minor in Language Studies.",
    "Passionate about research, design, and cultural exchange.",
    "Hoping to pursue a career as a Software Engineer or Technical Product Manager!",
  ];

  const [typedLines, setTypedLines] = useState(["", "", ""]);
  const [cursorAt, setCursorAt] = useState("title"); // "title" or "desc"
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const typeText = async () => {
      setTyping(true);
      setCursorAt("desc");

      let output = ["", "", ""];

      for (let i = 0; i < fullText.length; i++) {
        for (let j = 0; j < fullText[i].length; j++) {
          if (!isMounted) return;
          output[i] += fullText[i][j];
          setTypedLines([...output]);
          await new Promise((r) => setTimeout(r, 20));
        }
      }

      setTyping(false);
    };

    const deleteText = async () => {
      setTyping(true);
      let output = [...typedLines];

      for (let i = fullText.length - 1; i >= 0; i--) {
        while (output[i].length > 0) {
          if (!isMounted) return;
          output[i] = output[i].slice(0, -1);
          setTypedLines([...output]);
          await new Promise((r) => setTimeout(r, 10));
        }
      }

      setCursorAt("title");
      setTyping(false);
    };

    if (showDescription) {
      typeText();
    } else {
      deleteText();
    }

    return () => {
      isMounted = false;
    };
  }, [showDescription]);

  return (
    <div className="about-me">
      <div className="about-me-content">
      <h1>
        HANA RAZIA JAHANGIRI
        <span className="blinking-cursor-wrapper">
          {cursorAt === "title" ? (
            <span className="blinking-cursor">|</span>
          ) : (
            <span className="blinking-placeholder">|</span>
          )}
        </span>
      </h1>
        {typedLines.map((line, i) => (
          <p key={i}>
            {line}
            {i === typedLines.length - 1 && (
              <span className="blinking-cursor-wrapper">
                {cursorAt === "desc" && !typing ? (
                  <span className="blinking-cursor">|</span>
                ) : (
                  <span className="blinking-placeholder">|</span>
                )}
              </span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AboutMe;
