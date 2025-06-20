import React, { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    const hour = new Date().getHours();
    return hour >= 7 && hour < 19 ? "light" : "dark";
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const projects = [
    {
      title: "HomeVault",
      description:
        "A private media archive built with Docker, Nginx, Node.js, React and MongoDB. Runs on EC2 with CI/CD via GitHub Actions and DNS via Route 53.",
      url: "https://example.com/homevault",
    },
    {
      title: "TaskFlow",
      description:
        "A lightweight workflow manager for automating daily tasks using Node.js and React.",
      url: "https://example.com/taskflow",
    },
    {
      title: "Portfolio Site",
      description:
        "This website! A responsive portfolio built with React and deployed with modern DevOps practices.",
      url: "https://coreybui.com",
    },
  ];
  const [projectIndex, setProjectIndex] = useState(0);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const nextProject = () =>
    setProjectIndex((idx) => (idx + 1) % projects.length);
  const prevProject = () =>
    setProjectIndex((idx) => (idx - 1 + projects.length) % projects.length);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    document.body.classList.toggle("light-mode", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    // Typewriter Effect
    const typeText = [
      "Hey, I'm Corey.",
      "A creative developer.",
      "A systems engineer.",
    ];
    let i = 0,
      j = 0,
      current = "",
      isDeleting = false;

    const typewriter = document.getElementById("typewriter");
    function typeLoop() {
      if (!typewriter) return;

      if (!isDeleting && j <= typeText[i].length) {
        current = typeText[i].substring(0, j++);
      } else if (isDeleting && j >= 0) {
        current = typeText[i].substring(0, j--);
      }

      typewriter.innerHTML = `<span>${current}</span>`;

      if (j === typeText[i].length + 10) isDeleting = true;
      if (j === 0 && isDeleting) {
        isDeleting = false;
        i = (i + 1) % typeText.length;
      }

      setTimeout(typeLoop, isDeleting ? 60 : 150);
    }

    typeLoop();

    // Fade-In on Scroll
    const faders = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    });

    faders.forEach((fader) => observer.observe(fader));
  }, []);

  return (
    <>
      <header>
        <div className="header-buttons">
          <button
            className="menu-button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "☀️" : "🌙"}
          </button>
        </div>
        <div className="logo">Corey Bui</div>
        <div className={`menu${menuOpen ? " open" : ""}`}>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </header>

      <section className="intro-section">
        <h1>
          <span id="typewriter"></span>
        </h1>
        <p>
          I build modern web experiences and automation tools that bridge backend
          infrastructure with engaging frontends.
        </p>
      </section>

      <section className="section fade-in" id="about">
        <div className="content-box">
          <h2>About Me</h2>
          <p>
            I'm a systems engineer and web developer with a passion for simplifying
            complexity. My toolkit includes Docker, Linux, React, Node.js, and cloud
            technologies like AWS.
            <br />
            <br />
            Outside of tech, I love watching movies, cooking, playing music (piano,
            guitar, trumpet), and tinkering with servers just for fun.
          </p>
        </div>
      </section>

      <section className="section fade-in" id="projects">
        <div
          className="carousel"
          role="button"
          tabIndex={0}
          onClick={() => window.open(projects[projectIndex].url, "_blank")}
          onKeyPress={(e) => {
            if (e.key === "Enter") window.open(projects[projectIndex].url, "_blank");
          }}
        >
          <iframe
            src={projects[projectIndex].url}
            title={projects[projectIndex].title}
            className="carousel-preview"
          ></iframe>
          <div className="carousel-content">
            <h2>{projects[projectIndex].title}</h2>
            <p>{projects[projectIndex].description}</p>
          </div>
          <button
            className="carousel-control prev"
            onClick={(e) => {
              e.stopPropagation();
              prevProject();
            }}
          >
            ❮
          </button>
          <button
            className="carousel-control next"
            onClick={(e) => {
              e.stopPropagation();
              nextProject();
            }}
          >
            ❯
          </button>
        </div>
      </section>

      <section className="section fade-in" id="contact">
        <div className="content-box">
          <h2>Contact</h2>
          <p>
            Want to collaborate or say hi?
            <br />
            Email: <a className="email-link" href="mailto:corbui317@gmail.com">corbui317@gmail.com</a>
          </p>
        </div>
      </section>

      <footer>&copy; 2025 Corey Bui — Built with React & ❤️</footer>
    </>
  );
}

export default App;