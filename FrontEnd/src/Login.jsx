import React, { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";

function Login() {
  const [account, setAccounts] = useState("");
  const [password, setPassword] = useState("");
  const [setErrore] = useState("");


  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5260/Account/username/${encodeURIComponent(account)}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Errore ${response.status}: ${errorText}`);
      }

      const accounts = await response.json();

      if (!accounts || !accounts.passwordHash) {
        alert("Account non trovato o dati incompleti.");
        return;
      }

      // Verifica password lato client (solo a scopo di esempio!)
      if (accounts.passwordHash === password) {

        if (accounts.role?.toLowerCase() === "admin") {
          navigate("/wp-admin");
        } else {
          navigate(`/wp-user/${accounts.id}`);
        }
      } else {
        setErrore("Password errata.");
      }
    } catch (err) {
      alert("‼️ Errore nel login:");
      setErrore(err.message || "Errore sconosciuto");
    }
  };


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
        fontFamily: "Arial",
      }}
    >
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
      <h2>Accesso Utente</h2>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <input
          type="text"
          placeholder="Username"
          value={account}
          onChange={(e) => setAccounts(e.target.value)}
          required
          autoComplete="off"
          style={{ padding: "10px", margin: "10px 0", fontSize: "16px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="off"
          style={{ padding: "10px", margin: "10px 0", fontSize: "16px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
          }}
        >
          Login
        </button>
        <br />
        <button
          style={{
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",

          }}
        >
          <a href="/registrati" style={{ textDecoration: "none", color: "white", }}>registrati</a>
        </button>
      </form>
    </div>
  );
};



export default Login;
