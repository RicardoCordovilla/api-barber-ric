const digits = (num) => {
    let digit = num < 10 ? '0' + num : num + ''
    return digit
}

const formatDate = (date) => {
    const fecha = new Date(date)
    let stringDate = fecha.getFullYear() + '-' + digits(fecha.getMonth() + 1) + '-' + digits(fecha.getDate())
    return stringDate
}

const nowDate = () => {
    const currentDate = new Date()
    const currentLocalDate = formatDate(currentDate.toLocaleDateString("es-EC", { timeZone: 'America/Lima' }, { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-'))
    return currentLocalDate
}

exports.nowDate = nowDate





