// Middleware per proteggere le rotte controllando il token JWT
import jwt from "jsonwebtoken"; // Importa il pacchetto 'jsonwebtoken' per la gestione dei token JWT
import User from "../models/user.model.js"; // Importa il modello dell'utente

const protectRoute = async (request, response, next) => { // Definizione della funzione middleware
    try {
        const token = request.cookies.jwt; // Estrae il token JWT dai cookies della richiesta
        if (!token) { // Se il token non è presente
            return response.status(401).json({ // Restituisce una risposta di errore 401 (Unauthorized)
                error: 'UNAUTHORIZED, no token provided' // Messaggio di errore
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica e decodifica il token JWT utilizzando il segreto
        if (!decoded) { // Se il token non è valido
            return response.status(401).json({ // Restituisce una risposta di errore 401 (Unauthorized)
                error: 'UNAUTHORIZED, invalid token' // Messaggio di errore
            });
        }
        const user = await User.findById(decoded.userId).select("-password"); // Trova l'utente corrispondente all'ID decodificato
        if (!user) { // Se l'utente non è trovato
            return response.status(404).json({ error: "404 User not found" }); // Restituisce una risposta di errore 404 (Not Found)
        }
        request.user = user; // Aggiunge l'utente alla richiesta per l'uso nelle route successive
        next(); // Passa il controllo al middleware successivo
    } catch (error) { // Gestione degli errori
        console.log("Error in protectRoute middleware:", error.message); // Registra l'errore nella console
        response.status(500).json({ // Restituisce una risposta di errore 500 (Internal Server Error)
            error: 'Internal server error' // Messaggio di errore generico
        });
    }
};

export default protectRoute; // Esporta il middleware per l'uso in altre parti dell'applicazione
