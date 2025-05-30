import { useState } from "react";
import React from "react";
import "./index.css";

function App() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const linkStyle = {
    display: "block",
    padding: "0.5rem 1rem",
    textDecoration: "none",
    color: "black",
    fontWeight: "normal",
    cursor: "pointer",
  };

  return (
    <body class="gigio">
      <div style={{ padding: "1rem", fontFamily: "Arial" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>

          <img
            src="/vite.png"
            alt="Logo Fitness"
            style={{
              width: "110px",
              height: "110px",
              objectFit: "contain",
              marginLeft: "10px",
            }}
          />

          <div>
            <h1 style={{ margin: 0, fontSize: "2rem", color: "white" }}>
              Benvenuto in CorpusVive!
            </h1>
          </div>
          <div style={{}}>
            <ul
              className="nav navbar-nav nav-menu link-text"
              style={{
                listStyle: "none",
                paddingLeft: "20rem",
                margin: 0,
                paddingTop: "0.2rem",
              }}
            >
              <li
                className="menu-item"
                style={{
                  fontSize: "25px",
                  lineHeight: "1.5",
                  color: "white",
                }}
              >
                <a
                  href="/Tutti-gli-esercizi"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontWeight: "bold",
                    paddinfleft: "-18rem",
                  }}
                >
                  Tutti gli Esercizi
                </a>
              </li>
            </ul>
          </div>

          {/* UTENTE + DROPDOWN */}
          <div
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              padding: "1rem",
            }}
          >
            <ul style={{ margin: 0, padding: 0 }}>
              <li style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    width: "70px",
                    height: "70px",
                    marginRight: "10px",
                    borderRadius: "50%",
                    border: "none",
                    padding: 0,
                    overflow: "hidden",
                    backgroundColor: "blue",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="/utente-2.png"
                    alt="Utente"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </button>
              </li>
            </ul>

            {/* Tendina */}
            {dropdownOpen && (
              <div
                className={`dropdown-container ${dropdownOpen ? "show" : ""}`}
                style={{
                  position: "absolute",
                  top: "120px",
                  right: 10,
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                  padding: "10px",
                  zIndex: 100,
                  width: "10rem",
                }}
              >
                <ul className="dropdown-menu" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  <li className="dropdown-item">
                    <a href="/Login" style={linkStyle}>Login</a>
                  </li>
                  <li className="dropdown-item">
                    <a href="/" style={linkStyle}>Logout</a>
                  </li>
                  {/*<li className="dropdown-item">
                    <p>i tuoi Workout</p> <button className="dropdown-button" ><a href="/New-workout" style={linkStyle}>new Workout</a></button>
                  </li>*/}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          margin: "0.5rem", // scarto dai bordi dello schermo
          height: "calc(100vh + 1rem)", // altezza = schermo - margini verticali
          width: "calc(100vw  - 1.95rem)", // larghezza = schermo - margini orizzontali
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          borderRadius: "20px", // opzionale: bordi arrotondati
          overflow: "hidden", // nasconde eventuale overflow
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial",
          color: "white",
        }}
      ></div>
      <footer class="site-footer" style={{ backgroundColor: "transparent" }}>
        <div class="team-footer">
          <h3>👾 il Team</h3>
          <ul>
            <li> – <strong>👩‍💻 Matteo Rubino</strong></li>
            <li> – <strong>👩‍💻 Alessandro Re</strong></li>
            <li> – <strong>👩‍💻 Oscar Martella</strong></li>
          </ul>
        </div>

        <a class="footer-credit" href="/eg" style={{ textDecoration: "none", }}>© 2025 CodeFlix. All rights reserved.</a>
      </footer>
    </body >

  );
}
export default App;
