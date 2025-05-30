
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./index.css";

function PageEse() {
    const { id } = useParams();
    const [esercizio, setEsercizio] = useState(null);
    const [errore, setErrore] = useState(null);
    

    useEffect(() => {
        const fetchEsercizio = async () => {
            try {
                const response = await fetch(`/Esercizio/${id}`);
                console.log("Response:", response);

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(
                        `Errore HTTP ${response.status} - ${response.statusText}\nDettagli: ${errorText}`
                    );
                }

                const data = await response.json();

                if (!data) {
                    throw new Error("Risposta JSON vuota o nulla");
                }

                setEsercizio(data);
            } catch (err) {
                console.error("‼️ Errore durante il fetch dell'esercizio:", err);
                if (err.name === "TypeError" && err.message.includes("Failed to fetch")) {
                    setErrore("Errore di rete: impossibile connettersi al server.");
                } else {
                    setErrore(err.message || "Errore sconosciuto");
                }
            }
        };

        fetchEsercizio();
    }, [id]);

    return (
        <body style={{
            margin: "0",
            display: "grid",
            alignItems: 'center',
            minWidth: "120px",
            minHeight: "100vh",
        }}>
            <div
                style={{
                    fontFamily: "'Segoe UI', sans-serif",
                    minHeight: "100vh",
                    color: "#f0f6fc",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundImage: "url('/palestra3.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%"
                }}
            >
                <div style={{ alignSelf: "flex-start", marginBottom: "4rem" }}>
                    <Link
                        to="/Tutti-gli-esercizi"
                        style={{
                            color: "orange",
                            textDecoration: "none",
                            fontSize: "1.3rem",
                            fontWeight: "bold",
                        }}
                    >
                        ← Torna agli esercizi
                    </Link>
                </div>

                {errore ? (
                    <div
                        style={{
                            backgroundColor: "#290000",
                            padding: "1.5rem",
                            borderRadius: "8px",
                            color: "#ff6b6b",
                            maxWidth: "600px",
                            textAlign: "center",
                        }}
                    >
                        <strong>Errore:</strong>
                        <pre style={{ whiteSpace: "pre-wrap", marginTop: "0.5rem" }}>{errore}</pre>
                    </div>
                ) : esercizio ? (
                    <div
                        style={{
                            backgroundColor: "rgba(98, 98, 98, 0.5)",
                            padding: "2rem",
                            borderRadius: "12px",
                            boxShadow: "black",
                            maxWidth: "600px",
                            width: "100%",
                            textAlign: "center",
                        }}
                    >
                        <h1 style={{ fontSize: "2.6.2rem", marginBottom: "2rem", color: "orange" }}>
                            {esercizio.name}
                        </h1>
                        <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                            <strong>Muscolo coinvolto:</strong> {esercizio.muscle}
                        </p>
                        <p style={{ fontSize: "1.5rem" }}>
                            <strong>Descrizione:</strong> {esercizio.description}
                        </p>
                        <p style={{ fontSize: "1.5rem" }}>
                            <strong>Serie consigliate:</strong> {esercizio.serie} &nbsp;|&nbsp;
                            <strong>Ripetizioni consigliate:</strong> {esercizio.reps}
                        </p>

                    </div>
                ) : (
                    <p style={{ fontSize: "1.2rem", marginTop: "2rem", animation: "pulse 1.5s infinite" }}>
                        Caricamento in corso...
                    </p>
                )}
            </div>
        </body>
    );
}

export default PageEse;