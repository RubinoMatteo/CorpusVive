import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "/src/index.css";

function User() {
    const { id } = useParams();
    const [Accounts, setAccounts] = useState(null);
    const [Errore, setErrore] = useState(null);
    const [Esercizio, setEsercizio] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [WorkoutId, setworkoutId] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await fetch(`http://localhost:5260/Account/${id}`);
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Errore HTTP ${response.status} - ${response.statusText}\nDettagli: ${errorText}`);
                }

                const data = await response.json();
                if (!data) throw new Error("Risposta JSON vuota o nulla");
                setAccounts(data);

                if (data.workout) {
                    const ids = data.workout
                        .split(",")
                        .map(str => parseInt(str.trim(), 10))
                        .filter(id => !isNaN(id));

                    setworkoutId(ids);

                    const esercizi = await Promise.all(
                        ids.map(id =>
                            fetch(`http://localhost:5260/Esercizio/${id}`).then(res => res.json())
                        )
                    );
                    setEsercizio(esercizi);
                }
            } catch (err) {
                console.error("‼️ Errore durante il fetch:", err);
                setErrore(err.message || "Errore sconosciuto");
            }
        };

        fetchAccount();
    }, [id]);

    const vai_a_workout = () => {
        navigate(`/New-workout/${Accounts.id}`);
    };

    return (
        <div className="b" style={{ margin: 0, display: "grid", minHeight: "100vh", backgroundSize: "100% 100%" }}>
            <header style={{ padding: "1rem", fontFamily: "Arial" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", backgroundColor: "black" }}>
                    <Link to="/">
                        <img
                            src="/vite.png"
                            alt="Logo Fitness"
                            style={{ width: "110px", height: "110px", objectFit: "contain", marginLeft: "10px" }}
                        />
                    </Link>

                    <h1 style={{ margin: 0, fontSize: "2rem", color: "white" }}>Benvenuto in CorpusVive!</h1>
                    <ul
                        className="nav navbar-nav nav-menu link-text"
                        style={{ listStyle: "none", paddingLeft: "20rem", margin: 0, paddingTop: "0.2rem" }}
                    >
                        <li className="menu-item" style={{ fontSize: "25px", lineHeight: "1.5", color: "white" }}>
                            <a
                                href="/Tutti-gli-esercizi"
                                style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}
                            >
                                Tutti gli Esercizi
                            </a>
                        </li>
                    </ul>

                    <div style={{ position: "absolute", top: 18, right: 18, padding: "1rem" }}>
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
                                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                    />
                                </button>
                            </li>
                        </ul>

                        {dropdownOpen && (
                            <div
                                className="dropdown-container"
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
                                    width: "10rem"
                                }}
                            >
                                <ul className="dropdown-menu" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                                    <li className="dropdown-item"><a href="/">Logout</a></li>
                                    <li className="dropdown-item">
                                        <button className="dropdown-button" onClick={vai_a_workout}>New Workout</button>
                                    </li>
                                    <li className="dropdown-item">
                                        <p>I tuoi workout: {Accounts?.workout}</p>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main style={{ padding: "20px", fontFamily: "Arial", backgroundColor: "#f4f4f4", flexGrow: 1 }}>
                {Accounts ? (
                    <>
                        <h2>Benvenuto, {Accounts.username}</h2>
                        <p>Ruolo: {Accounts.role}</p>

                        <div>
                            <button className="dropdown-button" onClick={vai_a_workout}>New Workout</button>
                        </div>

                        <div id="New-Workout" style={{ flex: 1, maxWidth: "50%", padding: "1rem" }}>
                            <h1>Il tuo Workout</h1>
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
                                {Esercizio && Esercizio.map((ex) => (
                                    <div className="card" key={ex.id}>
                                        <h3>{ex.name}</h3>
                                        <p>Muscolo coinvolto: {ex.muscle}</p>
                                        <p>Numero di serie: {ex.serie}</p>
                                        <p>Numero di ripetizioni: {ex.reps}</p>
                                        <a className="button" href={`/esercizio/${ex.id}`} rel="noopener noreferrer">
                                            Visualizza →
                                        </a>
                                    </div>
                                ))}
                            </section>
                        </div>
                    </>
                ) : (
                    <p>Caricamento dati utente...</p>
                )}
            </main>

            <footer className="site-footer" style={{ backgroundColor: "#222", color: "white", padding: "2rem", textAlign: "center" }}>
                <section className="team-section">
                    <h2>👾 Il Team</h2>
                    <div className="team-grid" style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
                        <div className="team-member">
                            <h3>👩‍💻 Matteo Rubino</h3>
                            <p>Programmatore di frontend e backend</p>
                        </div>
                        <div className="team-member">
                            <h3>👩‍💻 Oscar Martella</h3>
                            <p>Programmatore backend e gestione del database</p>
                        </div>
                        <div className="team-member">
                            <h3>👩‍💻 Alessandro Re</h3>
                            <p>Programmatore frontend e gestione del database</p>
                        </div>
                    </div>
                    <p className="footer-credit" style={{ marginTop: "2rem" }}>© 2025 CodeFlix. All rights reserved.</p>
                </section>
            </footer>
        </div>
    );
}

export default User;
