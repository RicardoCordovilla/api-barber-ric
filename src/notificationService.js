require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_WHATSAPP_FROM;
const client = new twilio(accountSid, authToken);

const sendWts = async (phone, message) => {
    client.messages
        .create({
            body: message,
            from: `whatsapp:${from}`,
            to: `whatsapp:${phone}`
        })
        .then(message => console.log(message.sid))
}

module.exports = sendWts