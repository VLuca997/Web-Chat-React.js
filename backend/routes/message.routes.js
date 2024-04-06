import express from "express"; // Importa il framework Express
import protectRoute from '../middleware/protectRoute.js'; // Importa il middleware per proteggere le rotte
import { sendMessage } from "../controllers/message.controller.js"; // Importa il controller per l'invio dei messaggi

const router = express.Router(); // Crea un router Express

// Definizione della route per l'invio di un messaggio protetta dal middleware protectRoute
router.post("/send/:id", protectRoute, sendMessage);

export default router; // Esporta il router per l'uso nelle altre parti dell'applicazione
