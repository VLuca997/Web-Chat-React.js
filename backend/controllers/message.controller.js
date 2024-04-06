// Models
import Message from '../models/message.model.js';
import Conversation from "../models/conversation.model.js";

// Funzione per inviare un messaggio
export const sendMessage = async (request, response) => {
    try {
        const { message } = request.body; // Estrae il messaggio dalla richiesta
        const { id: receiverId } = request.params; // Estrae l'ID del destinatario dalla richiesta
        const senderId = request.user._id; // Ottiene l'ID del mittente dall'utente autenticato

        // Trova o crea una conversazione tra il mittente e il destinatario
        let conversation = await Conversation.findOne({
            partecipants: { $all: [senderId, receiverId] } // Cerca una conversazione che contenga entrambi gli ID dei partecipanti
        });

        // Se non esiste una conversazione, creane una nuova
        if (!conversation) {
            conversation = await Conversation.create({
                partecipants: [senderId, receiverId] // Crea una conversazione con i partecipanti specificati
            });
        }

        // Crea un nuovo messaggio
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        // Aggiungi l'ID del nuovo messaggio alla conversazione
        conversation.messages.push(newMessage._id);
        await conversation.save(); // Salva le modifiche alla conversazione nel database

        // Invia una risposta con il nuovo messaggio creato
        response.status(201).json(newMessage);

        console.log('Messaggio inviato:', request.params.id); // Stampa un messaggio di conferma nell'output della console
    } catch (error) {
        console.log("Errore nel controller sendMessage:", error.message); // Gestisce gli errori e li registra nell'output della console
        response.status(500).json({ error: "Errore interno del server" }); // Invia una risposta di errore al client
    }
}
