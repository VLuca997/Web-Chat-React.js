// Importa il modulo 'mongoose' per la connessione al database MongoDB
import mongoose from "mongoose";

// Funzione asincrona per stabilire la connessione al database MongoDB
const connectionToMongoDb = async () => {
    try {
        // Utilizza 'mongoose.connect' per connettersi al database utilizzando l'URI fornito nelle variabili d'ambiente
        await mongoose.connect(process.env.MONGO_DB_URI);
        // Stampa un messaggio di conferma in caso di successo
        console.log('connection to MONGODB');
    } catch (error) {
        // In caso di errore, stampa un messaggio di errore con il messaggio di errore specifico
        console.log('error connection to mongo db ', error.message)
    }
};

// Esporta la funzione 'connectionToMongoDb' per consentirne l'utilizzo in altri moduli
export default connectionToMongoDb;
