const axios = require("axios");

let handler = async (m, { sock, text, cmd, reply }) => {
if (!text) return reply(`Masukan nama npm\n*contoh:* ${cmd} baileys`)
let data = await axios.get(`https://registry.npmjs.com/-/v1/search?text=${encodeURIComponent(text)}`).then(i => i.data)
    let teks = ""
    for (let i of data.objects.slice(0, 20)) {
teks += `
- Title: *${i.package.name + "@^" + i.package.version}*
- Download: *${i.downloads.monthly}*
- Author: *${i.package.publisher.username}*
- Update: ${i.package.date.split("T")[0]}
- Links: ${i.package.links.npm}
   `
    }
await m.reply(teks)
}

handler.command = ["npm", "npmsearch"]
module.exports = handler