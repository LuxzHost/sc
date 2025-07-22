const axios = require("axios");

const handler = async (m, {sock, reply, cmd, text}) => {
if (!text) return reply(`Masukan teks\n*contoh:* ${cmd} Hello Everyone`)
let warna = ["#000000"]
let ppuser
try {
ppuser = await sock.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://files.catbox.moe/gqs7oz.jpg'
}
let reswarna = await warna[Math.floor(Math.random()*warna.length)]
const obj = {
      "type": "quote",
      "format": "png",
      "backgroundColor": reswarna,
      "width": 512,
      "height": 768,
      "scale": 2,
      "messages": [{
         "entities": [],
         "avatar": true,
         "from": {
            "id": 1,
            "name": m.pushName,
            "photo": {
               "url": ppuser
            }
         },
         "text": text,
         "replyMessage": {}
      }]
   }
   try {
   const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
      headers: {
         'Content-Type': 'application/json'
      }
   })
   const buffer = Buffer.from(json.data.result.image, 'base64')
return sock.sendSticker(m.chat, buffer, m, { packname: "-! skyzopedia" })
   } catch (error) {
   m.reply(error.toString())
   }
}

handler.command = ["qc"]
module.exports = handler