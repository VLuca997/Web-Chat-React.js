// Importa il modello dell'utente dal file '../models/user.model.js'
import User from "../models/user.model.js";

// Importa la libreria bcrypt.js per la crittografia delle password
import bcrypt from 'bcryptjs';

// Importa la funzione per generare il token e impostare il cookie dal file '../utils/generateToken.js'
import generateTokenAndSetCookie from "../utils/generateToken.js";

// Funzione per gestire la registrazione di un nuovo utente
export const signupUser = async (request, response) => {
    try {
        // Estrae i dati dal corpo della richiesta
        const { fullName, username, password, confirmPassword, gender } = request.body;

        // Controlla se le password coincidono
        if (password !== confirmPassword) {
            return response.status(400).json({ error: 'Le password non corrispondono' });
        }

        // Controlla se l'utente esiste già
        const user = await User.findOne({ username });
        if (user) {
            return response.status(400).json({ error: 'Il nome utente già esiste' });
        }

        // Genera un salt casuale per la crittografia della password
        const salt = await bcrypt.genSalt(10);
        // Cifra la password con il salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crea il profilo utente con l'URL dell'immagine del profilo in base al genere
        const boyPictureProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlPictureProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const profilePic = gender === 'male' ? boyPictureProfile : girlPictureProfile;

        // Crea un nuovo utente
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic
        });

        // Salva il nuovo utente nel database
        await newUser.save();

        // Genera il token JWT e imposta il cookie
        generateTokenAndSetCookie(newUser._id, response);

        // Restituisce i dettagli dell'utente appena creato
        response.status(201).json({
            id: newUser.id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        });
    } catch (error) {
        console.log('Errore nel controller di registrazione:', error.message);
        response.status(500).json({ error: 'Errore interno del server' });
    }
}

// Funzione per gestire il login dell'utente
export const loginUser = async (request, response) => {
    try {
        const { username, password } = request.body;
        // Cerca l'utente nel database tramite il nome utente
        const user = await User.findOne({ username });
        // Controlla se l'utente esiste e se la password è corretta
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return response.status(400).json({ error: "Nome utente o password non validi" });
        }
        // Genera il token JWT e imposta il cookie
        generateTokenAndSetCookie(user._id, response);
        // Restituisce i dettagli dell'utente
        response.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log('Errore nel controller di login:', error.message);
        response.status(500).json({ error: 'Errore interno del server' });
    }
}

// Funzione per gestire il logout dell'utente
export const logoutUser = (request, response) => {
    try {
        // Cancella il cookie JWT
        response.cookie("jwt", "", { maxAge: 0 });
        // Restituisce un messaggio di logout
        response.status(200).json({ message: "Logout eseguito con successo" });
    } catch (error) {
        console.log('Errore nel controller di logout:', error.message);
        response.status(500).json({ error: 'Errore interno del server' });
    }
}
