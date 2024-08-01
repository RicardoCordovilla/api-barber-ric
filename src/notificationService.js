const { default: axios } = require('axios');
require('dotenv').config();
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.WTS_TOKEN}`
axios.defaults.headers.common['Accept'] = 'application/json'

const bodyTemplate = (type, date, hour, message,phone) => {
    return {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: phone,
        type: "template",
        template: {
            name: type === 0 ? "template_prb3" : "hour_template",
            language: {
                "code": "es_ES"
            },
            components: [
                {
                    type: "header",
                    parameters: [
                        {
                            type: "text",
                            // text: "Reservas de hoy: " + date
                            text: type === 0 ? "Citas de hoy: " + date : hour
                        }
                    ]
                },
                {
                    type: "body",
                    parameters: [
                        {
                            type: "text",
                            text: message
                        }
                    ]
                }
            ]
        }
    }
}

const sendWts = async (phone, date, hour, message) => {
    const url = process.env.WTS_URL + process.env.WTS_NUMBERID + '/messages'
    const type = date !== null ? 0 : 1
    console.log('date', date)
    console.log('type', type)
    const body = bodyTemplate(type, date, hour, message,phone)
    console.log(url, JSON.stringify(body))
    try {
        const response = await axios.post(url, body)
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }

}

module.exports = sendWts