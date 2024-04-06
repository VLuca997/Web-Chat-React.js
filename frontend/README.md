# React + Vite

-PERCORSO EFFETTUATO FIN ORA:

WEB CHAT COMUNICANTE IN TEMPO REALE CON REACT!

- creare due cartelle, frontend e backend in vsc ( unite sotto una cartella singola )
-cd .\frontend\ per spostarsi nella directory adatta
	- nel frontend andiamo ad installare react: " npm create vite@latest . " -> seleziona react -> javascript
	- avviare npm i per installare il pacchetto 
-cd .. per tornare indietro di directory fino alla cartella genitore, avviare terminale e scrivere:
	- " npm init -y " installera fuori dalle die cartelle il file package.json.
	- " npm install express dotenv cookie-parser bcryptjs mongoose socket.io jsonwebtoken " installera le varie dipendenze di questi pacchetti/librerie creando a sua volta il file " package-lock.json e la cartella node-modules.

-----------------------------------------------------
FASE 2

creare il file
server.js in backend:
	const express = require('express');

	const app = express();

	//Routes http://localhost:5000
	app.get('/', (req,res) => {
	res.send('hello world!');
	});


	app.listen(5000, () => console.log('Server running on port 5000'));
package.json:
	"scripts": {
		"server": "node backend/server.js"
	  },
comando da terminale " npm run server " avvierà la macchina virtuale proprio sulla porta 5000
( aprendo la pagina http://localhost:5000 troveremo scritto il messaggio di  " res.send('hello world!"); " )

adesso nella directory genitore avvieremo da terminale il comando 
- " npm install nodemon --save-dev "  che salvera come dev dependencies nodemon. ( visualizzabile in 		package.json )
- modificare in package.json il richiamo al server di prima " 
	- "scripts": {
		"server": "nodemon backend/server.js"
	  },
	
	- questo ci permettera di non riavviare la macchina virtuale piu volte per ogni modifca, ma si aggiornerà da sola. ( npm run server lo si esegue una sola volta )
	
----------------------------------------------------------------------------------------------------------------

fase 3:
CONNESSIONE A MONGO DB + CREAZIONE VARI FILE NECESSARI:

facciamo accesso a mongo db ed inizializziamo un nuovo db, nel codice invece scriviamo:
--------------------------------------------------------------------------------------------
- backend/db/connectToMongodb.js


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



--------------------------------------------------------------------------------------------
- backend/controllers/auth.controller.js
// Funzione per gestire la registrazione di un nuovo utente
export const signupUser = async (request, response) => {
    try {
        // Estrae i dati dal corpo della richiesta
        const { fullName, username, password, confirmPassword, gender } = request.body;
        // Aggiungi qui la logica per gestire la registrazione dell'utente
    } catch (error) {
        // Gestisce eventuali errori e li registra
    }
}

// Funzione per gestire il login dell'utente
export const loginUser = (request, response) => {
    // Invia una risposta con un messaggio di conferma
    response.send('login!!!');
    // Stampa un messaggio per indicare che la funzione è stata chiamata
    console.log('loginUser');
}

// Funzione per gestire il logout dell'utente
export const logoutUser = (request, response) => {
    // Invia una risposta con un messaggio di conferma
    response.send('logout!!!');
    // Stampa un messaggio per indicare che la funzione è stata chiamata
    console.log('logoutUser');
}
--------------------------------------------------------------------------------------------
-backend/server.js

/* per far si che l'import e l'export funzionino:
La voce "type": "module" nel file package.json è necessaria quando si utilizzano le importazioni
di ES6 nei file JavaScript anziché il metodo tradizionale di richiedere i moduli. 
Quando questa voce è presente e impostata su "module", indica che il progetto fa uso delle specifiche 
dei moduli ECMAScript. Questo consente l'utilizzo delle importazioni import/export invece
delle richieste require/module.exports. In questo modo, Node.js interpreterà i file JavaScript come moduli ES6. 
*/

// Importa il framework 'express' utilizzando l'importazione di ES6
import express from 'express';

// Importa il modulo 'dotenv' per la gestione delle variabili d'ambiente
import dotenv from 'dotenv';

// Importa le rotte dell'autenticazione dal file './routes/auth.routes.js'
import authRoutes from './routes/auth.routes.js';

import connectionToMongoDb from './db/connectToMondoDb.js';

// Crea un'applicazione Express e la assegna alla variabile 'app'
const app = express();

// Carica le variabili d'ambiente dal file .env nella variabile process.env
dotenv.config();

// Definisce una costante 'PORT' che assume il valore della variabile d'ambiente 'PORT' se presente, altrimenti assume il valore 5000
const PORT = process.env.PORT || 5000;

// Definisce una route per rispondere alle richieste GET all'indirizzo radice '/'
app.get('/', (req, res) => {
    // Risponde con il testo 'hello chiccooooo world!' quando viene effettuata una richiesta GET all'indirizzo radice
    res.send('hello chiccooooo world!');
});

// Utilizza le rotte dell'autenticazione definite nel file './routes/auth.routes.js' con il prefisso '/api/auth'
app.use('/api/auth', authRoutes);

// Avvia il server Express in ascolto sulla porta definita dalla costante 'PORT' e stampa un messaggio di avvio
app.listen(PORT, () => {
    connectionToMongoDb();
    console.log(`Server running on port ${PORT}`);
});

--------------------------------------------------------------------------------------------
-backend/routes/auth.routes.js

// Importa il framework 'express' utilizzando l'importazione di ES6
import express from 'express';
import { loginUser, logoutUser, signupUser } from '../controllers/auth.controller.js';

// Crea un oggetto Router di Express e lo assegna alla variabile 'router'
const router = express.Router();


//ROUTES
// Definisce ROTTE per rispondere alle richieste GET 

//SINGUP
router.get('/signup',signupUser);

//LOGIN
router.get('/login',loginUser);

//LOGOUT
router.get('/logout',logoutUser);

// Esporta il router per consentire l'utilizzo in altri moduli
export default router;

--------------------------------------------------------------------------------------------
