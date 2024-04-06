import jwt from 'jsonwebtoken';

// Funzione per generare un token JWT e impostare il cookie
const generateTokenAndSetCookie = (userId, response) => {
    // Genera un token JWT con l'ID utente e la chiave segreta fornita dalle variabili d'ambiente
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d' // Token scadrà dopo 15 giorni
    });

    // Imposta il cookie 'jwt' con il token generato
    response.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // Durata massima del cookie: 15 giorni
        httpOnly: true, // Impedisce l'accesso al cookie tramite JavaScript per prevenire attacchi XSS
        sameSite: 'strict',// Limita il cookie alle richieste provenienti dallo stesso sito per prevenire attacchi CSRF
        secure: process.env.NODE_ENV !== "development",
    });
};

export default generateTokenAndSetCookie;
