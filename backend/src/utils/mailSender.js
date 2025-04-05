// mailer.js

const nodemailer = require('nodemailer');

// Configuration du transporteur SMTP
export const transporter = nodemailer.createTransport({
    service: 'gmail', // ou 'outlook', 'yahoo', etc.
    auth: {
        user: 'tonemail@gmail.com', // ton adresse email
        pass: 'ton_mot_de_passe_ou_mot_de_passe_app' // mot de passe ou mot de passe d'application
    }
});

// Contenu de l'email
const mailOptions = {
    from: 'tonemail@gmail.com',
    to: 'destinataire@example.com',
    subject: 'Hello depuis Node.js 🚀',
    text: 'Salut ! Voici un email envoyé avec Nodemailer et Node.js 😎'
};

// Envoi de l'email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Erreur lors de l\'envoi : ', error);
    } else {
        console.log('Email envoyé : ' + info.response);
    }
});
