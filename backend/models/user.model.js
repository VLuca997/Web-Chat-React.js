import mongoose from "mongoose";

// Definizione dello schema per l'utente
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // La lunghezza minima della password è 6 caratteri
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'] // Il genere può essere 'male' o 'female'
    },
    profilePic: {
        type: String,
        default: '' // L'URL dell'immagine del profilo predefinito è vuoto
    },
        //{timestamps} per creare createdAt e updateAt, colonne nel nostro DB.
},{timestamps:true});

// Creazione del modello User utilizzando lo schema definito
const User = mongoose.model('User', userSchema);

export default User;
