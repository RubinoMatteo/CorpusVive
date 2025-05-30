import { useState, useEffect } from 'react';
import { TextField, Button, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';





function EsercizioList() {


    const [formData, setFormData] = useState({ name: '', muscle: '', serie: 0, reps: 0, description: '' });
    const [esercizi, setEsercizi] = useState([]);

    const [deleteId, setDeleteId] = useState('');
    const [risposta, setRisposta] = useState('');

    const [updateData, setUpdateData] = useState({ name: '', muscle: '', serie: 0, reps: 0, description: '' });


    useEffect(() => {
        fetch("/Esercizi")
            .then((res) => res.json())
            .then((data) => setEsercizi(data))
            .catch((error) => console.error("Errore nel recupero dei dati:", error));

        // opzionale: auto-refresh ogni 5 secondi
        const interval = setInterval(() => {
            fetch('/Esercizi')
                .then((res) => res.json())
                .then((data) => setEsercizi(data));
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene il comportamento di default del form

        if (!formData || Object.keys(formData).length === 0) {
            setRisposta('Dati del form mancanti o incompleti');
            return;
        }

            const response = await fetch('/Esercizio/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`❌ Errore nella richiesta`);
            }

            const data = await response.json();

            if (data?.id) {
                setRisposta(`✔️ Esercizio aggiunto con ID: ${data.id}`);
            } else {
                setRisposta('❌ Risposta ricevuta ma ID mancante');
            }
        }


    const handleDelete = async () => {
        if (!deleteId) {
            setRisposta('❌ Inserisci un ID valido per eliminare.');
            return;
        }

        try {
            const response = await fetch(`/Esercizio/delete/${deleteId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setRisposta(`✔️ Esercizio con ID ${deleteId} eliminato.`);
            } else {
                setRisposta(`❌ Nessun esercizio trovato con ID ${deleteId}`);
            }
        } catch (err) {
            console.error(err);
            setRisposta('❌ Errore durante l\'eliminazione');
        }
    };

    const handleUpdate = async () => {
        const { id, ...esercizioModificato } = updateData;
        try {
            const response = await fetch(`/Esercizio/put/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(esercizioModificato)
            });

            if (response.ok) {
                setRisposta(`✔️ Esercizio con ID ${id} aggiornato.`);
            } else {
                setRisposta(`❌ Errore: esercizio con ID ${id} non trovato.`);
            }
        } catch {
            setRisposta('❌ Errore durante l\'aggiornamento');
        }
    }

    return (
        <div style={{
            margin: "0",
            display: "grid",
            alignItems: 'center',
            minWidth: "120px",
            minHeight: "100vh",
            backgroundSize: "100% 100%"
        }}>
                <div style={{ BackgroundSize: "100% 100%" }}>
                    {
                        <div
                            style={{
                                padding: "1rem",
                                fontFamily: "Arial",
                                backgroundColor: "black"
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <a href="/">
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
                                </a>

                                <div>
                                    <h1 style={{ margin: 0, fontSize: "2rem", color: "white" }}>
                                        Sei un Admin!
                                    </h1>
                                </div>
                            </div>
                        </div>
                    }
                </div >

                <Box sx={{ display: 'flex', padding:"2rem ", flexDirection: 'column', alignItems: 'center'}}>
                <h2>➕ Aggiungi Esercizio</h2>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <TextField label="Nome" name="name" onChange={handleChange} />
                    <TextField label="Muscolo" name="muscle" onChange={handleChange} />
                    <TextField type="number" label="Serie" name="serie" onChange={handleChange} />
                    <TextField type="number" label="Reps" name="reps" onChange={handleChange} />
                    <TextField label="Descrizione" name="description" onChange={handleChange} />
                    <Button type="submit" variant="contained">Aggiungi</Button>


                </Box>

                <h2>✏️ Modifica Esercizio</h2>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <TextField type="number" label="ID da modificare" name="id" onChange={(e) => setUpdateData(prev => ({ ...prev, id: e.target.value }))} />
                    <TextField label="Nuovo Nome" name="name" onChange={(e) => setUpdateData(prev => ({ ...prev, name: e.target.value }))} />
                    <TextField label="Nuovo Muscolo" name="muscle" onChange={(e) => setUpdateData(prev => ({ ...prev, muscle: e.target.value }))} />
                    <TextField type="number" label="Nuove Serie" name="serie" onChange={(e) => setUpdateData(prev => ({ ...prev, serie: e.target.value }))} />
                    <TextField type="number" label="Nuove Reps" name="reps" onChange={(e) => setUpdateData(prev => ({ ...prev, reps: e.target.value }))} />
                    <TextField label="Nuova Descrizione" name="description" onChange={(e) => setUpdateData(prev => ({ ...prev, description: e.target.value }))} />
                    <Button variant="outlined" onClick={handleUpdate}>Aggiorna</Button>
                </Box>

                <h2>🗑️ Elimina Esercizio</h2>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <TextField type="number" label="ID da eliminare" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
                    <Button variant="contained" color="error" onClick={handleDelete}>Elimina</Button>
                </Box>

                {risposta && <p>{risposta}</p>}

                <h2>📋 Elenco Esercizi</h2>
                <List sx={{ display: "grid", maxWidth: "80rem", width: "100%", margin: "2rem auto", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                    {esercizi.map(item => (
                        <ListItem className='card' key={item.id} >
                            <ListItemText primary={<>{item.id}.{item.name}</>} secondary={
                                <>
                                    Muscolo coinvolto: {item.muscle} <br />
                                    Numero di serie: {item.serie} <br />
                                    Numero di ripetizioni: {item.reps}<br />
                                    Descrizione del esercizio: {item.description}
                                </>} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    );
}

export default EsercizioList;