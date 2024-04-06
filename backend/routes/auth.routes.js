// Importa il framework 'express' utilizzando l'importazione di ES6
import express from 'express';
import { loginUser, logoutUser, signupUser } from '../controllers/auth.controller.js';

// Crea un oggetto Router di Express e lo assegna alla variabile 'router'
const router = express.Router();


//ROUTES
// Definisce ROTTE per rispondere alle richieste GET 

//SINGUP
router.post('/signup',signupUser);

//LOGIN
router.post('/login',loginUser);

//LOGOUT
router.post('/logout',logoutUser);

// Esporta il router per consentire l'utilizzo in altri moduli
export default router;
