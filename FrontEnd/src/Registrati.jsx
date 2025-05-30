import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import { Box, TextField, Button } from "@mui/material"; // Importa Box, TextField e Button

function Login() {
    const [formData, setFormData] = useState({ username: '', passwordHash: '', role: 'user' });
    const [risposta, setRisposta] = useState(""); // Per gestire la risposta o gli errori

    const navigate = useNavigate();
    const vai_a_login=()=>{
        navigate("/login");
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene il comportamento di default del form

        if (!formData || Object.keys(formData).length === 0) {
            setRisposta('Dati del form mancanti o incompleti');
            return;
        }

        try {
            const response = await fetch('http://localhost:5260/Account/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                await response.text(); // prova a leggere il messaggio di errore dal server
                throw new Error(`❌ Errore nella richiesta`);
            }

            const data = await response.json();

            if (data?.id) {
                setRisposta(`✔️ Account creato con ID: ${data.id}`);
                navigate(`/wp-user/${data.id}`);
            } else {
                setRisposta('❌ Risposta ricevuta ma ID mancante');
            }
        } catch {
            setRisposta(`❌ Errore durante l'invio`);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value // Aggiorna solo il campo specifico nel formData
        }));
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, justifyContent: "center", height: "100vh", backgroundColor: "#f4f4f4", fontFamily: "Arial", }}>
            <div style={{ alignSelf: "flex-start", marginLeft:"2rem" ,marginBottom: "4rem" }}>
                    <Link
                        to="/"
                        style={{
                            color: "black",
                            textDecoration: "none",
                            fontSize: "1.3rem",
                            fontWeight: "bold",
                        }}
                    >
                        ← Torna alla home
                    </Link>
                </div>
            <h2>Registrazione Utente</h2>
            

            <TextField
                label="Username"
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username} // Usa il valore dallo stato formData
                onChange={handleChange}
                required
                autoComplete="off"
                style={{ height:" 2rem ",width:"15rem",padding: "10px", margin: "10px 0", fontSize: "16px" }}
            />

            <TextField
                label="PasswordHash"
                name="passwordHash"
                type="password"
                placeholder="Password"
                value={formData.passwordHash} // Usa il valore dallo stato formData
                onChange={handleChange}
                required
                autoComplete="off"
                style={{height:" 2rem ",width:"15rem", padding: "10px", margin: "10px 0", fontSize: "16px" }}
            />

            <Button type="submit" style={{height:" 2rem ",width:"15rem", padding: "10px", fontSize: "16px", backgroundColor: "#000", color: "#fff", border: "none", }}>
                Registrati
            </Button>
            <Button onClick={vai_a_login} style={{ height:" 2rem ",width:"15rem", padding: "10px", fontSize: "16px", backgroundColor: "#000", color: "#fff", border: "none", }}>
                ← torna al Login 
            </Button>

            {risposta && <p>{risposta}</p>} {/* Mostra la risposta o l'errore */}
        </Box>
    );
}

export default Login;
