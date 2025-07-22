const handler = async (m, { sock }) => {
let teks = `
*# Selfbot Version 2.0.0*

- Source Code No Enc 100%
- Full Button & Support WA Business
- Security (ON)
- Support Costum Pairing Code
- Type Case X Plugin
- Size Ringan (Fast Respon)
- Price ? Rp25.000

Contact Admin: wa.me/6283181145670
`
return sock.relayMessage(m.chat,  {requestPaymentMessage: {currencyCodeIso4217: 'IDR', amount1000: 25000000, requestFrom: m.sender, noteMessage: { extendedTextMessage: { text: teks }}}}, {})
}

handler.command = ["sc", "script"]
module.exports = handler