import nodemailer from 'nodemailer';

export async function enviarMail (mensaje){
    // createTestAccount nos permite crear una cuenta de prueba si contamos con cuenta no necesitamos esto
    //const cuentaTest = await nodemailer.createTestAccount()
    //console.log(cuentaTest);

    //creamos un trasporte 
    const transporte = nodemailer.createTransport({
        host: "smtp.office365.com", 
        port: 587, 
        secure: false, //verdadero para el 465 y falso para otro puerto 
        auth: {
            user: process.env.USER_MAIL, // ceunta para el envio 
            pass: process.env.PASS_MAIL, //
        },
    });

    const info = await transporte.sendMail({
        from: process.env.FROM_MAIL , // el email que envia el mensaje
        to: process.env.USER_DESTINO , // listado de receptores del mensaje
        subject: "IP-Publica", // asunto del Email
        text: `LA IP A CAMBIADO ${mensaje}`,
        html: `<buttom>Nueva ip ${mensaje}</buttom>`, // cuerpo de html
    });

    console.log("mensaje enviado: %s", info.messageId);
    //ejemplo:  Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // La vista previa solo está disponible cuando se envía a través de una cuenta Ethereal
    console.log("Avance del URL: %s", nodemailer.getTestMessageUrl(info));
    // emeplo: Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

//enviarMail("8.8.8.8").catch(console.error);