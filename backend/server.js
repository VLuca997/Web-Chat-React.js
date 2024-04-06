/* 
Per far sì che l'import ed l'export funzionino:
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
// Importa il modulo 'cookie-parser' per la gestione dei cookie
import cookieParser from 'cookie-parser';

// Importa le rotte dell'autenticazione dal file './routes/auth.routes.js'
import authRoutes from './routes/auth.routes.js';
// Importa le rotte dei messaggi dal file './routes/message.routes.js'
import messageRoutes from './routes/message.routes.js';
// Importa la funzione per la connessione al database MongoDB dal file './db/connectToMondoDb.js'
import connectionToMongoDb from './db/connectToMondoDb.js';

// Crea un'applicazione Express e la assegna alla variabile 'app'
const app = express();
// Definisce una costante 'PORT' che assume il valore della variabile d'ambiente 'PORT' se presente, altrimenti assume il valore 5000
const PORT = process.env.PORT || 5000;

// Carica le variabili d'ambiente dal file .env nella variabile process.env
dotenv.config();

// Utilizza il middleware per il parsing delle richieste JSON
app.use(express.json());
// Utilizza il middleware per il parsing dei cookie
app.use(cookieParser());

// Definisce una route per rispondere alle richieste GET all'indirizzo radice '/'
app.get('/', (req, res) => {
    // Risponde con il testo 'hello chiccooooo world!' quando viene effettuata una richiesta GET all'indirizzo radice
    res.send('hello chiccooooo world!');
});

// Utilizza le rotte dell'autenticazione definite nel file './routes/auth.routes.js' con il prefisso '/api/auth'
app.use('/api/auth', authRoutes);
// Utilizza le rotte dei messaggi definite nel file './routes/message.routes.js' con il prefisso '/api/messages'
app.use('/api/messages', messageRoutes);

// Avvia il server Express in ascolto sulla porta definita dalla costante 'PORT' e stampa un messaggio di avvio
app.listen(PORT, () => {
    // Effettua la connessione al database MongoDB
    connectionToMongoDb();
    console.log(`Server running on port ${PORT}`);
});
