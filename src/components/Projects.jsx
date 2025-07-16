import React from "react";

const projectList = [
  {
    title: "Mealzi, A Custom Recipe Manager",
    description: "A web-based recipe manager built with py4web that allows users to create, browse, and share recipes",
    icon: "/4.png",
    link: "https://github.com/hanarazia/custom-recipe-manager"
  },
  {
    title: "KVS Cache",
    description: "Implements an in-memory key-value store (KVS) in C with multiple cache eviction policies (LRU, FIFO, CLOCK)",
    icon: "/4.png",
    link: "https://github.com/hanarazia/kvs-cache"
  },
  {
    title: "Public Key Cryptography",
    description: "Generates SS public and private key pairs which can then be used to encrypt and decrypt files in C",
    icon: "/4.png",
    link: "https://github.com/hanarazia/pub-key-cryptography"
  },
  {
    title: "The Game of Life",
    description: "Implements Conway’s Game of Life through the use of an ADT (abstract data type) and the ncurses library",
    icon: "/4.png",
    link: "https://github.com/hanarazia/game-of-life"
  },
  {
    title: "Lempel-Ziv Compression",
    description: "Performs LZ78 compression and decompression with files, text, or binary in C",
    icon: "/4.png",
    link: "https://github.com/hanarazia/lz78-compression"
  },
  {
    title: "Fifteen Puzzle Game",
    description: "A Python implementation of the Fifteen Puzzle",
    icon: "/4.png",
    link: "https://github.com/hanarazia/fifteen-game"
  },
];

const Projects = () => {
  return (
    <div className="projects-container">
      {projectList.map((project, index) => (
        <div
          className="project-slot"
          key={index}
          onClick={() => window.open(project.link, "_blank")}
        >
          <div className="project-header">
            <img className="project-icon" src={project.icon} alt="icon" />
            <div className="project-title-and-description">
              <div className="project-title">{project.title}</div>
              <div className="project-description">{project.description}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
