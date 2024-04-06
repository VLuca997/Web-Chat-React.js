import mongoose from "mongoose";

// Definizione dello schema della conversazione
const conversationSchema = new mongoose.Schema({
    // Array di partecipanti rappresentati come ID degli utenti
    partecipants: [
        {
            type: mongoose.Schema.Types.ObjectId, // Tipo: ObjectId di Mongoose
            ref: 'User', // Riferimento al modello degli utenti
        }
    ],
    // Array di messaggi rappresentati come ID dei messaggi
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId, // Tipo: ObjectId di Mongoose
            ref: 'Message', // Riferimento al model dei messaggi
            default: [] // Valore predefinito: array vuoto per i messaggi
        }
    ],
}, { timestamps: true }); // crea automaticamente i campi createdAt e updatedAt

// Creazione del modello Conversation a partire dallo schema definito
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation; // Esporta il modello Conversation
