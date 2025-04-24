import nodemailer from 'nodemailer';


// Configuration du transporteur SMTP
export const transporter = nodemailer.createTransport({
    service: 'gmail', // ou 'outlook', 'yahoo', etc.
    auth: {
        user: process.env.email, // ton adresse email
        pass: process.env.password // mot de passe ou mot de passe d'application
    }
});


export function sendMailToUser(userEmail, senderEmail, roomId) {

    const message = `
  <p>Bonjour ${userEmail},</p>

  <p>Vous avez un appel entrant de ${senderEmail} sur votre compte.</p>

  <p>Pour répondre à l'appel, cliquez sur le lien ci-dessous :</p>

  <p><a href="https://meet.jit.si/${roomId}" style="color: #238FB7; text-decoration: none;">👉 Répondre à l'appel</a></p>

  <br>
  <p>Cordialement,<br>L'équipe de Freemap</p>
`;

    const mailOptions = {
        from: "process.env.email",
        to: userEmail,
        subject: '📞 Appel entrant sur votre compte ',
        html: message,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return error;
        } else {
            return info.response;
        }
    });
}

