import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./index.css";

function Page2() {
  const [esercizi, setEsercizi] = useState([]);
  const [NewWorkout, setNewWorkout] = useState([]);
  const [workoutId, setworkoutId] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [Account, setAccount] = useState();
  const [filtroMuscolo, setFiltroMuscolo] = useState("Tutti");

  useEffect(() => {
    fetch("/Esercizi")
      .then((res) => res.json())
      .then((data) => setEsercizi(data))
      .catch((error) => console.error("Errore nel recupero dei dati:", error));

    // opzionale: auto-refresh ogni 10 secondi
    // const interval = setInterval(() => {
    //   fetch('/Esercizi')
    //     .then((res) => res.json())
    //     .then((data) => setEsercizi(data));
    // }, 10000);
    // return () => clearInterval(interval);
  }, []);


  const navigate = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5260/Account/${userId}`)
      .then((res) => res.json())
      .then((data) => setAccount(data))
      .catch((error) => console.error("Errore nel recupero dei dati:", error))

  }, [userId]);

  const aggiungiEsercizio = (esercizio) => {
    setNewWorkout([...NewWorkout, esercizio]);
    setworkoutId([...workoutId, esercizio.id]);
    console.log(workoutId);
  };

  // Funzione per rimuovere un esercizio da NewWorkout
  const rimuoviEsercizio = (esercizio) => {
    setNewWorkout(NewWorkout.filter((item) => item.id !== esercizio.id));
    setworkoutId(workoutId.filter((item) => item !== esercizio.id));
  };

  const salvaWorkout = () => {
    const resultString = workoutId.join(",");
    console.log(resultString);
    if (!userId) {
      alert("non puoi salvare il workout.\nnon sei loggato");
      return;
    }
    fetch(`http://localhost:5260/Account/put/Workout/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workout: resultString, // deve corrispondere al tipo atteso dal backend (array di int)
      })
    })
      .then((res) => {
        console.log(res);
        console.log("userId:", userId);
        if (res.ok) {
          console.log("Workout aggiornato con successo!");
          navigate(`/wp-user/${userId}`);
        } else {
          console.error("Errore nell'aggiornamento del workout");
        }
      })
      .catch((error) => console.error("Errore fetch:", error));
  };


  const vai_a_login = () => {
    navigate(`/wp-user/${userId}`);
    setDropdownOpen(!dropdownOpen)
  };

  const linkStyle = {
    display: "block",
    padding: "0.5rem 1rem",
    textDecoration: "none",
    color: "black",
    fontWeight: "normal",
    cursor: "pointer",
  };
  const muscoliUnici = ["Tutti", ...new Set(esercizi.map((e) => e.muscle))];
  const eserciziFiltrati = filtroMuscolo === "Tutti" ? esercizi : esercizi.filter((e) => e.muscle === filtroMuscolo);

  return (
    <body
      style={{
        margin: "0",
        display: "grid",
        alignItems: "center",
        minWidth: "120px",
        minHeight: "100vh",
        backgroundSize: "100% 100%",
      }}
    >
      {
        <div
          style={{
            padding: "1rem",
            fontFamily: "Arial",
            backgroundColor: "black",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link to="/">
              <img
                src="/vite.png"
                alt="Logo Fitness"
                style={{
                  width: "110px",
                  height: "110px",
                  objectFit: "contain",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
              />
            </Link>





            <div>
              <h1 style={{ margin: 0, fontSize: "2rem", color: "white" }}>
                Benvenuto {Account?.username}, crea il tuo workout
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
          </div>

          <div>
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
                    onClick={vai_a_login}
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
                  style={{
                    position: "absolute",
                    top: "120px", // sotto il bottone
                    right: 10,
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                    padding: "10px",
                    zIndex: 100,
                  }}
                >
                  <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    <li>
                      <a href="/Login" style={linkStyle}>
                        Login
                      </a>
                    </li>
                    <li>
                      <a href="" style={linkStyle}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      }

      <div
        id="workout-container"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr", // Per mettere i div uno accanto all'altro
          justifyContent: "space-between", // Distanza tra i div
          gap: "1rem", // Spaziatura tra i div
          padding: "2rem",
          marginTop: "2rem",
        }}
      >
        <div
          id="Esercizi"
          style={{
            flex: 1, // Ogni div occupa uno spazio uguale
            maxWidth: "80%", // Per evitare che i div diventino troppo larghi
            padding: "1rem",
          }}
        >
          <h1>Esercizi</h1>
          {/* Dropdown filtro muscolo */}
          <div className="button2" style={{ textAlign: "center", marginTop: "2rem" }}>
            <label
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "black",
                marginRight: "1rem",
              }}
            >
              Filtra per muscolo:
            </label>
            <select
              value={filtroMuscolo}
              onChange={(e) => setFiltroMuscolo(e.target.value)}
              style={{
                padding: "0.5rem",
                fontSize: "1rem",
                borderRadius: "4px",
              }}
            >
              {muscoliUnici.map((muscolo, idx) => (
                <option key={idx} value={muscolo}>
                  {muscolo}
                </option>
              ))}
            </select>
          </div>
          <section
            id="productContainer"
            className="grid"
            style={{
              display: "grid",
              maxWidth: "80rem",
              width: "100%",
              margin: "1rem auto",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1rem",
            }}
          >
            {eserciziFiltrati.map((esercizio, index) => (
              <div className="card" key={index}>
                <h3>{esercizio.name}</h3>
                <p>Muscolo coinvolto: {esercizio.muscle}</p>
                <p>Numero di serie: {esercizio.serie}</p>
                <p>Numero di ripetizioni: {esercizio.reps}</p>
                <button
                  className="button"
                  onClick={() => aggiungiEsercizio(esercizio)}
                >
                  ➕
                </button>
              </div>
            ))}
          </section>
        </div>

        <div
          id="New-Workout"
          style={{
            flex: 1, // Ogni div occupa uno spazio uguale
            maxWidth: "50%", // Per evitare che i div diventino troppo larghi
            padding: "1rem",
          }}
        >



          <button
            onClick={salvaWorkout}
            className="button"
            style={{
              marginTop: "0.5rem",
              padding: "12px 24px", // aumenta le dimensioni interne (alto-basso, sx-dx)
              fontSize: "18px", // aumenta la dimensione del testo
              cursor: "pointer",
              marginLeft: "0rem", // sposta un po' a destra il bottone
            }}
          >
            Salva Workout
          </button>




          <section
            id="productContainer"
            className="grid"
            style={{
              display: "grid",
              maxWidth: "20rem",
              width: "100%",
              margin: "1rem auto",
              gridTemplateColumns: "1fr",
              gap: "1rem",
            }}
          >
            <h1>New Workout</h1>

            {NewWorkout.map((esercizio, index) => (
              <div className="card" key={index}>
                <h3>{esercizio.name}</h3>
                <p>Muscolo coinvolto: {esercizio.muscle}</p>
                <p>Numero di serie: {esercizio.serie}</p>
                <p>Numero di ripetizioni: {esercizio.reps}</p>
                <button
                  className="button"
                  onClick={() => rimuoviEsercizio(esercizio)}
                >
                 ➖
                </button>
              </div>
            ))}
          </section>

        </div>
      </div>
      <footer class="site-footer">
        <section class="team-section">
          <h2>👾 il Team</h2>
          <div class="team-grid">
            <div class="team-member">
              <h3>👩‍💻 Matteo Rubino</h3>
              <p>programmatore di frontend e backend</p>
            </div>
            <div class="team-member">
              <h3>👩‍💻 Oscar Martella</h3>
              <p>programmatore backend e gestione del databese</p>
            </div>
            <div class="team-member">
              <h3>👩‍💻 Alessandro Re</h3>
              <p>programmatore frontend e gestione del databese</p>
            </div>
          </div>

          <p class="footer-credit">© 2025 CodeFlix. All rights reserved.</p>
        </section>

      </footer>
    </body>
  );
}

export default Page2;
